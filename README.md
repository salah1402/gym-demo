# IRONVAULT // STRENGTH ARCHITECTURE

> High-performance, editorial, scroll-driven fitness web experience. Built with disciplined brutalist typography, cinematic athlete photography, and fluid GSAP/ScrollTrigger choreography.

---

## ⚡ Overview

IRONVAULT is a high-end strength architecture and athletic facility showcase website. It combines the raw, tactile aesthetic of industrial strength training (heavy iron, chalk, steel platforms) with modern editorial art direction.

### Key Highlights
- **Cinematic Hero**: Coordinated entrance motion with clipped athletic photography, staggered typography, and scroll scrub depth.
- **Responsive Architecture**: Fluid layout tested across mobile viewports (375px, 390px, 430px), tablets (768px, 1024px), and desktop (1440px+). Zero horizontal overflow.
- **Scroll-Driven Motion**: GSAP and ScrollTrigger choreography for headline reveals, photo parallax, metric counters, and facility showcases with reduced-motion fallback.
- **High-Resolution Photography**: Genuine high-definition athletic photography (up to 2400px wide) optimized for fast loading and crisp retina displays.
- **Interactive Intake & Routing**: Dynamic tier selection that smoothly scrolls and pre-selects membership plans in the application intake form.
- **Accessible Navigation**: Keyboard-accessible mobile drawer with focus management, ARIA states, and Escape key dismissal.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/salah1402/gym-demo.git
cd gym-demo

# Start the local server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── assets/                  # High-resolution athletic photography & logos
│   ├── ATTRIBUTION.md       # Full asset licenses and Unsplash/Pexels credits
│   └── ...
├── js/
│   └── app.js               # GSAP & ScrollTrigger motion controller + client UI logic
├── index.html               # Main semantic HTML5 markup with Tailwind styling
├── package.json             # Project metadata and run scripts
├── server.js                # Lightweight Node.js static file server
└── README.md                # Project documentation
```

---

## 🛠️ Tech Stack
- **Structure**: HTML5, Semantic markup
- **Styling**: Tailwind CSS
- **Typography**: Anton (Display), Space Grotesk (Body), JetBrains Mono (Technical)
- **Animation**: GSAP 3.12, ScrollTrigger
- **Server**: Native Node.js HTTP Server

---

## 📜 License & Credits
Photography sourced from Unsplash with commercial-use permissive licenses. See [ATTRIBUTION.md](assets/ATTRIBUTION.md) for individual photographer credits.
