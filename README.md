# 👗 LOOKBOOKgen - AI Fashion Content Generator


> **LOOKBOOKgen** is a modern, animated web app for fashion brands, creators, and e-commerce. Upload real model photos, preview AI avatar results, and browse a curated catalog with interactive 360° product views. The project is focused on reducing overproduction waste and improving the fashion content workflow.

---

## 🚀 What Does LOOKBOOKgen Do?
- **Showcase real model photos and AI avatar results** on the landing page.
- **Animated hero and mission section** highlighting the problem of overproduction waste in fashion.
- **Browse a static catalog** of fashion items with category, brand, and size filters (no backend, demo data only).
- **360° product viewer** for select items (demo images, interactive rotation).
- **Responsive, modern UI** with smooth animations (Framer Motion, Tailwind CSS).
- **Mission-driven:** Focused on reducing overproduction and fashion waste.

---

## 🛠️ How to Run LOOKBOOKgen

### 1. Prerequisites
- Node.js 16.x or higher
- npm (comes with Node.js) or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/rahulkannan08/lookwand.git
cd lookwand
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Start the Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Open in Your Browser
Go to [http://localhost:3000](http://localhost:3000)

---

## 📝 What You Can Do With LOOKBOOKgen
- **Landing Page:** See a modern, animated hero section, the LOOKBOOKgen logo, and a mission statement about reducing fashion waste.
- **Model Showcase:** View real model photos and AI avatar results (static images, not real-time generation).
- **Overproduction Waste Awareness:** See real images and animated overlays about fashion waste and the mission to reduce it.
- **Catalog:** Browse a static collection of dresses and outfits, filter by category/brand/size, and use live search (all data is demo/static).
- **360° Viewer:** For select items, drag to rotate and zoom for a full product view (demo images only).
- **Test Before You Produce:** Learn about the benefits of market validation before manufacturing (educational, not interactive).

---

## ✨ Main Features
- **Animated, Responsive Design** (Framer Motion, Tailwind CSS)
- **Static Model & Avatar Showcase**
- **360° Product Viewer** (demo, for select items)
- **Smart Filtering & Live Search** (on static data)
- **Sustainable Fashion Focus** (mission-driven messaging)
- **Modern UI/UX** with animated overlays and hero sections

---

## 📂 Project Structure

```
lookwand/
├── components/
│   └── DressViewer3D.js      # 360° rotation modal component (demo)
├── pages/
│   ├── _app.js                # Next.js app wrapper
│   ├── index.js               # Landing page (animated, mission, showcase)
│   └── lookbook.js            # Main catalog page (filter, search, 360° viewer)
├── styles/
│   └── globals.css            # Global styles & animations
├── package.json               # Dependencies & scripts
└── README.md                  # Documentation
```

---

## 🧑‍💻 For Developers
- All code is in JavaScript/React (Next.js)
- 3D viewer uses @react-three/fiber and three.js (demo only)
- Styling is with Tailwind CSS and styled-jsx
- Animations use Framer Motion
- Images for demo are in `/public/images` (add your own for real use)



**Made with ❤️ using Next.js and React**
