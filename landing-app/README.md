# WhatsAuto Landing Page Web Application

A modern, standalone landing page web application for **WhatsAuto** built with **React**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons** following the Cal.com / Linear design language.

---

## 🚀 Quick Start (Local Development)

```bash
# Navigate to the landing-app folder
cd landing-app

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Or from the repository root:
```bash
npm run landing:dev
```

---

## 📦 Production Build

```bash
npm run build
```
The output will be placed in `landing-app/dist/`, ready for static hosting.

---

## 🌐 Deploying Standalone to Hosting Providers

### Option 1: Deploy to Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `landing-app`.
3. Framework Preset will automatically detect **Vite**.
4. Click **Deploy**.

### Option 2: Deploy to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Set **Base directory**: `landing-app`.
3. Set **Build command**: `npm run build`.
4. Set **Publish directory**: `landing-app/dist`.
5. Click **Deploy Site**.

### Option 3: Deploy to Cloudflare Pages
1. Select **Cloudflare Pages** & connect your repository.
2. Set **Root directory**: `landing-app`.
3. Set **Build command**: `npm run build`.
4. Set **Build output directory**: `dist`.
5. Click **Save and Deploy**.

---

## 🖼️ Customizing the Hero Screenshot

Place your dashboard screenshot image in:
```
landing-app/public/dashboard-preview.png
```
The hero mockup frame will automatically load and showcase your screenshot. If no image is provided, it falls back to the interactive live mockup.

---

## 👤 Author & Contact

- **Creator**: Vedansh Danot
- **Email**: `pykalki@gmail.com`
- **GitHub**: [https://github.com/py-kalki/whatsapp-automation](https://github.com/py-kalki/whatsapp-automation)
- **License**: MIT
