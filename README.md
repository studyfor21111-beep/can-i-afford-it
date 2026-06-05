# Can I Afford It? AI — Production Next.js App

India's free AI-powered affordability calculator. Built with **Next.js 16 App Router**, TypeScript, Recharts, and Google AdSense.

---

## Project Structure

```
src/
  app/
    layout.tsx            ← Root layout: fonts, AdSense script, Header/Footer
    page.tsx              ← Home: hero, calculator, tools grid, FAQs, ads
    loading.tsx           ← Global Suspense loading state
    not-found.tsx         ← 404 page
    sitemap.ts            ← Auto-generates /sitemap.xml
    robots.ts             ← Auto-generates /robots.txt
    about/page.tsx
    contact/
      page.tsx
      ContactForm.tsx     ← "use client" contact form with states
    privacy-policy/page.tsx
    terms/page.tsx
  components/
    Header.tsx            ← "use client" — uses usePathname for active links
    Footer.tsx            ← Server component
    ErrorBoundary.tsx     ← "use client" class component
    AdSlot.tsx            ← "use client" — prevents duplicate pushes on navigation
    AffordabilityCalculator.tsx ← "use client" — main calculator form + result
    AffordabilityChart.tsx      ← "use client" — Recharts, dynamically imported
  lib/
    calculator.ts         ← Pure TS affordability logic (no browser APIs)
```

---

## Environment Variables

Create `.env.local` (never commit):

```env
NEXT_PUBLIC_SITE_URL=https://caniaffordit.ai
NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_TOP=1234567890
NEXT_PUBLIC_AD_SLOT_MID=0987654321
NEXT_PUBLIC_AD_SLOT_BOTTOM=1122334455
NEXT_PUBLIC_AD_SLOT_MOBILE=5544332211
GOOGLE_SITE_VERIFICATION=your_token_here
```

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

Build output: all routes are **Static (SSG)** — zero server compute needed on Vercel free tier.

---

## Vercel Deployment Checklist

1. **Push to GitHub** — commit all files, ensure `.env.local` is in `.gitignore`
2. **Import to Vercel** at vercel.com/new
3. **Add Environment Variables** in Project Settings → Environment Variables:
   - All `NEXT_PUBLIC_*` vars above
   - `GOOGLE_SITE_VERIFICATION`
4. **Custom Domain** — add `caniaffordit.ai` in Domains tab
5. **AdSense** — once domain is live, submit for AdSense review. Fill in real slot IDs in env vars
6. **Google Search Console** — verify domain using `GOOGLE_SITE_VERIFICATION` meta tag
7. **Submit sitemap** — `https://caniaffordit.ai/sitemap.xml` to Search Console

---

## Production Audit — Issues Fixed

| Issue | Fix Applied |
|-------|-------------|
| Hydration: `window` in SSR | All browser APIs inside `useEffect` only |
| Recharts SSR crash | Dynamic import with `ssr: false` |
| AdSense duplicate pushes on navigation | `initialized` ref guards single push per mount |
| Sticky mobile ad z-index conflict | `z-index: 999`, isolated to `sm:hidden` |
| Sidebar ads hidden on mobile | `hideOnMobile` prop uses `hidden sm:block` |
| Layout shift from ad slots | `min-height` + `contain: layout style` on all ad wrappers |
| Horizontal scroll | `overflow-x: hidden` on body + `max-width: 100vw` on mobile |
| Dark mode | Single CSS variable theme, no light mode inconsistencies |
| Missing error boundaries | `ErrorBoundary` wraps all pages in layout |
| Missing 404 page | `not-found.tsx` |
| Missing loading states | `loading.tsx` + `Suspense` around charts |
| Missing skip nav | `.skip-nav` focuses to `#main-content` |
| Missing ARIA labels | All sections have `aria-labelledby`, lists have `role="list"` |
| Font flicker (FOUT) | `display=swap` on Google Fonts link |
| No `robots.txt` or `sitemap.xml` | Generated via `robots.ts` + `sitemap.ts` |
| SEO: missing OG/Twitter tags | Full metadata in layout + per-page overrides |
| TypeScript errors in Recharts | `formatter` typed as `(v) => [fmt(Number(v)), ""]` |

---

## Troubleshooting

**Build fails: font fetch error**
→ Only occurs in restricted network environments (CI sandbox). Fonts load fine in browser via the `<link>` tag. Production build on Vercel has full network access.

**AdSense not showing**
→ Ensure `NEXT_PUBLIC_ADSENSE_PUB_ID` is set in Vercel env vars. Dev mode shows placeholder boxes intentionally.

**Charts not rendering**
→ Charts use `dynamic` with `ssr: false`. They only render client-side — this is correct and prevents SSR crashes.

**Contact form not sending**
→ The form currently simulates sending. Replace the `setTimeout` in `ContactForm.tsx` with a real API (Resend, Formspree, Netlify Forms, or a Next.js route handler).

**`window is not defined` error**
→ All `window` access is behind `useEffect` or in `"use client"` components. If adding new code, never access `window` at module scope.

---

## Performance Recommendations

- Add `public/favicon.ico` and `public/apple-touch-icon.png`
- Add OG image at `public/og-image.png` (1200×630) and reference in metadata
- Enable Vercel Analytics (free) for Core Web Vitals monitoring
- Consider adding `next/image` for any future images
- The calculator lib is pure TS — no API routes needed, zero cold start latency
