# GoHIV Link & Adhere — Landing Page

> **Bridging the HIV Care Continuum in Gombe State, Nigeria.**  
> An offline-first, privacy-centric digital platform connecting at-risk individuals to testing, care, and daily adherence support—no smartphone or internet required.

Designed specifically for key health stakeholders including **GOMSACA** (Gombe State Agency for the Control of AIDS), **SASCP** (State AIDS & STIs Control Programme), **SFH Nigeria** (Society for Family Health), and pilot partners.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /home/ishaqalpha/gohiv-link-adhere
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🎨 Key Features & Design Highlights

1. **Navigation Bar**
   - Glassmorphic floating island navbar with scroll-spy active section tracking.
   - English / Hausa quick language toggle for Gombe grassroots preview.
   - Vibrant gradient "Request Demo" CTA with shine-sweep hover animation.
   - Mobile-first responsive drawer with staggered link animations.

2. **Hero Section**
   - Light professional theme: white-to-slate gradient wash, pastel aurora blobs, dot-grid texture, and cursor-follow spotlight.
   - Animated gradient headline typography (Sora display font) with EN/HA toggle.
   - Auto-advancing horizontal Continuum Pipeline stepper (Risk → Link → Adhere) with completed-state checkmarks and flowing connector bars.
   - **Editorial framed photography**: CHEW portrait in a floating white frame with dashed accent rings, 3D mouse-tilt, drifting glass stat cards (Anonymous · 48-Hour Linkage · 95% Suppression), and slow hover zoom.
   - Magnetic primary CTAs that follow the cursor with spring physics.
   - Animated counter stat band: 11 LGAs, 5,000+ users, <48h linkage, 95% viral suppression.

3. **Trust Marquee**
   - Infinite institutional alignment strip (GOMSACA, SASCP, SFH, NDPR, UNAIDS 95-95-95…) that pauses on hover.

4. **Core Modules (Sliding Tab Interface)**
   - **Testing & Linkage:** real-world photography panel (HIV lab testing) with badge & caption overlay.
   - **Adherence & Support:** medication-kit photography panel with hover zoom.
   - **Caregiver Mode:** nursing care photography panel with badge & caption overlay.

5. **Why GoHIV? Photographic Proof Panels**
   - **Offline-First & USSD Ready:** red-ribbon solidarity portrait in a dark framed panel.
   - **Privacy by Design:** awareness-ribbon panel in a light framed card.
   - **Localized for Gombe:** heart-stethoscope caregiver portrait panel.

6. **Community Band**
   - Light split-section: scroll-parallax framed CHEW photography (respects `prefers-reduced-motion`) with drifting "Co-Designed Daily" glass card and three community stat cards (LGAs, languages, zero-stigma workflows).

7. **2027 Pilot Program (Light Professional Theme)**
   - 4 white KPI cards with animated counters, colored icon chips, and 3D tilt-on-hover.
   - Interactive impact calculator with custom glow slider (scale 1,000 → 10,000 users) on a light track.
   - Interactive 11-LGA deployment selector with animated facility lists, linkage progress bars, and express-interest deep-linking into the demo form.

8. **Testimonials & FAQ**
   - Auto-rotating grassroots voices carousel on a premium deep-navy contrast band (pauses on hover, manual navigation) — the site's single strategic dark section, keeping the page ~70% light.
   - Smooth accordion FAQ for stakeholder questions.

9. **Call to Action & Footer**
   - Dedicated contact for Alpha Spark:
     - Email: `alphaspark.ng@gmail.com` (one-click copy & mailto)
     - Phone: `09075444148` (one-click copy & tel)
   - Interactive stakeholder demo modal: two-panel layout, LGA pre-fill from pilot section, ESC/backdrop close, body scroll lock, and animated success check.

10. **Global Micro-Interactions**
    - Magnetic cursor-follow CTAs (hero, navbar, footer), 3D tilt-on-hover photo cards, scroll progress bar, reveal-on-scroll animations everywhere, toast notifications with progress bars, back-to-top button, and `prefers-reduced-motion` support.

---

## 📁 Repository Structure
```
gohiv-link-adhere/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── README.md
└── src/
    ├── app/
    │   ├── layout.tsx          # Sora + Inter fonts, metadata
    │   ├── globals.css         # Animation library & design tokens
    │   └── page.tsx            # Section composition
    ├── components/
    │   ├── providers.tsx       # Lang / toast / modal context
    │   ├── Navbar.tsx          # Scroll-spy glass navbar
    │   ├── Hero.tsx            # Aurora hero + arch-framed photo + pipeline + stats
    │   ├── TrustMarquee.tsx    # Institutional marquee
    │   ├── Modules.tsx        # Tabbed core modules + photo panels
    │   ├── WhyGoHiv.tsx        # Offline / privacy / voice photo panels
    │   ├── CommunityBand.tsx  # Ken Burns image band
    │   ├── PilotProgram.tsx    # KPIs + calculator + LGA grid
    │   ├── Testimonials.tsx   # Auto-rotating carousel
    │   ├── Faq.tsx            # Accordion FAQ
    │   ├── Footer.tsx         # CTA card + footer
    │   ├── DemoModal.tsx       # Stakeholder demo modal
    │   └── ui/                 # Reveal, AnimatedCounter, TiltCard, Magnetic,
    │                           # SectionHeading, ScrollProgress, BackToTop
    └── lib/
        └── data.ts            # LGA profiles, testimonials, FAQs
```

---

## 📬 Contact
- **Organization:** Alpha Spark
- **Email:** [alphaspark.ng@gmail.com](mailto:alphaspark.ng@gmail.com)
- **Phone:** [09075444148](tel:09075444148)
- **Location:** Gombe State, Nigeria
