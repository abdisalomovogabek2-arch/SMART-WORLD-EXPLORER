export interface AirportItem {
  name: string;
  iata: string;
  icao: string;
  country: string;
  city: string;
  coords: [number, number]; // [lng, lat]
  type: string;
}

export const COMPREHENSIVE_AIRPORTS: AirportItem[] = [
  // --- O'ZBEKISTON ---
  { name: 'Toshkent Islom Karimov Xalqaro Aeroporti', iata: 'TAS', icao: 'UTTT', country: 'O‘zbekiston', city: 'Toshkent', coords: [69.2817, 41.2579], type: 'Bosh Xalqaro Xab' },
  { name: 'Samarqand Xalqaro Aeroporti', iata: 'SKD', icao: 'UTSS', country: 'O‘zbekiston', city: 'Samarqand', coords: [66.9839, 39.7003], type: 'Xalqaro' },
  { name: 'Buxoro Xalqaro Aeroporti', iata: 'BHK', icao: 'UTSB', country: 'O‘zbekiston', city: 'Buxoro', coords: [64.4828, 39.7753], type: 'Xalqaro' },
  { name: 'Urganch Xalqaro Aeroporti', iata: 'UGC', icao: 'UTNU', country: 'O‘zbekiston', city: 'Urganch', coords: [60.6425, 41.5844], type: 'Xalqaro' },
  { name: 'Farg‘ona Xalqaro Aeroporti', iata: 'FEG', icao: 'UTKF', country: 'O‘zbekiston', city: 'Farg‘ona', coords: [71.7456, 40.3586], type: 'Xalqaro' },
  { name: 'Namangan Xalqaro Aeroporti', iata: 'NMA', icao: 'UTKN', country: 'O‘zbekiston', city: 'Namangan', coords: [71.5561, 40.9844], type: 'Xalqaro' },
  { name: 'Navoiy Kargo Aeroporti', iata: 'NVI', icao: 'UTSA', country: 'O‘zbekiston', city: 'Navoiy', coords: [65.1756, 40.1189], type: 'Xalqaro Kargo Xabi' },
  { name: 'Nukus Xalqaro Aeroporti', iata: 'NCU', icao: 'UTNN', country: 'O‘zbekiston', city: 'Nukus', coords: [59.6272, 42.4869], type: 'Xalqaro' },
  { name: 'Termiz Xalqaro Aeroporti', iata: 'TMJ', icao: 'UTST', country: 'O‘zbekiston', city: 'Termiz', coords: [67.3097, 37.2869], type: 'Xalqaro' },
  { name: 'Qarshi Xalqaro Aeroporti', iata: 'KSQ', icao: 'UTSL', country: 'O‘zbekiston', city: 'Qarshi', coords: [65.7725, 38.8344], type: 'Xalqaro' },
  { name: 'Andijon Bobur Aeroporti', iata: 'AZN', icao: 'UTKA', country: 'O‘zbekiston', city: 'Andijon', coords: [72.2961, 40.7289], type: 'Mintaqaviy' },
  { name: 'Mo‘ynoq Aeroporti', iata: 'MOK', icao: 'UTNM', country: 'O‘zbekiston', city: 'Mo‘ynoq', coords: [59.0306, 43.7633], type: 'Mahalliy' },
  { name: 'Zomin Aeroporti', iata: 'OMN', icao: 'UTSZ', country: 'O‘zbekiston', city: 'Zomin', coords: [68.5208, 39.9572], type: 'Turizm Aeroporti' },

  // --- MARKAZIY OSIYO & QO'SHNI DAVLATLAR ---
  { name: 'Olmaota Xalqaro Aeroporti', iata: 'ALA', icao: 'UAAA', country: 'Qozog‘iston', city: 'Olmaota', coords: [76.9535, 43.3521], type: 'Yirik Xab' },
  { name: 'Nursulton Nazarboyev Aeroporti', iata: 'NQZ', icao: 'UACC', country: 'Qozog‘iston', city: 'Ostona', coords: [71.4669, 51.0222], type: 'Poytaxt Xabi' },
  { name: 'Chimkent Xalqaro Aeroporti', iata: 'CIT', icao: 'UAII', country: 'Qozog‘iston', city: 'Chimkent', coords: [69.5161, 42.3644], type: 'Xalqaro' },
  { name: 'Manas Xalqaro Aeroporti', iata: 'FRU', icao: 'UCFM', country: 'Qirg‘iziston', city: 'Bishkek', coords: [74.4776, 43.0613], type: 'Bosh Xab' },
  { name: 'Osh Xalqaro Aeroporti', iata: 'OSS', icao: 'UCFO', country: 'Qirg‘iziston', city: 'Osh', coords: [72.7933, 40.609], type: 'Xalqaro' },
  { name: 'Dushanbe Xalqaro Aeroporti', iata: 'DYU', icao: 'UTDD', country: 'Tojikiston', city: 'Dushanbe', coords: [68.825, 38.5433], type: 'Bosh Xab' },
  { name: 'Xo‘jand Aeroporti', iata: 'LBD', icao: 'UTDL', country: 'Tojikiston', city: 'Xo‘jand', coords: [69.6947, 40.2153], type: 'Xalqaro' },
  { name: 'Ashxobod Xalqaro Aeroporti', iata: 'ASB', icao: 'UTAA', country: 'Turkmaniston', city: 'Ashxobod', coords: [58.3614, 37.9869], type: 'Bosh Xab' },
  { name: 'Turkmanboshi Aeroporti', iata: 'KRW', icao: 'UTAT', country: 'Turkmaniston', city: 'Turkmanboshi', coords: [53.0064, 40.0461], type: 'Xalqaro' },
  { name: 'Kobul Xalqaro Aeroporti', iata: 'KBL', icao: 'OAKB', country: 'Afg‘oniston', city: 'Kobul', coords: [69.2125, 34.5658], type: 'Bosh Xab' },

  // --- YAQIN SHARQ & KORFAZ ---
  { name: 'Dubay Xalqaro Aeroporti', iata: 'DXB', icao: 'OMDB', country: 'BAA', city: 'Dubay', coords: [55.3644, 25.2532], type: 'Global Mega Xab' },
  { name: 'Al Maktum Xalqaro Aeroporti', iata: 'DWC', icao: 'OMDW', country: 'BAA', city: 'Dubay Janub', coords: [55.1753, 24.8961], type: 'Mega Kargo' },
  { name: 'Abu-Dabi Xalqaro Aeroporti', iata: 'AUH', icao: 'OMAA', country: 'BAA', city: 'Abu-Dabi', coords: [54.6511, 24.433], type: 'Global Xab' },
  { name: 'Sharja Xalqaro Aeroporti', iata: 'SHJ', icao: 'OMSJ', country: 'BAA', city: 'Sharja', coords: [55.5172, 25.3286], type: 'Loukoster Xabi' },
  { name: 'Hamad Xalqaro Aeroporti', iata: 'DOH', icao: 'OTHH', country: 'Qatar', city: 'Doha', coords: [51.6138, 25.2731], type: '5 Yulduzli Global Xab' },
  { name: 'Qirol Abdulaziz Xalqaro Aeroporti', iata: 'JED', icao: 'OEJN', country: 'Saudiya Arabistoni', city: 'Jidda', coords: [39.1565, 21.6796], type: 'Global Xab' },
  { name: 'Qirol Xolid Aeroporti', iata: 'RUH', icao: 'OERK', country: 'Saudiya Arabistoni', city: 'Ar-Riyod', coords: [46.6988, 24.9576], type: 'Poytaxt Xabi' },
  { name: 'Maskat Xalqaro Aeroporti', iata: 'MCT', icao: 'OOMS', country: 'Ummon', city: 'Maskat', coords: [58.2844, 23.5933], type: 'Xalqaro' },
  { name: 'Quvayt Xalqaro Aeroporti', iata: 'KWI', icao: 'OKBK', country: 'Quvayt', city: 'Quvayt', coords: [47.9789, 29.2267], type: 'Xalqaro' },

  // --- TURKIYA & KAVKAZ ---
  { name: 'Istanbul Yangi Aeroporti', iata: 'IST', icao: 'LTFM', country: 'Turkiya', city: 'Istanbul', coords: [28.7414, 41.2619], type: 'Global Mega Xab' },
  { name: 'Sabiha Go‘kchen Aeroporti', iata: 'SAW', icao: 'LTFJ', country: 'Turkiya', city: 'Istanbul Osiyo', coords: [29.3092, 40.8986], type: 'Yirik Xab' },
  { name: 'Antaliya Aeroporti', iata: 'AYT', icao: 'LTAI', country: 'Turkiya', city: 'Antaliya', coords: [30.8005, 36.8987], type: 'Turizm Xabi' },
  { name: 'Anqara Esenboga Aeroporti', iata: 'ESB', icao: 'LTAC', country: 'Turkiya', city: 'Anqara', coords: [32.995, 40.1281], type: 'Poytaxt Xabi' },
  { name: 'Haydar Aliyev Xalqaro Aeroporti', iata: 'GYD', icao: 'UBBB', country: 'Ozarbayjon', city: 'Boku', coords: [50.0467, 40.4675], type: 'Kavkaz Bosh Xabi' },
  { name: 'Tbilisi Xalqaro Aeroporti', iata: 'TBS', icao: 'UGTB', country: 'Gruziya', city: 'Tbilisi', coords: [44.9547, 41.6692], type: 'Xalqaro' },
  { name: 'Zvartnots Xalqaro Aeroporti', iata: 'EVN', icao: 'UDYZ', country: 'Armaniston', city: 'Yerevan', coords: [44.3959, 40.1473], type: 'Xalqaro' },

  // --- YEVROPA ---
  { name: 'London Hitrou Aeroporti', iata: 'LHR', icao: 'EGLL', country: 'Buyuk Britaniya', city: 'London', coords: [-0.4543, 51.47], type: 'Yevropaning #1 Xabi' },
  { name: 'London Gatvik Aeroporti', iata: 'LGW', icao: 'EGKK', country: 'Buyuk Britaniya', city: 'London', coords: [-0.1903, 51.1481], type: 'Xalqaro' },
  { name: 'Frankfurt Aeroporti', iata: 'FRA', icao: 'EDDF', country: 'Germaniya', city: 'Frankfurt', coords: [8.5706, 50.0379], type: 'Yevropa Kargo & Yo‘lovchi Xabi' },
  { name: 'Myunxen Aeroporti', iata: 'MUC', icao: 'EDDM', country: 'Germaniya', city: 'Myunxen', coords: [11.7861, 48.3538], type: 'Yirik Xab' },
  { name: 'Parij Sharl de Goll', iata: 'CDG', icao: 'LFPG', country: 'Fransiya', city: 'Parij', coords: [2.55, 49.0097], type: 'Global Mega Xab' },
  { name: 'Amsterdam Sxipxol', iata: 'AMS', icao: 'EHAM', country: 'Niderlandiya', city: 'Amsterdam', coords: [4.7639, 52.3086], type: 'Asosiy Yevropa Tuguni' },
  { name: 'Madrid-Barajas Aeroporti', iata: 'MAD', icao: 'LEMD', country: 'Ispaniya', city: 'Madrid', coords: [-3.5673, 40.4839], type: 'Global Xab' },
  { name: 'Barselona El-Prat', iata: 'BCN', icao: 'LEBL', country: 'Ispaniya', city: 'Barselona', coords: [2.0785, 41.2974], type: 'O‘rtayer Dengizi Xabi' },
  { name: 'Rim Fiumichino (Leonardo da Vinchi)', iata: 'FCO', icao: 'LIRF', country: 'Italiya', city: 'Rim', coords: [12.2389, 41.8003], type: 'Janubiy Yevropa Xabi' },
  { name: 'Vena Xalqaro Aeroporti', iata: 'VIE', icao: 'LOWW', country: 'Avstriya', city: 'Vena', coords: [16.5697, 48.1103], type: 'Markaziy Yevropa' },
  { name: 'Syurix Aeroporti', iata: 'ZRH', icao: 'LSZH', country: 'Shveytsariya', city: 'Syurix', coords: [8.5492, 47.4581], type: 'Xalqaro' },
  { name: 'Bryussel Aeroporti', iata: 'BRU', icao: 'EBBR', country: 'Belgiya', city: 'Bryussel', coords: [4.4844, 50.9014], type: 'Poytaxt Xabi' },
  { name: 'Varshava Shopen Aeroporti', iata: 'WAW', icao: 'EPWA', country: 'Polsha', city: 'Varshava', coords: [20.9671, 52.1657], type: 'Sharqiy Yevropa' },

  // --- ROSSIYA & SHIMOL ---
  { name: 'Moskva Sheremetyevo (SVO)', iata: 'SVO', icao: 'UUEE', country: 'Rossiya', city: 'Moskva', coords: [37.4147, 55.9726], type: 'Yirik Xab' },
  { name: 'Moskva Domodedovo (DME)', iata: 'DME', icao: 'UUDD', country: 'Rossiya', city: 'Moskva', coords: [37.9063, 55.4088], type: 'Xalqaro' },
  { name: 'Moskva Vnukovo (VKO)', iata: 'VKO', icao: 'UUWW', country: 'Rossiya', city: 'Moskva', coords: [37.2615, 55.5915], type: 'Xalqaro' },
  { name: 'Sankt-Peterburg Pulkovo', iata: 'LED', icao: 'ULLI', country: 'Rossiya', city: 'Sankt-Peterburg', coords: [30.2625, 59.8003], type: 'Shimoli-G‘arbiy Xab' },
  { name: 'Novosibirsk Tolmachevo', iata: 'OVB', icao: 'UNNT', country: 'Rossiya', city: 'Novosibirsk', coords: [82.6507, 55.0126], type: 'Sibir Xabi' },

  // --- OSIYO & Tinch Okeani ---
  { name: 'Singapur Changi Aeroporti', iata: 'SIN', icao: 'WSSS', country: 'Singapur', city: 'Singapur', coords: [103.9915, 1.3644], type: 'Dunyoning #1 Aeroporti' },
  { name: 'Gonkong Xalqaro Aeroporti', iata: 'HKG', icao: 'VHHH', country: 'Gonkong', city: 'Gonkong', coords: [113.9145, 22.308], type: 'Global Kargo Mega Xabi' },
  { name: 'Incheon Xalqaro Aeroporti', iata: 'ICN', icao: 'RKSI', country: 'Janubiy Koreya', city: 'Seul', coords: [126.4407, 37.4602], type: 'Sharqiy Osiyo Xabi' },
  { name: 'Tokio Xaneda Aeroporti', iata: 'HND', icao: 'RJTT', country: 'Yaponiya', city: 'Tokio', coords: [139.7811, 35.5494], type: 'Osiyoning Eng Gavjum Xabi' },
  { name: 'Tokio Narita Aeroporti', iata: 'NRT', icao: 'RJAA', country: 'Yaponiya', city: 'Tokio', coords: [140.3929, 35.772], type: 'Xalqaro' },
  { name: 'Pekin Kapital Aeroporti', iata: 'PEK', icao: 'ZBAA', country: 'Xitoy', city: 'Pekin', coords: [116.5975, 40.0801], type: 'Global Mega Xab' },
  { name: 'Pekin Dasing Aeroporti', iata: 'PKX', icao: 'ZBAD', country: 'Xitoy', city: 'Pekin', coords: [116.4106, 39.5098], type: 'Futuristik Mega Xab' },
  { name: 'Shanxay Pudong Aeroporti', iata: 'PVG', icao: 'ZSPD', country: 'Xitoy', city: 'Shanxay', coords: [121.8052, 31.1443], type: 'Mega Xab' },
  { name: 'Guanchjou Bayyun Aeroporti', iata: 'CAN', icao: 'ZGGG', country: 'Xitoy', city: 'Guanchjou', coords: [113.2988, 23.3924], type: 'Janubiy Xitoy Xabi' },
  { name: 'Dehli Indira Gandi', iata: 'DEL', icao: 'VIDP', country: 'Hindiston', city: 'Nyu-Dehli', coords: [77.1025, 28.5562], type: 'Janubiy Osiyo Bosh Xabi' },
  { name: 'Mumbay Chhatrapati Shivaji', iata: 'BOM', icao: 'VABB', country: 'Hindiston', city: 'Mumbay', coords: [72.8679, 19.0896], type: 'Yirik Xab' },
  { name: 'Bangkok Suvarnabhumi', iata: 'BKK', icao: 'VTBS', country: 'Tailand', city: 'Bangkok', coords: [100.7501, 13.69], type: 'Janubi-Sharqiy Osiyo Xabi' },
  { name: 'Kuala-Lumpur Xalqaro Aeroporti', iata: 'KUL', icao: 'WMKK', country: 'Malayziya', city: 'Kuala-Lumpur', coords: [101.7099, 2.7456], type: 'Yirik Xab' },
  { name: 'Jakarta Sukarno-Xatta', iata: 'CGK', icao: 'WIII', country: 'Indoneziya', city: 'Jakarta', coords: [106.6559, -6.1275], type: 'Mega Xab' },

  // --- SHIMOLIY AMERIKA ---
  { name: 'Atlanta Xartsfild-Jekson', iata: 'ATL', icao: 'KATL', country: 'AQSH', city: 'Atlanta', coords: [-84.4277, 33.6407], type: 'Dunyodagi Eng Gavjum Aeroport' },
  { name: 'Nyu-York Jon Kennedi (JFK)', iata: 'JFK', icao: 'KJFK', country: 'AQSH', city: 'Nyu-York', coords: [-73.7781, 40.6413], type: 'Global Atlantika Xabi' },
  { name: 'Los-Anjeles Xalqaro (LAX)', iata: 'LAX', icao: 'KLAX', country: 'AQSH', city: 'Los-Anjeles', coords: [-118.4085, 33.9416], type: 'Tinch Okeani Darvozasi' },
  { name: 'Chikago O’Xara (ORD)', iata: 'ORD', icao: 'KORD', country: 'AQSH', city: 'Chikago', coords: [-87.9073, 41.9742], type: 'Markaziy Mega Xab' },
  { name: 'Dallas Fort-Uort (DFW)', iata: 'DFW', icao: 'KDFW', country: 'AQSH', city: 'Dallas', coords: [-97.038, 32.8998], type: 'Yirik Tranzit Xab' },
  { name: 'Mayami Xalqaro Aeroporti (MIA)', iata: 'MIA', icao: 'KMIA', country: 'AQSH', city: 'Mayami', coords: [-80.287, 25.7959], type: 'Lotin Amerikasi Darvozasi' },
  { name: 'San-Fransisko (SFO)', iata: 'SFO', icao: 'KSFO', country: 'AQSH', city: 'San-Fransisko', coords: [-122.3749, 37.619], type: 'Texnologik Xab' },
  { name: 'Toronto Pirson (YYZ)', iata: 'YYZ', icao: 'CYYZ', country: 'Kanada', city: 'Toronto', coords: [-79.6248, 43.6777], type: 'Kanada Bosh Xabi' },
  { name: 'Vankuver Aeroporti (YVR)', iata: 'YVR', icao: 'CYVR', country: 'Kanada', city: 'Vankuver', coords: [-123.1844, 49.1967], type: 'Tinch Okeani Xabi' },

  // --- LOTIN AMERIKASI, AVSTRALIYA & AFRIKA ---
  { name: 'San-Paulu Guarulhos (GRU)', iata: 'GRU', icao: 'SBGR', country: 'Braziliya', city: 'San-Paulu', coords: [-46.4731, -23.4356], type: 'Janubiy Amerika Bosh Xabi' },
  { name: 'Mexiko Benito Xuares (MEX)', iata: 'MEX', icao: 'MMMX', country: 'Meksika', city: 'Mexiko', coords: [-99.0721, 19.4361], type: 'Yirik Xab' },
  { name: 'Sidney Kingsford Smit (SYD)', iata: 'SYD', icao: 'YSSY', country: 'Avstraliya', city: 'Sidney', coords: [151.1772, -33.9461], type: 'Avstraliya Bosh Xabi' },
  { name: 'Melburn Tyullamarin (MEL)', iata: 'MEL', icao: 'YMML', country: 'Avstraliya', city: 'Melburn', coords: [144.8433, -37.6733], type: 'Xalqaro' },
  { name: 'Qohira Xalqaro Aeroporti (CAI)', iata: 'CAI', icao: 'HECA', country: 'Misr', city: 'Qohira', coords: [31.4056, 30.1219], type: 'Shimoliy Afrika Bosh Xabi' },
  { name: 'Yoxannesburg O.R. Tambo (JNB)', iata: 'JNB', icao: 'FAOR', country: 'Janubiy Afrika', city: 'Yoxannesburg', coords: [28.246, -26.1392], type: 'Afrika Qit‘asi Bosh Xabi' }
];
