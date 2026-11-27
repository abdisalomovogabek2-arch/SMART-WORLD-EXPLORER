import { MapLayer, QuickLocation } from '../types';

export const INITIAL_LAYERS: MapLayer[] = [
  // Aviation
  {
    id: 'air-traffic',
    nameUz: 'Havo harakati radari',
    category: 'Aviation',
    categoryUz: 'Aviatsiya',
    descriptionUz: 'Haqiqiy vaqtdagi havo kemalari, parvoz balandligi va yo‘nalishi (Jonli ADS-B)',
    iconName: 'Plane',
    active: true,
    requiresKey: false,
    statusBadge: 'Faol'
  },
  {
    id: 'airports',
    nameUz: 'Xalqaro aeroportlar',
    category: 'Aviation',
    categoryUz: 'Aviatsiya',
    descriptionUz: 'Jahon va O‘zbekiston xalqaro aeroportlari, IATA/ICAO terminallari',
    iconName: 'PlaneTakeoff',
    active: true,
    requiresKey: false,
    statusBadge: 'Tayyor'
  },

  // Weather
  {
    id: 'weather-radar',
    nameUz: 'Yog‘ingarchilik radari',
    category: 'Weather',
    categoryUz: 'Ob-havo',
    descriptionUz: 'Global yomg‘ir, qor va bulut qatlamlari animatsiyasi (RainViewer)',
    iconName: 'CloudRain',
    active: false,
    requiresKey: false,
    statusBadge: 'Tayyor'
  },
  {
    id: 'wind-layer',
    nameUz: 'Shamol oqimlari',
    category: 'Weather',
    categoryUz: 'Ob-havo',
    descriptionUz: 'Shamol tezligi va yo‘nalishlari vizualizatsiyasi',
    iconName: 'Wind',
    active: false,
    requiresKey: false,
    statusBadge: 'Tayyor'
  },

  // Environment
  {
    id: 'earthquakes',
    nameUz: 'Zilzilalar monitoringi',
    category: 'Environment',
    categoryUz: 'Ekologiya & Xavflar',
    descriptionUz: 'So‘nggi 24 soatdagi global seysmik faollik va silkinishlar (USGS)',
    iconName: 'Activity',
    active: true,
    requiresKey: false,
    statusBadge: 'Faol'
  },
  {
    id: 'wildfires',
    nameUz: 'Yong‘in detektori (NASA)',
    category: 'Environment',
    categoryUz: 'Ekologiya & Xavflar',
    descriptionUz: 'NASA FIRMS sun‘iy yo‘ldosh orqali aniqlangan faol termal nuqtalar',
    iconName: 'Flame',
    active: false,
    requiresKey: false,
    statusBadge: 'Tayyor'
  },

  // Transport
  {
    id: 'marine-traffic',
    nameUz: 'Dengiz kemalari (AIS)',
    category: 'Transport',
    categoryUz: 'Transport',
    descriptionUz: 'Global kema yo‘llari va portlar harakati',
    iconName: 'Ship',
    active: false,
    requiresKey: true,
    statusBadge: 'API talab'
  },
  {
    id: 'road-traffic',
    nameUz: 'Yo‘l tirbandliklari',
    category: 'Transport',
    categoryUz: 'Transport',
    descriptionUz: 'Shahar ko‘chalari va avtomagistrallar tirbandlik darajasi',
    iconName: 'Car',
    active: false,
    requiresKey: true,
    statusBadge: 'API talab'
  },

  // Geography
  {
    id: 'satellite-basemap',
    nameUz: 'Sun‘iy yo‘ldosh qatlami',
    category: 'Geography',
    categoryUz: 'Geografiya',
    descriptionUz: 'Yuqori aniqlikdagi Yer sathi surati (Esri World Imagery)',
    iconName: 'Globe',
    active: false,
    requiresKey: false,
    statusBadge: 'Tayyor'
  },
  {
    id: '3d-buildings',
    nameUz: '3D Bino va inshootlar',
    category: 'Geography',
    categoryUz: 'Geografiya',
    descriptionUz: 'Shahar markazlaridagi 3D binolar qiyofasi',
    iconName: 'Boxes',
    active: false,
    requiresKey: false,
    statusBadge: 'Tayyor'
  }
];

export interface RegionGroup {
  id: string;
  nameUz: string;
  locations: QuickLocation[];
}

export const WORLD_REGIONS: RegionGroup[] = [
  {
    id: 'central-asia',
    nameUz: 'O‘zbekiston & Markaziy Osiyo',
    locations: [
      {
        id: 'tashkent',
        nameUz: 'Toshkent',
        region: 'O‘zbekiston',
        center: [69.2401, 41.2995],
        zoom: 9.5,
        descriptionUz: 'O‘zbekiston poytaxti va yirik havo xabi'
      },
      {
        id: 'samarkand',
        nameUz: 'Samarqand',
        region: 'O‘zbekiston',
        center: [66.9597, 39.6542],
        zoom: 10,
        descriptionUz: 'Tarixiy turizm markazi va xalqaro aeroport'
      },
      {
        id: 'bukhara',
        nameUz: 'Buxoro',
        region: 'O‘zbekiston',
        center: [64.4217, 39.7747],
        zoom: 10,
        descriptionUz: 'Xalqaro reyslar va aerovokzal'
      },
      {
        id: 'fergana-valley',
        nameUz: 'Farg‘ona vodiysi',
        region: 'O‘zbekiston',
        center: [71.7878, 40.3842],
        zoom: 9,
        descriptionUz: 'Vodiy viloyatlari transport tuguni'
      },
      {
        id: 'uzbekistan-wide',
        nameUz: 'Butun O‘zbekiston',
        region: 'Respublika',
        center: [64.5853, 41.3775],
        zoom: 6,
        descriptionUz: 'Butun respublika havo koridorlari'
      }
    ]
  },
  {
    id: 'middle-east',
    nameUz: 'Yaqin Sharq & Ko‘rfaz',
    locations: [
      {
        id: 'dubai',
        nameUz: 'Dubay & Ko‘rfaz',
        region: 'BAA',
        center: [55.3644, 25.2532],
        zoom: 8,
        descriptionUz: 'Dunyoning eng gavjum xalqaro tranzit aeroporti (DXB)'
      },
      {
        id: 'doha',
        nameUz: 'Doha',
        region: 'Qatar',
        center: [51.5651, 25.2731],
        zoom: 8.5,
        descriptionUz: 'Hamad International (HIA) xabi'
      },
      {
        id: 'istanbul',
        nameUz: 'Istanbul',
        region: 'Turkiya',
        center: [28.8146, 41.2753],
        zoom: 8,
        descriptionUz: 'Yevropa va Osiyoni bog‘lovchi yirik mega-aeroport (IST)'
      }
    ]
  },
  {
    id: 'europe',
    nameUz: 'Yevropa',
    locations: [
      {
        id: 'london',
        nameUz: 'London & Janubi-Sharq',
        region: 'Buyuk Britaniya',
        center: [-0.4543, 51.47],
        zoom: 7.5,
        descriptionUz: 'Hitrou (LHR) va Gatvik xalqaro havo maydoni'
      },
      {
        id: 'frankfurt',
        nameUz: 'Frankfurt',
        region: 'Germaniya',
        center: [8.5706, 50.0379],
        zoom: 8,
        descriptionUz: 'Yevropaning asosiy aviatsiya va kargo xabi (FRA)'
      },
      {
        id: 'paris',
        nameUz: 'Parij',
        region: 'Fransiya',
        center: [2.55, 49.0097],
        zoom: 8,
        descriptionUz: 'Sharl de Goll (CDG) xalqaro aeroporti'
      },
      {
        id: 'amsterdam',
        nameUz: 'Amsterdam',
        region: 'Niderlandiya',
        center: [4.7639, 52.3086],
        zoom: 8,
        descriptionUz: 'Sxipxol (AMS) xalqaro aeroporti'
      }
    ]
  },
  {
    id: 'asia',
    nameUz: 'Osiyo & Tinch Okeani',
    locations: [
      {
        id: 'singapore',
        nameUz: 'Singapur',
        region: 'Singapur',
        center: [103.9915, 1.3644],
        zoom: 8.5,
        descriptionUz: 'Changi (SIN) xalqaro aeroporti'
      },
      {
        id: 'tokyo',
        nameUz: 'Tokio',
        region: 'Yaponiya',
        center: [140.3929, 35.772],
        zoom: 8,
        descriptionUz: 'Narita (NRT) va Xaneda (HND)'
      },
      {
        id: 'beijing',
        nameUz: 'Pekin',
        region: 'Xitoy',
        center: [116.5975, 40.0801],
        zoom: 8,
        descriptionUz: 'Kapital va Dasing xalqaro aeroportlari'
      },
      {
        id: 'delhi',
        nameUz: 'Dehli',
        region: 'Hindiston',
        center: [77.1025, 28.5562],
        zoom: 8,
        descriptionUz: 'Indira Gandi (DEL) xalqaro aeroporti'
      }
    ]
  },
  {
    id: 'north-america',
    nameUz: 'Shimoliy Amerika',
    locations: [
      {
        id: 'new-york',
        nameUz: 'Nyu-York',
        region: 'AQSH',
        center: [-73.7781, 40.6413],
        zoom: 8,
        descriptionUz: 'JFK, Nyuark va LaGuardia tranzit hududi'
      },
      {
        id: 'atlanta',
        nameUz: 'Atlanta',
        region: 'AQSH',
        center: [-84.4277, 33.6407],
        zoom: 8,
        descriptionUz: 'Dunyoning eng gavjum yo‘lovchi aeroporti (ATL)'
      },
      {
        id: 'los-angeles',
        nameUz: 'Los-Anjeles',
        region: 'AQSH',
        center: [-118.4085, 33.9416],
        zoom: 8,
        descriptionUz: 'LAX xalqaro aeroporti'
      }
    ]
  }
];

export const GLOBAL_AIRPORTS = [
  // O'zbekiston
  { name: 'Toshkent Islom Karimov Aeroporti', iata: 'TAS', icao: 'UTTT', coords: [69.2817, 41.2579], type: 'O‘zbekiston Bosh Xabi' },
  { name: 'Samarqand Xalqaro Aeroporti', iata: 'SKD', icao: 'UTSS', coords: [66.9839, 39.7003], type: 'Xalqaro' },
  { name: 'Buxoro Xalqaro Aeroporti', iata: 'BHK', icao: 'UTSB', coords: [64.4828, 39.7753], type: 'Xalqaro' },
  { name: 'Urganch Xalqaro Aeroporti', iata: 'UGC', icao: 'UTNU', coords: [60.6425, 41.5844], type: 'Xalqaro' },
  { name: 'Farg‘ona Xalqaro Aeroporti', iata: 'FEG', icao: 'UTKF', coords: [71.7456, 40.3586], type: 'Xalqaro' },
  { name: 'Namangan Xalqaro Aeroporti', iata: 'NMA', icao: 'UTKN', coords: [71.5561, 40.9844], type: 'Xalqaro' },
  { name: 'Navoiy Kargo Aeroporti', iata: 'NVI', icao: 'UTSA', coords: [65.1756, 40.1189], type: 'Kargo & Xalqaro' },
  
  // Yaqin Sharq & Turkiya
  { name: 'Istanbul Xalqaro Aeroporti', iata: 'IST', icao: 'LTFM', coords: [28.7414, 41.2619], type: 'Global Mega Xab' },
  { name: 'Dubay Xalqaro Aeroporti', iata: 'DXB', icao: 'OMDB', coords: [55.3644, 25.2532], type: 'Global Mega Xab' },
  { name: 'Hamad Xalqaro Aeroporti (Doha)', iata: 'DOH', icao: 'OTHH', coords: [51.6138, 25.2731], type: 'Global Xab' },

  // Yevropa
  { name: 'London Hitrou Aeroporti', iata: 'LHR', icao: 'EGLL', coords: [-0.4543, 51.47], type: 'Yevropa Bosh Xabi' },
  { name: 'Frankfurt Aeroporti', iata: 'FRA', icao: 'EDDF', coords: [8.5706, 50.0379], type: 'Yevropa Xabi' },
  { name: 'Parij Sharl de Goll', iata: 'CDG', icao: 'LFPG', coords: [2.55, 49.0097], type: 'Yevropa Xabi' },
  { name: 'Amsterdam Sxipxol', iata: 'AMS', icao: 'EHAM', coords: [4.7639, 52.3086], type: 'Yevropa Xabi' },

  // Osiyo & Tinch Okeani
  { name: 'Singapur Changi Aeroporti', iata: 'SIN', icao: 'WSSS', coords: [103.9915, 1.3644], type: 'Osiyo Bosh Xabi' },
  { name: 'Tokio Xaneda Aeroporti', iata: 'HND', icao: 'RJTT', coords: [139.7811, 35.5494], type: 'Osiyo Xabi' },
  { name: 'Pekin Dasing Aeroporti', iata: 'PKX', icao: 'ZBAD', coords: [116.4106, 39.5098], type: 'Osiyo Mega Xab' },
  { name: 'Dehli Indira Gandi', iata: 'DEL', icao: 'VIDP', coords: [77.1025, 28.5562], type: 'Osiyo Xabi' },

  // Shimoliy Amerika
  { name: 'Nyu-York Jon Kennedi (JFK)', iata: 'JFK', icao: 'KJFK', coords: [-73.7781, 40.6413], type: 'AQSH Bosh Xabi' },
  { name: 'Atlanta Xartsfild-Jekson', iata: 'ATL', icao: 'KATL', coords: [-84.4277, 33.6407], type: 'Dunyodagi Eng Gavjum' },
  { name: 'Los-Anjeles (LAX)', iata: 'LAX', icao: 'KLAX', coords: [-118.4085, 33.9416], type: 'Tinch Okeani Xabi' }
];

export const UZBEKISTAN_CITIES = WORLD_REGIONS[0].locations;
