# Elite-Path — Visa, Study & Immigration Services

A modern, bilingual (English + Arabic), fully responsive landing page for Elite-Path visa & immigration services. Built with vanilla HTML/CSS/JS — no frameworks, fast, and easy to deploy anywhere.

## Features

- 🌗 **Premium design** — deep navy + warm gold, Cormorant Garamond + Manrope typography
- 🌐 **Bilingual** — full English / Arabic toggle with RTL support
- 📱 **Fully responsive** — mobile, tablet, desktop
- ⚡ **Fast** — zero dependencies, static HTML/CSS/JS
- 💬 **WhatsApp integration** — contact form opens WhatsApp with pre-filled message
- ✨ **Refined animations** — scroll reveals, floating passport, stamp rotations, marquee

## Project structure

```
elite-path/
├── index.html       # Main HTML with all sections
├── styles.css       # All styles (responsive, RTL-ready)
├── script.js        # Language toggle, nav, scroll reveal, form
├── favicon.svg      # Brand mark
├── vercel.json      # Vercel deploy config
└── README.md        # This file
```

## ⚙️ Before you deploy — customize these

Open `index.html` and update:

1. **WhatsApp number** — search for `https://wa.me/` (appears 3 times). Replace with your real number in international format. Example: `https://wa.me/201234567890`
2. **Email address** — replace `info@elite-path.com` with your real email
3. **Facebook group link** — already set: `https://www.facebook.com/groups/577292007865093`
4. **Office locations** — currently "Cairo · Dubai" — edit if different

## 🚀 Deploy to Vercel (3 options)

### Option A — Drag & drop (easiest)

1. Go to https://vercel.com/new
2. Sign in with your account
3. Drag the `elite-path.zip` file or the `elite-path` folder onto the page
4. Click **Deploy** — Vercel auto-detects it as a static site
5. Live at `https://your-project.vercel.app` in ~30 seconds

### Option B — GitHub → Vercel (recommended for updates)

1. Create a new repo on GitHub (e.g., `elite-path`)
2. Push these files:
   ```bash
   cd elite-path
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/elite-path.git
   git push -u origin main
   ```
3. Go to https://vercel.com/new → **Import Git Repository**
4. Select your repo → **Deploy**
5. Future `git push` auto-deploys

### Option C — Vercel CLI

```bash
npm install -g vercel
cd elite-path
vercel
vercel --prod
```

## 🌍 Custom domain

Once deployed in Vercel:
1. Go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `elite-path.com`)
3. Follow Vercel's DNS instructions at your registrar
4. Free SSL is automatic

## 🎨 Customize the design

| What | Where |
|---|---|
| Brand colors | `styles.css` → `:root` variables at top |
| Fonts | `index.html` Google Fonts link + `:root --font-*` |
| Section content | `index.html` — search by section comment |
| Testimonials | `<section class="success">` in `index.html` |
| Service cards | `<section class="services">` in `index.html` |

### Change the primary gold color
In `styles.css`:
```css
--color-gold: #ceA761;        /* main gold */
--color-gold-bright: #e4c188;  /* gradient highlight */
```

## 📧 Connect a real contact form

Currently the form opens WhatsApp. To receive emails:
- **Formspree** (free tier) — paste endpoint in form `action`
- **Web3Forms** (free, simple)
- Vercel Serverless Functions

## 📝 License

Your content, your brand. Design & code © 2026 Elite-Path.
