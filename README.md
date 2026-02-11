# 🚀 Portfolio Gerardo Romani - Versione Astro Modulare

## ✨ Caratteristiche

- **Componenti modulari**: Ogni componente ha i suoi stili CSS inclusi
- **Zero errori TypeScript**: Codice completamente tipizzato
- **Ottimizzato per VS Code**: Nessun warning o errore
- **Struttura pulita**: Layout e componenti ben separati
- **Responsive**: Funziona su tutti i dispositivi

## 📦 Installazione Rapida

```bash
# Estrai il progetto
tar -xzf astro-portfolio-modulare.tar.gz
cd astro-project-v2

# Installa dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su: **http://localhost:4321**

## 📁 Struttura del Progetto

```
astro-project-v2/
├── src/
│   ├── components/         # Componenti con stili inclusi
│   │   ├── About.astro     # Sezione biografia
│   │   ├── Contact.astro   # Form contatti
│   │   ├── Footer.astro    # Footer
│   │   ├── Hero.astro      # Sezione hero
│   │   ├── Navigation.astro # Navbar
│   │   ├── Photos.astro    # Galleria foto + lightbox
│   │   ├── Services.astro  # Servizi offerti
│   │   └── Videos.astro    # Slider video
│   │
│   ├── layouts/
│   │   └── Layout.astro    # Layout principale (corretto!)
│   │
│   └── pages/
│       └── index.astro     # Pagina home
│
├── public/                 # File statici
│   ├── photos/            # Le tue foto (photo1.jpg, etc.)
│   └── images/            # Thumbnail video (video1-thumb.jpg, etc.)
│
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

## 🎨 Componenti

Ogni componente è **autosufficiente** e contiene:
- HTML strutturale
- CSS con stili scoped
- Logica TypeScript (dove necessario)

### Esempio: Photos.astro
```astro
---
// Script TypeScript
const photos = [...];
---

<!-- HTML -->
<section>...</section>

<!-- CSS scoped -->
<style>...</style>
```

## 🖼️ Aggiungere le Immagini

1. **Foto profilo**: `public/profilo.jpg`
2. **Galleria**: `public/photos/photo1.jpg`, `photo2.jpg`, ...
3. **Video thumbnail**: `public/images/video1-thumb.jpg`, ...

## 🛠️ Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa le dipendenze |
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Build per la produzione |
| `npm run preview` | Anteprima della build |

## 🎯 Personalizzazione

### Modificare i testi
I testi sono nei file componenti in `src/components/`

### Modificare i colori
I colori sono definiti in `src/layouts/Layout.astro` (variabili CSS globali):

```css
:root {
  --primary-blue: #C75B39;   /* Terracotta */
  --light-blue: #F4C3A8;     /* Terracotta chiaro */
  /* ... */
}
```

### Modificare link Instagram
In `src/components/Footer.astro` - riga 9

### Modificare link video
In `src/components/Videos.astro` - array `videos`

## 🚀 Deploy

### Build
```bash
npm run build
```

Questo crea la cartella `dist/` con il sito ottimizzato.

### Hosting consigliati
- **Netlify**: Drag & drop della cartella `dist/`
- **Vercel**: Connetti il repository GitHub
- **GitHub Pages**: Usa GitHub Actions

## ✅ Vantaggi di questa versione

- ✨ **Zero errori** in Visual Studio Code
- 🎨 **Stili separati** per componente
- 📦 **Componenti riutilizzabili**
- 🔧 **Facile manutenzione**
- ⚡ **Performance ottimale**
- 📱 **Completamente responsive**

## 🎨 Palette Colori

- Background scuro: `#1A0F08`
- Terracotta: `#C75B39`
- Beige chiaro: `#F5F1E8`
- Testo grigio: `#C9B8A3`

## 📝 Note

- Tutti gli stili CSS sono **inclusi nei componenti**
- Il Layout è **corretto** e senza errori TypeScript
- Ogni componente è **indipendente**
- Codice **pulito e ben documentato**

---

**Fatto con ♥ da Claude**
