# PRAHAR (प्रहर) — Luxury D2C Fragrance & Music Experience

> **"The fragrance you can hear."**  
> *"Every hour has a story. Every raga has a scent."*

---

## Brand Essence & Creative Direction

**PRAHAR (प्रहर)** is an Indian luxury fragrance house inspired by Indian classical ragas, the natural circadian cycles of the day, ancient botanical hydro-distillation, and contemporary digital soundscapes.

For centuries, Indian classical musicians performed each raga only at its designated hour (*prahar*). PRAHAR translates this relationship between chronobiology, sonic vibration, and emotion into haute perfumery.

### The Five Sacred Hours & Ragas

1. **01. BHAIRAV (Dawn: 3 AM – 6 AM)**
   - **Mood:** Awakening & Meditative
   - **Notes:** Sacred Tulsi, Bergamot, Cardamom, Sandalwood, Frankincense, Vetiver
   - **Visual Atmosphere:** Sunrise mist, temple courtyards, warm earthy dawn light

2. **02. SARANG (Midday: 12 PM – 3 PM)**
   - **Mood:** Brightness & Vitality
   - **Notes:** Neroli, Green Mango, Orange Blossom, Jasmine Sambac, White Cedar
   - **Visual Atmosphere:** High noon brilliance, lush Indian summer foliage

3. **03. YAMAN (Twilight: 6 PM – 9 PM)**
   - **Mood:** Romance & Intimacy
   - **Notes:** Rajnigandha (Tuberose), Saffron, Mogra, Damask Rose, Golden Amber
   - **Visual Atmosphere:** Golden hour amber skies, candlelit courtyards

4. **04. DARBARI (Midnight: 12 AM – 3 AM)**
   - **Mood:** Regal & Sovereign
   - **Notes:** Royal Oud, Kashmiri Saffron, Damask Rose Absolute, Mysore Sandalwood
   - **Visual Atmosphere:** Mughal palace chambers, deep shadows, gold filigree

5. **05. MALHAR (The Monsoon: Rain)**
   - **Mood:** Renewal & Petrichor
   - **Notes:** Wild Coastal Kewra, Rain-washed Jasmine, Mitti Attar (Baked Earth)
   - **Visual Atmosphere:** Monsoon rainfall, wet stone steps, refreshed soil

---

## Technology Stack

- **Framework:** Next.js 15 (App Router with SSG pre-rendering)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Motion & Interactions:** Framer Motion 11 & GSAP 3
- **Icons:** Lucide React
- **Audio Synthesis:** Web Audio API (Tanpura drone harmonics per raga) & HTML5 Audio
- **State Management:** Zustand 5 (Persistent Shopping Bag Store)
- **Deployment:** Zero-config Vercel deployment ready

---

## Architectural & Feature Highlights

### 1. Cinematic Hero Experience (`/`)
- Dynamic bottle illumination with atmospheric smoke simulation
- Real-time digital chronometer displaying the visitor's current hour
- Floating musical notation (♪ ♫) with organic physics
- Interactive ambient soundwave ribbon
- Parallax depth and staggered typography

### 2. The Five Ragās Explorer (`/fragrances`)
- Timeline navigation across all 5 divisions of the day
- Olfactory architecture breakdown (Top, Heart, Base notes)
- Responsive luxury bottle silhouettes with raga-specific hues
- One-click cart addition and direct audio portal links

### 3. Digital Music Experience (`/experience`)
- Functional interactive audio player with **Web Audio API synthesis**: generates real meditative Indian classical drone chords for each raga
- Reactive animated waveform visualization
- Volume controls, seeking, and track progression
- Physical-to-digital QR code scanning demonstration

### 4. Dedicated Bottle QR Landing Portals (`/experience/[raga]`)
- Individual NFC/QR gateway routes:
  - `/experience/bhairav`
  - `/experience/sarang`
  - `/experience/yaman`
  - `/experience/darbari`
  - `/experience/malhar`
- Authenticated product badge, application ritual guides, and replenishment ordering

### 5. Interactive Olfactory Quiz: "Find Your Raga" (`/quiz`)
- 4-step psychographic and chronobiological consultation
- Scoring algorithm matching time of day, mood, atmosphere, and fragrance family
- Personalized results with soundscape stream and one-click purchasing

### 6. Direct-to-Consumer Storefront (`/shop`)
- Full catalog with category filters:
  - **Eau de Parfum (50ml):** ₹2,799
  - **Pure Attar Roll-ons (10ml):** ₹1,499
  - **Discovery Set (5 × 2ml):** ₹999
  - **Soy Wax Raga Candles (200g):** ₹1,299
  - **The Diwali Collection Gift Box:** ₹2,499
- Slide-in Cart Drawer (`CartDrawer`) with quantity controls, line totals, and demo checkout

### 7. Brand Story & Three Pillars (`/our-story`)
- Historical origins of the *prahar* system and Tansen's court traditions
- Kannauj *deg-bhapka* hydro-distillation craft
- The Three Pillars:
  - **Cultural Impact:** Reviving classical heritage
  - **Wellbeing Impact:** Circadian alignment
  - **Sustainability:** Conscious packaging and artisan partnerships
- Future horizons roadmap (Home nebulizers, wellness spas, artist collaborations)

### 8. Cultural Campaign `#ListenToTheScent` (`/discover`)
- Narrative timeline: 7 days of audio-first teasers leading up to time-bound drops
- Social media campaign previews and experiential PR sound pods

---

## Project Structure

```
prahar/
├── app/
│   ├── discover/page.tsx             # #ListenToTheScent campaign & innovation
│   ├── experience/
│   │   ├── page.tsx                  # Digital music sanctuary & player
│   │   └── [raga]/
│   │       ├── page.tsx              # Static raga QR landing page
│   │       └── QrExperienceClient.tsx# Audio stream & ritual guide
│   ├── fragrances/
│   │   ├── page.tsx                  # The Five Ragās collection showcase
│   │   └── [slug]/page.tsx           # Fragrance detail view
│   ├── our-story/page.tsx            # Brand manifesto, history & pillars
│   ├── quiz/page.tsx                 # "Find Your Raga" consultation
│   ├── shop/
│   │   ├── page.tsx                  # Full D2C storefront
│   │   └── [slug]/
│   │       ├── page.tsx              # Product detail page
│   │       └── ProductDetailClient.tsx
│   ├── globals.css                   # Tailwind theme, typography & keyframes
│   ├── layout.tsx                    # Root layout with Navbar, Cart & Footer
│   └── page.tsx                      # The grand home page experience
├── components/
│   ├── Navbar.tsx                    # Transparent-to-solid navigation & mobile menu
│   ├── Hero.tsx                      # Cinematic bottle opening & clock
│   ├── StorySection.tsx              # "What if you could wear this?" editorial
│   ├── RagaExplorer.tsx              # Signature 5-raga interactive stage
│   ├── MusicPlayer.tsx               # Web Audio API raga drone synthesizer
│   ├── HowItWorks.tsx                # 4-step ritual from Listen to Live
│   ├── ProductCard.tsx               # Luxury card with bottle silhouette & cart
│   ├── ProductGrid.tsx               # Filterable product gallery
│   ├── DiscoveryQuiz.tsx             # Interactive recommendation engine
│   ├── TechnologySection.tsx         # Connected digital-physical ecosystem
│   ├── CampaignSection.tsx           # Launch drop timeline & reels
│   ├── BrandPhilosophy.tsx           # 3 pillars & future expansion
│   ├── CartDrawer.tsx                # Slide-in bag with Zustand store
│   └── Footer.tsx                    # Dark luxury footer with soundwaves
├── data/
│   ├── ragas.ts                      # 5 Ragas: notes, times, colors, stories
│   └── products.ts                   # Complete product catalog with INR pricing
├── lib/
│   ├── cart.ts                       # Zustand persistent shopping cart store
│   └── recommendations.ts            # Chronobiological quiz matching logic
├── public/                           # Static assets
├── tailwind.config.ts                # Custom colors (ivory, gold, amber, charcoal)
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js 18.17 or higher
- npm 9 or higher

### Installation

```bash
# 1. Navigate to the project directory
cd prahar

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Verification

To verify that the application compiles and pre-renders cleanly:

```bash
# Run ESLint validation
npm run lint

# Build production bundle (all 46 static pages generated)
npm run build

# Start production server locally
npm run start
```

---

## Deploying to Vercel

The application is structured to be deployed to Vercel with zero extra configuration.

### Option A: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B: Via Git / GitHub

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"New Project"**.
3. Import the repository.
4. Set the root directory to `prahar` (if in a subfolder) or repository root.
5. Framework Preset: **Next.js**.
6. Click **Deploy**.

---

## Design System Tokens

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F5EBDD` | Primary background |
| **Pale Parchment** | `#EADBC5` | Secondary background & cards |
| **Deep Espresso** | `#24160F` | Primary editorial typography |
| **Antique Gold** | `#B38A45` | Primary luxury accent & buttons |
| **Burnt Amber** | `#B96A2D` | Secondary accent & highlights |
| **Midnight Charcoal** | `#17131D` | Dark sections, hero & audio deck |
| **Champagne Gold** | `#D6B77C` | Typography highlights & audio bars |

---

*PRAHAR (प्रहर) — Rooted in India. Modern expressions. A fragrance for every hour.*
