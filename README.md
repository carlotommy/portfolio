# Portfolio Gerardo Romani

Portfolio creativo realizzato con Astro.

## 🚀 Struttura del Progetto

```
/
├── public/
│   ├── photos/          # Inserisci qui le tue foto (photo1.jpg - photo5.jpg)
│   ├── images/          # Inserisci qui le thumbnail dei video
│   └── profilo.jpg      # Tua foto profilo
├── src/
│   ├── components/      # Componenti Astro riutilizzabili
│   ├── layouts/         # Layout base
│   ├── pages/           # Pagine del sito
│   └── styles/          # File CSS globali
└── package.json
```

## 🧞 Comandi

Tutti i comandi vanno eseguiti dalla root del progetto, dal terminale:

| Comando                   | Azione                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installa le dipendenze                           |
| `npm run dev`             | Avvia il server locale su `localhost:4321`      |
| `npm run build`           | Costruisce il sito per la produzione in `./dist/`|
| `npm run preview`         | Anteprima della build locale prima del deploy    |

## 📝 Istruzioni

1. **Installa le dipendenze:**
   ```bash
   npm install
   ```

2. **Aggiungi le tue immagini:**
   - Metti la tua foto profilo in `public/profilo.jpg`
   - Aggiungi le tue foto in `public/photos/` (photo1.jpg, photo2.jpg, etc.)
   - Aggiungi le thumbnail dei video in `public/images/` (video1-thumb.jpg, etc.)

3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

4. **Personalizza i contenuti:**
   - Modifica i testi nei componenti in `src/components/`
   - Aggiorna i link Instagram nel componente `Footer.astro`

5. **Build per la produzione:**
   ```bash
   npm run build
   ```

## 🎨 Palette Colori

- Background: Beige (#F5F1E8)
- Accento: Terracotta (#C75B39)
- Testo: Marrone scuro (#3D2817)

## 📦 Tecnologie

- [Astro](https://astro.build)
- Google Fonts (DM Sans, Space Mono, Archivo Black)
