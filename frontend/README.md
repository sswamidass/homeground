# Frontend - React

This directory contains the React + Vite application for Homeground's user-facing website.

## Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navigation.tsx    # Header/navigation bar
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Layout.tsx        # Page wrapper
│   │   └── *.css             # Component styles
│   ├── pages/                # Page components (one per route)
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Books.tsx
│   │   ├── Coffee.tsx
│   │   ├── MonthlyBox.tsx
│   │   ├── Subscription.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── *.css             # Page styles
│   ├── services/             # API integration
│   │   └── wordpressAPI.ts   # REST API client for WordPress
│   ├── assets/               # Static assets (images, SVGs)
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles & CSS variables
│   └── main.tsx              # React entry point
├── public/                   # Static files (favicon, logo)
├── index.html                # HTML template
├── package.json              # NPM dependencies
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
└── eslint.config.js          # ESLint rules
```

## Setup

### Prerequisites

- Node.js 18+ and npm installed

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

Server runs on **http://localhost:5173**

### Build

```bash
npm run build
```

Builds optimized production bundle to `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Technology Stack

- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **CSS3** - Styling with CSS custom properties

## Design System

Global CSS variables defined in `src/index.css`:

```css
--deep-blue: #0d3b52
--lake-blue: #2c5f7a
--sky-blue: #5ba8d1
--forest-green: #3d6b52
--sand: #e8d4c0
--accent-gold: #b8935f
```

## API Integration

The `src/services/wordpressAPI.ts` file handles all communication with the WordPress REST API:

- `getBooks()` - Fetch book content
- `getCoffee()` - Fetch coffee roaster content
- `getMonthlyBoxes()` - Fetch subscription box content

## Pages

- **Home** - Landing page with features and CTA
- **About** - Company story and values
- **Books** - Featured Great Lakes children's books
- **Coffee** - Artisan coffee roasters
- **Monthly Box** - Subscription box details
- **Subscription** - Pricing and sign-up
- **FAQ** - Frequently asked questions
- **Contact** - Contact form and information

## Static Assets

Logo and images should be placed in `public/` folder. They'll be served at the root path:

```jsx
<img src="/logo.png" alt="Homeground" />
```

## Deployment

Build and deploy the `dist/` folder to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web server

Note: Update `wordpressAPI.ts` with your production WordPress URL if different from `http://localhost:8000`
