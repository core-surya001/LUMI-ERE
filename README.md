# LUMIÈRE | Haute Joaillerie & Fine Diamonds

A premium, modern, responsive frontend-only luxury jewelry eCommerce website inspired by Cartier, Tiffany & Co, and Mejuri.

![Lumière Luxury Jewelry](public/images/solitaire_diamond_ring.jpg)

## 💎 Features

- **Luxury Brand Aesthetic**: Minimal, elegant, high-end styling with generous white space and classic serif typography (*Cinzel* & *Playfair Display* paired with *Inter*).
- **Global Theme System**: Smooth Light and Dark mode toggle in the navbar with custom HSL gold accents (`#C9A646`).
- **Interactive Jewelry Catalog**:
  - Filter by Category (Rings, Necklaces, Earrings, Bracelets).
  - Filter by Precious Metal (18K Yellow Gold, Rose Gold, Platinum, 22K Gold).
  - Price range slider with live dynamic filtering.
- **Rich Product Details Page**:
  - Studio image gallery with modal zoom.
  - Precious metal swatches and ring sizing selectors.
  - **"Order on WhatsApp"** button with automatic pre-filled product order messages.
  - Sticky bottom action bar on scroll for easy Add to Cart and WhatsApp inquiries.
  - Detailed gemstone specifications, atelier descriptions, and verified reviews.
- **Client-Side Cart & Vault**:
  - Slide-over quick bag drawer with quantity controls.
  - Dedicated Shopping Bag page (`/cart`) with luxury order summary and checkout simulation.
  - Bulk WhatsApp checkout (`Order All via WhatsApp`).
  - Saved Vault (`/wishlist`) with one-click "Move to Bag".
- **Instant Search**: Real-time modal search across collections.
- **Bespoke Studio Imagery**: 100% matched high-resolution jewelry photography for every single creation.
- **Frontend-Only**: Zero external database or backend required. Pure client-side state powered by Zustand with persistent local storage.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **State Management**: Zustand (with Persist Middleware)
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js 18+ installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/core-surya001/LUMI-ERE.git

# Navigate to the project directory
cd LUMI-ERE

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Production Build

```bash
npm run build
npm run start
```

## 📜 License

MIT License. Designed and crafted for luxury digital experiences.
