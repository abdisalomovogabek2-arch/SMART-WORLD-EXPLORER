# SMART WORLD EXPLORER — 2D Global Radar & Xaritalar Tizimi 🌍✈️

O‘zbekiston va butun dunyo bo‘yicha real vaqtdagi havo kemalari harakati, xalqaro aeroportlar, seysmik xavflar (USGS), ob-havo va yog‘ingarchilik radari (RainViewer) hamda sun‘iy yo‘ldosh tasvirlarini jamlagan interaktiv monitoring platformasi.

---

## 🚀 Asosiy Imkoniyatlar

1. **Jonli Havo Harakati Radari (Air Traffic ADS-B):**
   - Havo kemalarining haqiqiy burchak ostida harakatlanishi (`heading deg`).
   - Balandlik bo‘yicha dinamik ranglar (Kruiz, o‘rta, past, yerda).
   - Reys telemetriyasi: *Callsign, Samolyot modeli, Registratsiya, Haqiqiy tezlik (km/s & kts), Barometrik balandlik, Vertikal tezlik, Transponder (Squawk)*.
   - Parvoz yo‘nalishi: *Qayerdan qayerga (Origin ➔ Destination)*.
   - Parvoz treki (Flight Track) vizualizatsiyasi.

2. **Global & O‘zbekiston Aeroportlari:**
   - O‘zbekistonning barcha 13 ta xalqaro va mintaqaviy aeroportlari (`TAS`, `SKD`, `BHK`, `UGC`, `FEG`, `NMA`, `NVI`, `NCU`, `TMJ`, `KSQ`, `AZN`, `MOK`, `OMN`).
   - Jahonning yirik aviatsiya xablari (`DXB`, `IST`, `LHR`, `FRA`, `CDG`, `SIN`, `JFK`, `HND` va boshqalar).

3. **Interaktiv Qatlamlar (Layer Control Panel):**
   - **Zilzilalar monitoringi:** USGS real-time GeoJSON (oxirgi 24 soatlik zilzilalar, epitsentr va chuqurligi).
   - **Yog‘ingarchilik radari:** RainViewer jonli radar animatsiyasi.
   - **Yong‘in detektori:** NASA FIRMS termal o‘choqlari.
   - **Sun‘iy yo‘ldosh xaritasi:** Esri World Imagery yuqori aniqlikdagi fotosurati.
   - **3D bino va inshootlar:** Shahar infratuzilmasi.

4. **Dinamik Avto-Kuzatuv (Viewport Tracking):**
   - Xaritani dunyo bo‘ylab surganingizda, o‘sha hududdagi yuzlab samolyotlar avtomatik yuklanadi.
   - Qit‘alar akkordeon menyusi orqali bir marta bosishda global xablarga silliq uchib borish.

---

## 🛠 Texnologiyalar

- **Frontend:** React 19, TypeScript, Vite 6
- **Xarita dvigateli:** MapLibre GL
- **Uslublar & UI:** Zamonaviy Dark Glassmorphism, CSS3 animatsiyalari, Lucide React piktogrammalari
- **Backend / Proksi:** Vite Dev Server middleware + OpenSky OAuth2 & ADS-B Aggregator

---

## 📦 O‘rnatish va Ishga tushirish

1. Repozitoriyni klonlash:
```bash
git clone https://github.com/SIZNING_USERNAME/SMART-WORLD-EXPLORER.git
cd SMART-WORLD-EXPLORER
```

2. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

3. Dasturni ishga tushirish:
```bash
npm run dev
```

4. Loyihani build qilish:
```bash
npm run build
```

---

## 📄 Litsenziya
MIT License
