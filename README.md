# 📱 QR Studio

> **GDG on Campus SRM Recruitments 2026–27 — Frontend Task**

**QR Studio** is a modern, responsive, client-side web application built with **React** and **Vite**. It allows users to generate, customize, preview, and download high-resolution QR codes for various data types, complete with custom color presets, scan contrast warnings, and local storage history.

---

## 🌟 Features

### 1. 🔀 Multi-Type Payload Generation
- **Website URL**: Prepends `https://` automatically if omitted.
- **Plain Text**: Multiline text input with live character limit indicator (up to 2,000 chars).
- **Email**: Pre-filled email addresses with subject lines and message body parameters (`mailto:` format).
- **Phone Number**: Sanitizes phone numbers for standard `tel:` links.
- **Wi-Fi Network**: Standard ZXing `WIFI:S:...;T:...;P:...;H:...;;` format supporting WPA/WPA2/WPA3, WEP, and Open networks, with proper character escaping for special symbols (`;`, `:`, `\`, `,`).

### 2. 🎨 Style Customization & Visual Presets
- **Live Color Pickers**: Custom foreground (QR modules) and background colors.
- **Curated Presets**: Quick 1-click styling options (Classic Mono, Midnight, Ocean Teal, Berry Neon, Emerald, Warm Amber, Inverted Dark).
- **Resolution Control**: Adjustable size slider from **128px × 128px** up to **512px × 512px**.
- **Quiet Zone (Margin)**: Custom module padding slider (0 to 6 modules).
- **Error Correction Levels (ECL)**: Support for **L (7%)**, **M (15%)**, **Q (25%)**, and **H (30%)** tolerance.

### 3. 🛡️ Scan Contrast & Reliability Analyzer
- Computes WCAG relative luminance and contrast ratio between foreground and background colors in real-time.
- Displays immediate warning banners if low contrast (< 2.5:1 ratio) or matching colors are selected to prevent non-scannable QR codes.

### 4. 🚀 Export & Instant Actions
- **PNG Download**: Canvas vector rendering converted to high-quality `.png` files with structured filenames (`qr-studio-[type]-[date].png`).
- **Copy Data Payload**: Instant clipboard copying of formatted QR payloads with toast notifications.
- **Save to History**: Save generated configurations with 1-click.

### 5. 💾 Browser LocalStorage History
- Automatically persists saved QR entries in `localStorage` under `qr_studio_history_v1`.
- **Reuse Configuration**: 1-click reload of past QR entries back into the live editor.
- **Delete Single Item**: Remove individual entries.
- **Clear All History**: Modal confirmation dialog before wiping local storage.

### 6. 🌙 Light & Dark Mode
- Full dark and light theme toggle with system memory persistence (`localStorage`).

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **QR Core Library**: [`qrcode`](https://www.npmjs.com/package/qrcode) (Canvas rendering)
- **Icons**: [`lucide-react`](https://lucide.dev/)
- **Styling**: Vanilla CSS with CSS Variables & Flexbox/Grid

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. Clone or open the repository folder:
   ```bash
   cd "d:/Personal/GDG TASK"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
```

To preview the built app locally:

```bash
npm run preview
```

---

## 🔍 How It Works

### QR Payload Generation
The app builds standardized URIs for each content type:
- **URL**: Ensures proper protocol prefix (`https://example.com`).
- **Wi-Fi**: Uses ZXing QR format: `WIFI:S:SSID;T:WPA;P:password;H:false;;`. Special characters inside SSIDs and passwords are escaped with backslashes.
- **Email**: Uses `mailto:user@domain.com?subject=...&body=...`.
- **Phone**: Uses `tel:+1234567890`.

### QR Code Canvas Rendering
The `qrcode` library takes the generated string payload and configuration options (size, margin, error correction level, dark color, light color) and draws the QR matrix directly onto an HTML5 `<canvas>` element using `QRCode.toCanvas()`.

### Browser Storage (`localStorage`)
The history list is read from browser `localStorage` on initial mount. Adding or deleting items updates the React state array and serializes it back to JSON in `localStorage`. Graceful fallback try/catch blocks handle disabled or quota-exceeded storage environments.

---

## 📸 Screenshots

*(You can capture screenshots of your running application and insert them here)*

- **Dashboard Dark Mode**: `[Insert Dark Mode Screenshot]`
- **Customizer & Live Preview**: `[Insert Customizer Screenshot]`
- **Wi-Fi QR Code Form**: `[Insert Wi-Fi Form Screenshot]`
- **Recent History & Modal**: `[Insert History Screenshot]`

---

## ⚠️ Known Limitations
- iOS Safari native camera apps cannot auto-connect to WEP Wi-Fi QR codes (WPA/WPA2 is standard).
- Extremely long plain text (> 2,000 characters) will produce dense QR codes that require high camera resolution to scan.

---

## 🧑‍💻 License & Credits
Built for **GDG on Campus SRM Recruitments 2026–27 Frontend Task**.
