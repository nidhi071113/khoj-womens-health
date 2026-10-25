# KHOJ · खोज 🌸
### *Find what your body is trying to tell you.*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80%20%7C%20%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80-orange.svg)](#-trilingual-localization)

> **"Because every woman deserves to be heard."**  
> **Khoj (खोज)** is an empowering, private, culturally grounded women's health platform built for India. It connects diffuse symptoms over time, identifies clinical patterns (such as heavy menstrual bleeding coupled with fatigue and iron deficiency), provides evidence-based guidance, and prepares women to walk into the clinic knowing exactly what to ask.

---

## 🌟 The 5-Stage Clinical Continuum

Khoj organizes women's health into five culturally rooted stages:

1. **SUNO (सुनो / Listen)**: Log symptoms in your own words in seconds through an interactive body map, quick chips, or free text (e.g. *"chakkar aate hain"*, *"bahut thakaan"*).
2. **SURAKSHA (सुरक्षा / Safety)**: Deterministic triage screening against severe red flags (e.g., soaking a pad every hour, severe pelvic pain with fever). Connects immediately to 112 emergency services and Tele-MANAS (14416).
3. **JODO (जोड़ो / Connect)**: Unfolds a multi-month longitudinal timeline. Highlights symptom clusters, cycle bands, and knots with transparent clinical explanations.
4. **RAAH (राह / Next Step)**: Evidence-based clinical recommendations indicating which specialist to see (e.g., Gynecologist or General Physician), urgency window, relevant tests (CBC, Ferritin), and verified local healthcare providers with interactive maps.
5. **SAATH (साथ / Carry Forward)**: Generates a doctor-ready **Doctor Passport** PDF summary, tracking questions to ask the clinician and managing post-visit follow-ups.

---

## 🚀 Key Features

### 🩸 Menstrual Cycle Tracker (`/app/cycle`)
- **Interactive Calendar**: Monthly calendar with previous/next controls and "Today" indicator.
- **Visual Period Days**: Recorded period days highlighted with sindoor, and estimated future windows shown with subtle dashed indicators.
- **Cycle Analytics**: Calculates average cycle length, average period length, longest and shortest cycles, with a 6-month comparative bar chart.
- **Clinical Irregularity Card**: Flags transparent variance rules (e.g., cycle lengths varying by >7 days) with clear *"Not a diagnosis"* notices.
- **Day Log Editor**: Log flow (Spotting, Light, Moderate, Heavy), pain severity (0–3), mood, and personal notes.

### 🍵 Self-Care Hub (`/app/self-care`)
- **Indian Kitchen Nourishment (Eating Well)**: Familiar everyday nourishment ideas including dal, rajma, chana, ragi, bajra, jowar, leafy greens (palak, methi), til, and seasonal vitamin C pairings (amla, lemon, guava).
- **Rest & Movement**: Practical sleep hygiene, restorative movement (butterfly pose, child's pose), and burn-prevention heat pad guidance.
- **Interactive "What Feels Right Today?" Widget**: Choose between Rest, Stretch, Walk, or Break for calm, non-judgmental suggestions.
- **Period Comfort & Hygiene**: Evidence-based product options (pads, tampons, cups) and a daily comfort checklist.
- **When to Seek Care**: Clear, supportive guidance on symptoms warranting prompt clinical evaluation.

### 🔒 Private On-Device Diary (`/app/self-care/diary`)
- **"Only you can see this"**: Stored strictly in local browser storage; **never transmitted to external servers or AI services**.
- **Guided Prompts**: Gentle writing cues like *"What did my body ask for today?"* without streaks or guilt.
- **Mood Chips**: Calm, Okay, Low, Anxious, Tired, Hopeful.
- **On-Device Safety Check**: Real-time detection of sensitive self-harm keywords, rendering a supportive Tele-MANAS helpline banner (14416) without modifying or exporting the text.

### 🌐 Trilingual Localization
- Full native support for **English (`en`)**, **हिन्दी (`hi`)**, and **मराठी (`mr`)**.
- Real-time language switching without page reload.
- Culturally accurate terminology using Fraunces and Noto Sans Devanagari typography.

### 🛡️ Privacy & Local-First Architecture
- **Discreet Mode**: Instantly disguises the browser title as *"Notes"* and conceals sensitive health terms.
- **User Scoped Storage**: Isolates data by user ID; separate accounts on the same browser cannot view one another's records.
- **Data Export & Erasure**: Single-click JSON export of your complete profile, check-ins, cycles, and passport questions; complete data deletion on demand.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Data Visualizations**: Recharts
- **Mapping**: Leaflet, React-Leaflet
- **PDF Generation**: html2canvas, jsPDF, DOMPurify
- **Backend / Mock Layer**: Python FastAPI (optional live mode) + standalone zero-dependency local mock engine

---

## 💻 Local Setup & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/nidhi071113/khoj-womens-health.git
cd khoj-womens-health

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

### (Optional) Python Backend Server
Khoj operates out of the box with zero setup in mock mode. If you wish to run the FastAPI backend:
```bash
pip install fastapi uvicorn pydantic
python -m uvicorn server.main:app --host 127.0.0.1 --port 8000
```

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended — Free & 1-Minute Setup)

1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Go to **[vercel.com](https://vercel.com/)** and sign in with GitHub.
3. Click **"Add New..."** → **"Project"**.
4. Select your **`khoj-womens-health`** repository from the list and click **Import**.
5. Leave the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.
7. In ~30 seconds, Vercel will provide your live URL (e.g. `https://khoj-womens-health.vercel.app`)!

> **Note**: This repository includes a configured [`vercel.json`](./vercel.json) that automatically handles single-page app (SPA) routing, ensuring direct navigation to `/auth`, `/app/cycle`, and `/app/self-care` works flawlessly without 404 errors.

### Deploying to Netlify
1. Go to **[netlify.com](https://www.netlify.com/)** and sign in.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose GitHub and pick `khoj-womens-health`.
4. Set Build command to `npm run build` and Publish directory to `dist`.
5. Click **Deploy Site**.

---

## 🎨 Design System & Palette

- **Cream Background**: `#FFF8F2` (warm, accessible, gentle on the eyes)
- **Deep Plum**: `#5B2A4E` (authoritative yet warm headings)
- **Sindoor / Terracotta**: `#C8553D` (accent buttons & period tracking)
- **Sage**: `#7A9E7E` (clinical reassurance, privacy badges)
- **Blush**: `#FBE6DE` (cards & containers)
- **Clay**: `#EADCCB` (subtle borders)
- **Typography**: Fraunces (Headings) & Inter / Noto Sans Devanagari (Body)

---

## ⚖️ Clinical Disclaimer

Khoj is an educational health advocacy prototype. Patterns and possibilities shared in the platform are intended to facilitate informed conversations with healthcare professionals. Khoj does **not** provide medical diagnoses or replace consultations with licensed physicians. In emergencies, call **112** (Emergency Services) or **14416** (National Tele-MANAS Mental Health Helpline).

---

## 👩‍💻 Author & Contributions

Built with ❤️ by **[Nidhi Sharma](https://github.com/nidhi071113)** for women's healthcare empowerment in India.
Contributions and feedback are warmly welcomed via Pull Requests and Issues!
