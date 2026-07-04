# 🛡️ Vedantu Privacy Center

> **Learning with Transparency.**  
> A production-quality, DPDP Act 2023 compliant Privacy & Consent Management frontend prototype for Vedantu.

---

## 📌 Overview

The **Vedantu Privacy Center** is a fully functional frontend prototype that demonstrates how an EdTech platform can implement **India's Digital Personal Data Protection (DPDP) Act 2023** compliance in a parent-facing product experience.

Built as a Product Management internship prototype, it showcases:

- ✅ Informed, granular consent management
- ✅ Parent identity verification
- ✅ Full privacy rights dashboard (access, correction, erasure, withdrawal)
- ✅ A polished, production-ready UI — not a generic AI layout

> **No backend. No authentication. No API calls.** All data is local state + mock JSON.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Running

```bash
# 1. Navigate to the project directory
cd Vedantu

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be live at **http://localhost:5173**

---

## 🗺️ Application Flow

```
/ ─── Landing Page
  └── /create-account        ── Step 1 of 5: Student & parent info
        └── /verify-parent   ── Step 2 of 5: Email OTP verification
              └── /privacy-overview    ── Step 3 of 5: Data purpose & retention
                    └── /granular-consent    ── Step 4 of 5: Permission toggles
                          └── /consent-summary     ── Step 5 of 5: Review choices
                                └── /success       ── Animated confirmation
                                      └── /dashboard          ── Student dashboard
                                            └── /privacy-center ── Settings hub
                                                  ├── /permissions
                                                  ├── /history
                                                  ├── /download
                                                  ├── /delete
                                                  └── /notifications
```

---

## 📄 Pages

| # | Page | Route | Description |
|---|------|--------|-------------|
| 1 | **Landing Page** | `/` | Hero section, feature cards, DPDP compliance section |
| 2 | **Create Account** | `/create-account` | Student + parent signup form with guardian confirmation |
| 3 | **Parent Verification** | `/verify-parent` | Multi-method selector; Email OTP flow is functional |
| 4 | **Privacy Overview** | `/privacy-overview` | Data category cards with purpose & retention info |
| 5 | **Granular Consent** | `/granular-consent` | Required vs optional permission toggles |
| 6 | **Consent Summary** | `/consent-summary` | Review accepted & declined permissions before confirming |
| 7 | **Success Screen** | `/success` | Animated confetti + confirmation checklist |
| 8 | **Student Dashboard** | `/dashboard` | Class schedule, subject progress, activity feed, charts |
| 9 | **Privacy Center — Overview** | `/privacy-center` | Consent health score, DPDP rights, quick actions |
| 10 | **Permissions** | `/privacy-center/permissions` | Live-edit all permission toggles |
| 11 | **Consent History** | `/privacy-center/history` | Grouped timeline audit log |
| 12 | **Download Data** | `/privacy-center/download` | Animated generate → progress → ready flow |
| 13 | **Delete Data** | `/privacy-center/delete` | Warning → type "delete" to confirm → done |
| 14 | **Notifications** | `/privacy-center/notifications` | Grouped notification preference toggles |

---

## 🛡️ DPDP Act 2023 Compliance

Every screen is designed around the following principles from India's DPDP Act 2023:

| Principle | Where Implemented |
|-----------|------------------|
| **Informed Consent** | Step-by-step onboarding with plain-language explanations |
| **Purpose Limitation** | Each data type card lists exact purpose and retention period |
| **Data Minimization** | Required vs optional permissions are clearly separated |
| **Parental Consent** | Guardian verification required before any consent is taken |
| **Right to Access** | Download data page (Section 11) |
| **Right to Correction** | "Request Correction" quick action in Privacy Center |
| **Right to Erasure** | Multi-step delete flow with 30-day SLA (Section 12) |
| **Right to Withdraw Consent** | Toggle any optional permission off at any time |
| **Transparency** | Full tamper-proof consent history audit log |
| **Privacy by Design** | Consent state is global, persisted, and reflected everywhere |

---

## 🏗️ Tech Stack

| Technology | Version | Usage |
|------------|---------|-------|
| **React** | 18 | UI framework |
| **TypeScript** | 5 | Type safety |
| **Vite** | 8 | Build tool & dev server |
| **TailwindCSS** | 3 | Utility-first styling |
| **Framer Motion** | 11 | Animations & transitions |
| **React Router** | v6 | Client-side routing |
| **Recharts** | 2 | Dashboard charts |
| **Lucide React** | Latest | Icons |
| **Radix UI** | Latest | Accessible primitives |
| **clsx + tailwind-merge** | Latest | Class name utilities |

---

## 📁 Project Structure

```
src/
├── App.tsx                        # Root with all routes
├── main.tsx                       # React entry point
├── index.css                      # Global styles + Tailwind
│
├── context/
│   └── AppContext.tsx             # Global state (dark mode, permissions, form data)
│
├── data/
│   └── mockData.ts               # All mock data (student, permissions, history, charts)
│
├── lib/
│   └── utils.ts                  # cn() utility for Tailwind class merging
│
├── components/
│   ├── Navbar.tsx                 # Responsive top navigation bar
│   ├── PermissionCard.tsx         # Expandable consent permission card
│   ├── PrivacyCenterLayout.tsx    # Sidebar layout for Privacy Center
│   └── ui.tsx                    # Shared: Button, Card, Badge, ToggleSwitch,
│                                  #         ProgressBar, Alert, MetricCard
│
└── pages/
    ├── LandingPage.tsx
    ├── CreateAccount.tsx
    ├── ParentVerification.tsx
    ├── PrivacyOverview.tsx
    ├── GranularConsent.tsx
    ├── ConsentSummary.tsx
    ├── SuccessScreen.tsx
    ├── StudentDashboard.tsx
    ├── PrivacyCenter.tsx
    ├── PermissionsPage.tsx
    ├── ConsentHistoryPage.tsx
    ├── DownloadDataPage.tsx
    ├── DeleteDataPage.tsx
    └── NotificationsPage.tsx
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary** | `#FF6B00` (Vedantu Orange) |
| **Secondary** | `#FFF7F2` |
| **Success** | `#16A34A` |
| **Warning** | `#F59E0B` |
| **Danger** | `#DC2626` |
| **Background** | `#FAFAFA` |
| **Cards** | White with soft shadow |
| **Border Radius** | 16px (`rounded-2xl`) |
| **Fonts** | Inter + Plus Jakarta Sans (Google Fonts) |
| **Dark Mode** | Full support via `class` strategy |

---

## ✨ Key UX Features

- **Dark Mode** — Toggle in navbar; persists via React state
- **Smooth Animations** — Framer Motion fade, slide, scale, spring, and stagger transitions
- **Micro-interactions** — Button hover/tap scale, card lift-on-hover, toggle spring animation
- **OTP Input** — Auto-advance focus between digits, backspace-to-previous
- **Animated Progress Bar** — Step indicator with dots and gradient fill
- **Live Permission Summary** — Banner on Granular Consent updates in real time as you toggle
- **Download Flow** — Circular progress animation → archive ready state
- **Delete Flow** — Warning checklist → type-to-confirm input → animated deletion
- **Area/Line Charts** — Recharts with custom styled tooltips and orange gradients
- **Responsive** — Mobile-first layout; sidebar collapses on small screens

---

## 🧪 Demo Credentials

This is a frontend-only prototype. Use any values:

| Field | Demo Value |
|-------|-----------|
| Student Name | Arjun Sharma |
| Age | 14 |
| Grade | Class 9 |
| Parent Name | Priya Sharma |
| Email | priya.sharma@gmail.com |
| OTP | Any 6 digits |

> ⚡ To skip onboarding, navigate directly to `/dashboard` or `/privacy-center`.

---

## 📜 License

This project is a prototype built for educational and demonstration purposes.

© 2026 Vedantu Innovations Pvt. Ltd. | DPDP Act 2023 Compliant Prototype
