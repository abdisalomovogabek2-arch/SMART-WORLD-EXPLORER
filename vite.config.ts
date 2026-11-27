import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  let cachedToken: string | null = null;
  let tokenExpiresAt = 0;

  async function getOpenSkyToken(): Promise<string | null> {
    const clientId = env.OPENSKY_CLIENT_ID;
    const clientSecret = env.OPENSKY_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;

    const now = Date.now();
    if (cachedToken && now < tokenExpiresAt - 60000) {
      return cachedToken;
    }

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);

      const resp = await fetch(
        'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        cachedToken = data.access_token;
        tokenExpiresAt = Date.now() + (data.expires_in || 1800) * 1000;
        return cachedToken;
      }
    } catch (err) {
      console.warn('OpenSky token xatosi:', err);
    }
    return null;
  }

  return {
    plugins: [
      react(),
      {
        name: 'aviation-radar-proxy',
        configureServer(server) {
          // Birlashgan jonli radar oqimi (FlightRadar24 + OpenSky)
          server.middlewares.use('/api/radar/live', async (req, res) => {
            try {
              const url = new URL(req.url || '', `http://${req.headers.host}`);
              // Standart O'zbekiston va Markaziy Osiyo chegaralari: bounds=latMax,latMin,lonMin,lonMax
              const latMin = url.searchParams.get('lamin') || '35.0';
              const latMax = url.searchParams.get('lamax') || '47.0';
              const lonMin = url.searchParams.get('lomin') || '54.0';
              const lonMax = url.searchParams.get('lomax') || '75.0';

              const frUrl = `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?bounds=${latMax},${latMin},${lonMin},${lonMax}`;
              
              const upstream = await fetch(frUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                  'Accept': 'application/json'
                }
              });

              if (!upstream.ok) {
                throw new Error(`Upstream error: ${upstream.status}`);
              }

              const data: any = await upstream.json();
              const aircraftList: any[] = [];

              for (const [key, val] of Object.entries(data)) {
                if (key === 'full_count' || key === 'version') continue;
                if (!Array.isArray(val)) continue;

                // FlightRadar24 feed strukturasi:
                // [0]: hex/icao24, [1]: lat, [2]: lon, [3]: track/heading, [4]: alt_feet, [5]: speed_knots, [6]: squawk,
                // [7]: radar_id, [8]: aircraft_model, [9]: registration, [10]: timestamp, [11]: origin, [12]: destination,
                // [13]: flight_number, [14]: on_ground, [15]: vertical_speed, [16]: callsign
                const hex = (val[0] || key).toString();
                const lat = val[1];
                const lon = val[2];
                const heading = val[3] || 0;
                const altFeet = val[4] || 0;
                const speedKnots = val[5] || 0;
                const squawk = val[6] ? val[6].toString() : null;
                const model = val[8] || 'Noma‘lum';
                const registration = val[9] || '';
                const origin = val[11] || '';
                const destination = val[12] || '';
                const callsign = (val[16] || val[13] || hex).toString().trim();
                const onGround = val[14] === 1 || altFeet === 0;

                // Metrik qiymatlarga aylantirish:
                const baroAltitudeMeters = Math.round(altFeet * 0.3048);
                const velocityKph = Math.round(speedKnots * 1.852);

                aircraftList.push({
                  icao24: hex.toLowerCase(),
                  callsign: callsign,
                  model: model,
                  registration: registration,
                  origin: origin,
                  destination: destination,
                  originCountry: 'Xalqaro reys',
                  timePosition: val[10] || Math.floor(Date.now() / 1000),
                  lastContact: val[10] || Math.floor(Date.now() / 1000),
                  longitude: lon,
                  latitude: lat,
                  baroAltitudeMeters: baroAltitudeMeters,
                  altitudeFeet: altFeet,
                  onGround: onGround,
                  velocityKph: velocityKph,
                  speedKnots: speedKnots,
                  headingDeg: heading,
                  verticalRateMs: val[15] ? Math.round(val[15] * 0.00508 * 10) / 10 : 0,
                  squawk: squawk,
                  positionSource: 1
                });
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                time: Math.floor(Date.now() / 1000),
                total: aircraftList.length,
                aircraft: aircraftList
              }));
            } catch (err: any) {
              console.error('Radar feed xatosi:', err.message);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message, aircraft: [] }));
            }
          });

          // OpenSky flight track endpoint (orqaga qaytuvchi parvoz izi)
          server.middlewares.use('/api/opensky/track', async (req, res) => {
            try {
              const url = new URL(req.url || '', `http://${req.headers.host}`);
              const icao24 = url.searchParams.get('icao24');
              if (!icao24) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'icao24 talab qilinadi' }));
                return;
              }

              const token = await getOpenSkyToken();
              const headers: Record<string, string> = { 'User-Agent': 'SmartWorldExplorer/1.0' };
              if (token) headers['Authorization'] = `Bearer ${token}`;

              const targetUrl = `https://opensky-network.org/api/tracks/all?icao24=${encodeURIComponent(icao24)}&time=0`;
              const upstream = await fetch(targetUrl, { headers });

              res.statusCode = upstream.status;
              res.setHeader('Content-Type', 'application/json');
              const body = await upstream.text();
              res.end(body);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Trek xatosi' }));
            }
          });
        }
      }
    ],
    server: {
      port: 5173,
      host: true
    }
  };
});
