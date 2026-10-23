# MediClarify: AI Prescription & Lab Report Simplifier
*Translating Medical Jargon into Clear, Reassuring Knowledge*

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Web Speech AI](https://img.shields.io/badge/Voice%20AI-ElevenLabs%20%7C%20Web%20Speech-emerald.svg?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Workflow Automation](https://img.shields.io/badge/Workflow%20Automation-Webhook%20Ready-ea580c.svg?style=flat-square)](https://n8n.io/)

---

## 🎯 Problem Statement & Impact
Lab reports and doctor prescriptions are filled with intimidating clinical terminology (e.g., *Microcytic Hypochromic Anemia*, *Elevated Glycated Hemoglobin*, *Dyslipidemia*). Patients and elderly family members frequently experience anxiety, delay taking preventative action, or struggle to read doctor's handwriting.

**MediClarify** solves this by:
1. Showing **what is actually written on the diagnostic card and prescription** alongside plain-language translations.
2. Providing **multilingual voice narration** (English, Hindi, Punjabi) reading the exact findings and medications aloud.
3. Enabling **individual card audio playback** so patients can listen to any specific test finding or medication instructions.
4. Running **real client-side OCR** using Tesseract.js to scan and extract text from uploaded medical documents and photos.
5. Triggering **caregiver alerts via WhatsApp and webhooks** to keep family members informed.

---

## 🚀 Key Features

### 1. Authentic Diagnostic Card & Doctor Prescription Pad
- **Original Laboratory Card Header**: Clinical center name, barcode, specimen ID, and collection timestamps.
- **Doctor's Written Prescription Pad**: Exact medication orders with dosage, timing, duration, and patient instructions.
- **"Read Prescription Aloud"**: Audio playback of the doctor's exact written orders in English, Hindi, or Punjabi.

### 2. Clinical Results & Patient Dashboard
- **What Is Actually Written (Plain Language)**: 2–3 reassuring, jargon-free bullet points summarizing overall health status.
- **Key Metrics Table with Individual Audio Reader**:
  - Displays: `Listen Button | Lab Parameter | Observed Value | Normal Range | Status Badge | Explanation`.
  - Click the speaker next to any test to hear the exact finding read aloud.
- **Actionable Next Steps**: Interactive checklist covering diet, morning sunlight, hydration, and doctor follow-up.

### 3. Voice AI & Real OCR Engine
- **Voice AI Narration**:
  - Spoken summary of the patient's entire report and prescription card.
  - Animated sound visualizer waveform bars that bounce when audio is active.
  - Multi-speed playback (0.8x, 1.0x, 1.2x) with audio transcript preview.
  - Supports browser-native Web Speech API out of the box and optional ElevenLabs neural voices via settings.
- **Client-Side OCR (Tesseract.js)**:
  - Scans uploaded lab images and prescription photos.
  - Extracts text and parses clinical markers directly in the browser.

---

## 🛠️ Architecture & Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom medical palette and micro-animations
- **OCR Engine**: Tesseract.js client-side OCR
- **Icons**: Lucide React
- **Voice AI**: Web Speech API (`SpeechSynthesis`) + ElevenLabs REST API fallback
- **Automation**: n8n Webhook HTTP payload dispatch + WhatsApp link generator
- **AI Extraction**: Multi-modal Gemini / OpenAI pipeline with instant mock fallback

---

## 🏃 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📱 Mobile App (Android & iOS)

MediClarify is configured as a native mobile application using **Capacitor**, featuring native camera capture for photographing lab reports and prescriptions, hardware status bar theming, and safe-area notch handling.

### 📱 Mobile Architecture
- **Platforms**: Native Android (`android/`) & Native iOS (`ios/`)
- **Native Camera**: `@capacitor/camera` allows patients to photograph doctor prescriptions directly using their phone camera or choose from gallery.
- **Status Bar**: `@capacitor/status-bar` manages mobile status bar styling and colors.
- **Safe Area Insets**: Notch & gesture bar responsive padding configured.

### 🤖 Running on Android
1. Build and sync the latest mobile bundle:
   ```bash
   npm run cap:android
   ```
2. Or open the native project directly in **Android Studio**:
   - Open Android Studio -> Select **Open an Existing Project** -> Navigate to the `android` folder in this repo.
   - Click **Run** (`Shift + F10`) to launch on a connected physical phone or Android Emulator.
   - To build an APK: `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`.

### 🍎 Running on iOS (macOS required)
1. Build and sync the latest mobile bundle:
   ```bash
   npm run cap:ios
   ```
2. Or open the native project directly in **Xcode**:
   - Double click `ios/App/App.xcworkspace` (or `App.xcodeproj`).
   - Select your target simulator (e.g. iPhone 15/16 Pro) or connected iPhone.
   - Press **Cmd + R** to run.

