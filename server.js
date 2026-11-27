import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(compression());

// Radar live API proksi endpointi
app.get('/api/radar/live', async (req, res) => {
  try {
    const latMin = req.query.lamin || '35.0';
    const latMax = req.query.lamax || '47.0';
    const lonMin = req.query.lomin || '54.0';
    const lonMax = req.query.lomax || '75.0';

    const frUrl = `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?bounds=${latMax},${latMin},${lonMin},${lonMax}`;

    const upstream = await fetch(frUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'application/json'
      }
    });

    if (!upstream.ok) {
      throw new Error(`Upstream xatosi: ${upstream.status}`);
    }

    const data = await upstream.json();
    const aircraftList = [];

    for (const [key, val] of Object.entries(data)) {
      if (key === 'full_count' || key === 'version') continue;
      if (!Array.isArray(val)) continue;

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

    res.json({
      time: Math.floor(Date.now() / 1000),
      total: aircraftList.length,
      aircraft: aircraftList
    });
  } catch (err) {
    console.error('Radar xatosi:', err.message);
    res.status(500).json({ error: err.message, aircraft: [] });
  }
});

// Parvoz trek API si
app.get('/api/opensky/track', async (req, res) => {
  try {
    const icao24 = req.query.icao24;
    if (!icao24) return res.status(400).json({ error: 'icao24 talab qilinadi' });
    const targetUrl = `https://opensky-network.org/api/tracks/all?icao24=${encodeURIComponent(icao24)}&time=0`;
    const upstream = await fetch(targetUrl, {
      headers: { 'User-Agent': 'SmartWorldExplorer/1.0' }
    });
    const body = await upstream.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Frontend dist fayllarini xizmat ko'rsatish
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Smart World Explorer serveri ${PORT}-portda ishlamoqda.`);
});
