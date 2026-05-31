# Documentation - AI Teacher Toolkit (White-Label)

Welcome to the **AI Teacher Toolkit**! This production-ready Next.js application is designed for educators and institutions. It's built with high performance, a premium UI, and is fully white-labelable for your own brand.

---

## 🚀 Quick Start (Deployment)

### 1. Prerequisites
- **Node.js 18+** installed locally.
- A **Groq API Key** (Get one for free at [console.groq.com](https://console.groq.com)).
- (Optional) A **Vercel** account for hosting.

### 2. Local Installation
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API key to .env.local
GROQ_API_KEY=your_key_here

# Run development server
npm run dev
```

### 3. Vercel Deployment (One-Click)
1. Push this code to a Private GitHub Repository.
2. Connect the repository to **Vercel**.
3. Add the Environment Variable: `GROQ_API_KEY`.
4. Deploy!

---

## 🎨 White-Labeling (Branding)

We have centralized all branding settings to make it easy for you to rename the application and change logos in minutes.

### Central Configuration
Open `src/config/app.ts` to update:
- **Application Name**: Change `name` and `shortName`.
- **Organization**: Change `orgName` (displayed on PDFs/Exports).
- **SEO Metadata**: Update `title`, `description`, and `keywords`.
- **Social Links**: Update `url`, `github`, and `twitter`.

### Assets
Replace the following images in the `/public` folder:
- `logo.png`: Your primary application logo.
- `favicon.ico`: Your browser icon.
- `og-image.png`: The image displayed when sharing the link on social media.

---

## 🛠️ Customizing Tools

The application comes with 25+ pedagogical tools. You can find their logic in `src/lib/ai/prompts.ts`.

To add a new tool:
1. Define the tool key in `prompts.ts`.
2. Add the UI card for the tool in the components (e.g., `Home.tsx` or its equivalent).
3. Ensure the translation keys are added to `src/lib/i18n/translations.ts`.

---

## 🌍 Language Support

The toolkit currently supports:
- **English** (LTR)
- **Arabic** (RTL)

Translations are managed in `src/lib/i18n/translations.ts`. The UI automatically detects and adjusts layout direction based on the selected language.

---

## 📄 Advanced Features

### Premium PDF Export
The toolkit includes a custom PDF export engine (`src/components/OutputDisplay.tsx`) that handles RTL text and maintains premium styling. It uses `html2canvas` and `jspdf` with specific styling fallbacks to ensure compatibility with all browsers.

### Offline Support (PWA)
The app is a Progressive Web App (PWA). Once visited, it can be "Installed" on a phone or desktop. It caches assets for faster loading, though AI features still require an internet connection.

---

## ⚖️ License
This product is sold via CodeCanyon. Please refer to the marketplace license terms regarding redistribution and usage.

---
*Generated for the Marketplace Readiness Submission.*
