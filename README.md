```markdown
<!-- README.md -->
# 日本の心 — Nihon no Kokoro 🌸

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License MIT">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/made_with-%E2%9D%A4%EF%B8%8F_for_Japan-red?style=for-the-badge" alt="Made with love for Japan">
</p>

<p align="center">
  <strong>A modern, immersive single‑page website celebrating Japanese culture, tradition, art, food, and modern life.</strong><br>
  Built with pure HTML, CSS, JavaScript, GSAP, and seven beautiful themes.
</p>

---

## 🎑 Live Demo & Screenshots

> **Live Demo:** [https://your-demo-link.com](https://your-demo-link.com) *(placeholder)*

| Tokyo Night 🌙 | Sakura Pink 🌸 | Lavender Zen 🎋 |
|:---:|:---:|:---:|
| ![Tokyo Night](screenshots/tokyo-night.png) | ![Sakura Pink](screenshots/sakura-pink.png) | ![Lavender Zen](screenshots/lavender-zen.png) |

<details>
<summary>📸 More screenshots</summary>
<br>
<p align="center">
  <b>Hacker Green 🟢</b><br>
  <img src="screenshots/hacker-green.png" width="600" alt="Hacker Green theme">
</p>
<p align="center">
  <b>Cherry Blossom Red 🔴</b><br>
  <img src="screenshots/cherry-red.png" width="600" alt="Cherry Blossom Red theme">
</p>
<p align="center">
  <b>Deep Ocean Blue 🌊</b><br>
  <img src="screenshots/ocean-blue.png" width="600" alt="Deep Ocean Blue theme">
</p>
</details>

---

## ✨ Features

- **7 complete color themes** – Tokyo Night, Hacker Green, Magenta Bloom, Lavender Zen, Cherry Blossom Red, Deep Ocean Blue, Soft Sakura Pink
- **Full‑screen hero** with floating 3D elements (torii gate, pagoda, samurai helmet…)
- **Sakura petals falling** across the entire page (canvas animation)
- **Parallax scrolling** on hero floating objects
- **Glassmorphism + neumorphism** cards and UI
- **3D tilt effect** on cards & cuisine images (Vanilla‑tilt style)
- **Interactive quiz** – “How Japanese are you?”
- **Search bar** – instant cultural topic search
- **Lightbox** – click gallery / cuisine images to enlarge
- **Discord community section** with glowing invite button & live member count
- **Audio pronunciation** of Japanese phrases (Web Speech API)
- **Language switcher** – English / ローマ字 / 日本語
- **Mobile‑first responsive design** – works on 4K, tablet, and mobile
- **Scroll‑triggered animations** (GSAP + Intersection Observer)
- **Progress bar** on scroll
- **Back‑to‑top** cherry blossom button
- **Persistent theme & language** via `localStorage`
- **Smooth scrolling** and accessible navigation

---

## 🛠️ Tech Stack

- **HTML5** – semantic, accessible markup
- **CSS3** – custom properties, Grid, Flexbox, animations, glassmorphism
- **Vanilla JavaScript** – all interactions, logic, and theme switching
- **GSAP (GreenSock)** – hero animations, scroll reveal, parallax
- **Web Speech API** – Japanese phrase pronunciation
- **Canvas API** – sakura petal particle system
- **No frameworks or build tools** – runs directly in the browser

---

## 📂 Project Structure

```
nihon-no-kokoro/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete stylesheet (all themes, responsive)
├── js/
│   └── script.js       # All JavaScript functionality
├── assets/
│   └── (images, icons, fonts)   # Optional local assets
└── README.md           # You are here
```

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nihon-no-kokoro.git
   cd nihon-no-kokoro
   ```

2. **Open the project**
   - Double‑click `index.html` to open it in your browser.
   - Or serve it with any local server (Live Server, Python HTTP server, etc.):
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

3. **No dependencies to install** – everything is included via CDN (GSAP and Google Fonts).

---

## 🎨 Theme Customization

The site uses CSS custom properties (variables) for theming.  
**All 7 themes are defined in `:root` and `[data-theme="..."]` selectors inside `css/style.css`.**

### Change an existing theme
1. Open `css/style.css`.
2. Find the `[data-theme="your-theme-name"]` block.
3. Modify the CSS variables (colors, gradients, shadows, etc.) to match your brand.

### Add a new theme
1. Duplicate an existing theme block.
2. Change the `[data-theme="new-name"]` selector.
3. Add a new orb in `index.html` (inside `.theme-panel`) with `data-theme="new-name"` and a class like `orb-new`.
4. Add the orb’s background gradient in `style.css`.

Themes are saved automatically in `localStorage`. The active theme is loaded on page reload.

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature/amazing-idea`).
3. **Commit** your changes (`git commit -m 'Add amazing idea'`).
4. **Push** to the branch (`git push origin feature/amazing-idea`).
5. Open a **Pull Request**.

Please keep the code clean, well‑commented, and follow the existing folder structure.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open source under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgements

- Images from [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com)
- Fonts by Google Fonts: *Noto Sans JP*, *Shippori Mincho*, *Zen Kaku Gothic New*, *Inter*, *Playfair Display*
- Animations powered by [GSAP](https://gsap.com)
- Inspired by the beauty of Japan — ありがとうございます

---

<p align="center">
  Made with ❤️ for Japan<br>
  <sub>© 2026 日本の心 · Nihon no Kokoro</sub>
</p>
```

Save this as `README.md` in your project root. It includes all requested sections, badges, placeholder for screenshots and live demo, detailed features, tech stack, installation guide, theming instructions, contributing guidelines, and license info.
