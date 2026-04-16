# Elite-Path v2 — Site + Admin Panel

A Next.js-powered version of your Elite-Path site with a full admin control panel at `/admin`. Edit all content (brand, hero, services, testimonials, advisors, contacts) and design (colors, fonts) without touching code.

---

## 🚀 One-Time Setup (~10 minutes)

### Step 1 — Replace the old repo content

Your existing GitHub repo `nayernfs-ui/elite-path` currently has the static HTML version. Replace it with these new files.

**Easiest way:**

1. Delete the old files in your repo (GitHub website → click each file → Delete → Commit)
2. OR keep the repo but upload these new files over the old ones via **"Add file → Upload files"**

**Cleaner way (if you have Git):**

```bash
# Clone the repo locally
git clone https://github.com/nayernfs-ui/elite-path.git
cd elite-path

# Delete everything except the .git folder
# (On Windows: open the folder in File Explorer, select everything except .git, delete)

# Copy ALL the new files from elite-path-v2.zip into this folder

# Commit and push
git add .
git commit -m "Upgrade to v2 — Next.js + admin panel"
git push
```

### Step 2 — Enable Vercel KV Storage

1. Go to https://vercel.com/dashboard → click your **elite-path** project
2. Click the **Storage** tab at the top
3. Click **Create Database**
4. Select **Upstash for Redis** (it's the Vercel-managed KV option)
5. Name: `elite-path-kv` → Region: pick closest to your users (e.g., Frankfurt for MENA)
6. Click **Create**
7. On the next screen click **Connect Project** → select `elite-path` → click **Connect**

That's it — Vercel auto-adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables to your project. ✅

### Step 3 — Add the admin password + JWT secret

Still in your Vercel project dashboard:

1. Click **Settings** (top tab) → **Environment Variables** (left sidebar)
2. Add these two variables. For each: Name + Value + leave all environments (Production, Preview, Development) checked → **Save**

**Variable 1:**
- **Name:** `ADMIN_PASSWORD_HASH`
- **Value:** `$2b$12$azGf/Tz5UGOr9auPyZbMEekFyieUZ/YIoie0FqMjFB2rCBLKF.BTi`

(This is the bcrypt hash of your password `King80@#41280`. Keep the dollar signs — they're part of the hash format.)

**Variable 2:**
- **Name:** `JWT_SECRET`
- **Value:** `npizYMyp1V4Dg/fc/Gvr/XbKZBoPYK0hfAwrYECt1S956snBFlsDO7JjOOxmMxXo`

(A random secret for signing session cookies. Don't reuse this for anything else.)

### Step 4 — Redeploy

After adding env vars, Vercel needs to redeploy so they take effect:

1. In your Vercel project → **Deployments** tab
2. Find the most recent deployment → click the **⋯** (three dots) → **Redeploy** → confirm

Wait ~1 minute for the build to complete.

---

## ✅ Testing the Setup

Once the deploy completes:

1. **Visit your site:** `https://elite-path-flax.vercel.app/`
   - Should look identical to the old version
   - Language toggle, WhatsApp popup, etc. should all work

2. **Visit the admin panel:** `https://elite-path-flax.vercel.app/admin`
   - Should redirect to `/admin/login`
   - Enter password: `King80@#41280`
   - You should now see the admin control panel

3. **Test editing:**
   - Go to the **Hero** tab
   - Change the title
   - Click **Save changes** (top right)
   - Open the site in a new tab → refresh → see your change live

---

## 🎛️ Using the Admin Panel

### Tabs

| Tab | Edits |
|---|---|
| **Brand** | Company name (EN/AR) and tagline |
| **Hero** | Main headline, subheadline, buttons, description |
| **Stats** | The three numbers in the hero (13.8K+, 98%, etc.) |
| **Services** | All service cards — add, edit, delete, mark as featured |
| **Why Us** | The 4 reasons block |
| **Process** | The 4 steps block |
| **Testimonials** | Success stories — add, edit, delete |
| **Advisors** | WhatsApp contacts — add/remove advisors, change numbers |
| **Contact** | Email, office location, Facebook URL |
| **Design** | Colors (pickers) and fonts (dropdowns) |

### Notes

- **All changes are live within ~2 seconds** after clicking Save
- **No redeploy needed** for content changes — only Vercel env var changes need redeploy
- **Session lasts 7 days** — you stay logged in across browser sessions
- **Sign out** is in the bottom-left of the admin sidebar
- **To change the admin password:** generate a new bcrypt hash (see "Changing password" below) and update the `ADMIN_PASSWORD_HASH` env var in Vercel settings, then redeploy.

---

## 🔐 Changing the Admin Password

Since your current password is in chat history, you may want to change it. Quick way:

1. Go to https://bcrypt-generator.com/
2. Enter your new password → set rounds to **12** → click **Generate**
3. Copy the hash (starts with `$2b$12$...`)
4. In Vercel → Settings → Environment Variables → edit `ADMIN_PASSWORD_HASH` → paste new hash → Save
5. Redeploy (Deployments tab → ⋯ → Redeploy)

---

## 📂 Project Structure

```
elite-path/
├── app/
│   ├── admin/
│   │   ├── login/page.js       # Login screen
│   │   └── page.js             # Admin panel (auth-guarded)
│   ├── api/
│   │   ├── auth/login|logout|verify/   # Auth endpoints
│   │   └── content/route.js    # Content GET/POST
│   ├── globals.css             # All styles (site + admin)
│   ├── layout.js               # Root layout + Google Fonts
│   └── page.js                 # Home page (renders site)
├── components/
│   ├── SiteView.js             # Full site UI (data-driven)
│   └── AdminEditor.js          # Admin control panel UI
├── lib/
│   ├── auth.js                 # Password + JWT helpers
│   ├── db.js                   # Vercel KV wrapper
│   └── defaultContent.js       # Seed content (fallback)
├── public/
│   └── favicon.svg
├── package.json
├── next.config.js
├── jsconfig.json
└── README.md
```

---

## 🛠️ Local Development (optional)

If you ever want to run the site locally before pushing:

```bash
npm install
npm run dev
# Open http://localhost:3000
```

The site will run with default content. Admin login will not work locally without the env vars — create a `.env.local` file with the same four variables Vercel has (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `ADMIN_PASSWORD_HASH`, `JWT_SECRET`) if you want to test admin locally.

---

## 🆘 Troubleshooting

**"Server error" when logging in?** → Env vars not set. Double-check `ADMIN_PASSWORD_HASH` and `JWT_SECRET` are in Vercel → Settings → Environment Variables, then redeploy.

**"Vercel KV is not configured"?** → KV storage not connected to project. Re-do Step 2 above.

**Site looks unstyled?** → The build failed. Check Vercel → Deployments → click the failed deploy → view build logs.

**Can't see changes after saving?** → Hard refresh the live site (Ctrl+Shift+R) — browser cache.

---

## 📝 License

Your content, your brand. © 2026 Elite-Path.
