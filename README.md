# Kantor Virtual 3D — iniwebsitemu

Portfolio interaktif ala game 3D. Bikin karakter, jalan kaki (WASD / klik lantai / D-pad HP), ngobrol sama NPC, lihat galeri portfolio di lobi.

Live: https://kantor.iniwebsitemu.com/ · Dev: http://127.0.0.1:5173/

## Cara jalan

```bash
npm install
npm run dev      # buka http://127.0.0.1:5173/
npm run build    # output ke dist/
```

## Kontrol

| Input | Aksi |
|---|---|
| WASD / panah | Jalan (relatif kamera) |
| Klik lantai | Jalan ke titik |
| E / klik objek | Interaksi |
| Drag / scroll | Putar + zoom kamera |
| D-pad | Gerak di HP |

## Fitur

- Creator karakter (manusia/mobil, kulit, rambut, hijab, baju, warna mobil) + simpan `localStorage`
- 1 map gabung luar + lobi, jalan tembus pintu kaca otomatis
- NPC penjual + resepsionis, dialog typewriter multi-halaman (E / klik)
- Galeri portfolio (layar besar + booth), modal detail + link live
- Minimap + badge zona LUAR/LOBI, HUD ID/EN, tombol WA
- Visual: fog, ACES tone mapping, shadow PCF, lampu lobi hangat

## Struktur

```
index.html        # HUD, creator, dialog box, modal, D-pad
src/main.js       # semua logika 3D (Three.js)
src/style.css     # HUD, dialog, modal
public/           # favicon, ikon
```

## Catatan

- Butuh koneksi buat font Google + CDN Three.js (import map Vite).
- Warning `THREE.Clock deprecated` aman, diabaikan.
- Bundle ~570 kB (Three.js), warning chunk >500 kB aman.
