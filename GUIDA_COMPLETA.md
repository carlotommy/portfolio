# 🚀 Portfolio Gerardo Romani - Guida Completa

## 📦 Contenuto del Progetto

Il progetto è completamente strutturato come un'applicazione Astro professionale con:

- ✅ Componenti modulari e riutilizzabili
- ✅ Layout centralizzato
- ✅ Stili CSS separati
- ✅ Configurazione completa
- ✅ Struttura cartelle ottimizzata

## 📁 Struttura del Progetto

```
astro-project/
├── public/                      # File statici
│   ├── photos/                  # Inserisci qui le tue foto
│   ├── images/                  # Inserisci qui le thumbnail video
│   └── IMAGES_README.md         # Istruzioni per le immagini
│
├── src/
│   ├── components/              # Componenti Astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   ├── Photos.astro
│   │   ├── Services.astro
│   │   └── Videos.astro
│   │
│   ├── layouts/
│   │   └── Layout.astro         # Layout principale
│   │
│   ├── pages/
│   │   └── index.astro          # Pagina home
│   │
│   └── styles/
│       └── global.css           # Stili globali
│
├── .env.example                 # Variabili d'ambiente (esempio)
├── .gitignore
├── astro.config.mjs             # Configurazione Astro
├── package.json                 # Dipendenze
├── tsconfig.json                # Config TypeScript
└── README.md                    # Documentazione


```

## 🛠️ Installazione

### Prerequisiti
- Node.js 18.0 o superiore
- npm o yarn

### Passi per l'installazione:

1. **Estrai il progetto**
   ```bash
   tar -xzf astro-portfolio-project.tar.gz
   cd astro-project
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Aggiungi le tue immagini**
   - Metti la foto profilo in `public/profilo.jpg`
   - Aggiungi le foto in `public/photos/` (photo1.jpg, photo2.jpg, etc.)
   - Aggiungi le thumbnail video in `public/images/` (video1-thumb.jpg, etc.)
   
   Leggi `public/IMAGES_README.md` per i dettagli completi.

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```
   
   Il sito sarà disponibile su `http://localhost:4321`

## 🎨 Personalizzazione

### Cambiare i contenuti

**Biografia:**
Modifica `src/components/About.astro` - riga 21

**Servizi:**
Modifica `src/components/Services.astro` - personalizza titoli, descrizioni e features

**Link Instagram:**
Modifica `src/components/Footer.astro` - riga 9 (cambia l'URL)

**Link Video:**
Modifica `src/components/Videos.astro` - sostituisci gli URL Instagram

### Cambiare i colori

Apri `src/styles/global.css` e modifica le variabili CSS all'inizio del file:

```css
:root {
  --primary-white: #F5F1E8;      /* Beige chiaro */
  --primary-blue: #C75B39;        /* Terracotta */
  /* ... altre variabili ... */
}
```

## 📝 Comandi Disponibili

| Comando | Azione |
|---------|--------|
| `npm install` | Installa le dipendenze |
| `npm run dev` | Avvia il server di sviluppo su `localhost:4321` |
| `npm run build` | Crea la build di produzione in `./dist/` |
| `npm run preview` | Anteprima della build locale |
| `npm run astro` | Esegue comandi Astro CLI |

## 🚀 Deploy

### Build per la produzione

```bash
npm run build
```

Questo crea una cartella `dist/` con il sito ottimizzato pronto per il deploy.

### Opzioni di hosting

Il progetto può essere deployato su:

- **Netlify** (consigliato)
  1. Collega il repository GitHub
  2. Build command: `npm run build`
  3. Publish directory: `dist`

- **Vercel**
  1. Importa il progetto
  2. Framework: Astro
  3. Deploy automatico

- **GitHub Pages**
  1. Modifica `astro.config.mjs` aggiungendo il base path
  2. Build e push su gh-pages branch

## ✨ Caratteristiche

### Foto
- ✅ Slider infinito bidirezionale (va avanti e indietro)
- ✅ Lightbox per visualizzare foto in alta risoluzione
- ✅ Click per ingrandire, click/ESC per chiudere

### Video
- ✅ Scroll verticale automatico
- ✅ Link diretti ai reel Instagram
- ✅ Animazioni hover interattive

### Servizi
- ✅ 3 servizi principali con icone
- ✅ Animazioni al passaggio del mouse
- ✅ Lista features dettagliate

### Contatti
- ✅ Form funzionale con validazione
- ✅ Messaggi di successo/errore
- ✅ Layout responsive

## 🎯 Funzionalità Avanzate

### Smooth Scroll
Navigazione fluida tra le sezioni con animazioni

### Intersection Observer
Animazioni al caricamento delle sezioni

### Mobile Friendly
Design completamente responsive con menu hamburger

### Performance
- Lazy loading delle immagini
- CSS ottimizzato
- Build production minimizzata

## 🐛 Troubleshooting

**Le immagini non si vedono:**
- Verifica che i file siano nella cartella corretta (`public/photos/`, `public/images/`)
- Controlla che i nomi corrispondano esattamente (es: `photo1.jpg` non `Photo1.jpg`)

**Il form non funziona:**
- Il form è configurato per simulare l'invio (demo)
- Per integrare un backend reale, modifica `src/layouts/Layout.astro` (riga ~238)

**Errori durante npm install:**
- Assicurati di avere Node.js 18+ installato
- Prova a cancellare `node_modules/` e `package-lock.json`, poi rilancia `npm install`

## 📞 Supporto

Per problemi o domande:
1. Controlla questa guida
2. Leggi la documentazione Astro: https://docs.astro.build
3. Verifica i file di configurazione

## 📄 Licenza

Questo progetto è proprietà di Gerardo Romani.

---

**Buon lavoro con il tuo portfolio! 🎨✨**
