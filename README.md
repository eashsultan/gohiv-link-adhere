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
npm run start
```

---

## 🎨 Key Features & Design Highlights

1. **Navigation Bar**
   - Brand logo with medical/tech pulse badge.
   - Smooth navigation links (`Features`, `How it Works`, `Pilot Program`, `Contact`).
   - English / Hausa quick language toggle for Gombe grassroots preview.
   - Vibrant Orange "Request Demo" CTA with modal trigger.
   - Mobile-first responsive hamburger navigation drawer.

2. **Hero Section**
   - High-impact typography and accessibility contrast.
   - Dual CTAs: "View Core Features" (Warm Gold) and "Partner With Us" (Outline).
   - Interactive Device Mockup featuring USSD dialer (`*384*44#`) and offline sync indicator.
   - Institutional alignment badges: GOMSACA, SASCP, SFH.

3. **Core Modules (3-Column Grid)**
   - **Testing & Linkage:** Anonymous self-assessment via toll-free USSD, offline GIS clinic locator, 48-hour referral vouchers.
   - **Adherence & Support:** Automated SMS, USSD, and WhatsApp medication reminders for daily ARVs and long-acting PrEP.
   - **Caregiver Mode:** Simplified tools allowing caregivers to manage paediatric adherence and log schedules for multiple children.

4. **Why GoHIV? Alternating Feature Showcases**
   - **Offline-First & USSD Ready:** 2G GSM cellular compatibility and local encrypted clinic cache.
   - **Privacy by Design:** NDPR compliant, zero identifiable HIV data storage, salted SHA-256 phone hashing.
   - **Localized for Gombe:** Hausa and English support, IVR audio note prompts, and high-contrast accessibility for low-literacy users.

5. **2027 Pilot Program (Deep Royal Blue)**
   - 4 Tracked KPIs: Testing Uptake (+45%), Linkage Rates (>90% in 48h), Viral Suppression (95% UNAIDS target), Caregiver Retention (98%).
   - Interactive 11 LGAs Deployment Selector (Akko, Balanga, Billiri, Dukku, Funakaye, Gombe, Kaltungo, Kwami, Nafada, Shongom, Yamaltu/Deba).

6. **Call to Action & Footer**
   - Dedicated contact for Alpha Spark:
     - Email: `alphaspark.ng@gmail.com` (one-click copy & mailto)
     - Phone: `09075444148` (one-click copy & tel)
   - Interactive Stakeholder Demo & Pilot Request Modal.

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
    └── app/
        ├── layout.tsx
        ├── globals.css
        └── page.tsx        <-- Single-file full functional landing page
```

## 📬 Contact
- **Organization:** Alpha Spark
- **Email:** [alphaspark.ng@gmail.com](mailto:alphaspark.ng@gmail.com)
- **Phone:** [09075444148](tel:09075444148)
- **Location:** Gombe State, Nigeria
