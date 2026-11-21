# Karan Verma — Video Editor Portfolio

A dark cinematic responsive portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide.

## Includes
- Single-page layout: hero, category-led selected work, Results, about, experience, testimonial and contact.
- Category filters, muted hover previews, and an editorial video detail modal with previous/next navigation.
- Sanity project query with bundled fallback content and per-project view metrics.
- Studio schemas for projects, profile, experience, statistics and testimonials.
- Vercel SPA rewrite and environment templates.

## Run
```bash
npm install
npm run dev
npm run build
```

## Videos
The local MP4 source files are intentionally not committed to Git. Upload them to Cloudinary, then paste each secure video URL and thumbnail into Sanity. This avoids GitHub file-size limitations and oversized static hosting.

## Results and view tracking
The Results section shows only projects with a numeric `viewCount` and `showInResults: true`. Each entry stores its publishing platform, original post URL, last-checked date and metric source.

- **YouTube:** `api/youtube-views.js` retrieves public view counts for configured YouTube video IDs with the YouTube Data API. Add `YOUTUBE_API_KEY` as a server-side Vercel environment variable (Production, Preview and Development). Never use a `VITE_` prefix for this key.
- **Instagram and other platforms:** enter a verified count in Sanity for now. Automated Instagram Insights needs an authorised Meta/Instagram account connection; a Cloudinary MP4 URL alone does not expose social-post analytics.
- The Results total is calculated from displayed, verified project entries; it does not count unverified portfolio claims.

## Sanity
See [sanity/README.md](sanity/README.md). Create a Sanity project and configure the Studio environment variables. Invite only Karan as an editor. The public website uses a read-only client; no write token belongs in the browser.

## Before launch
Confirm performance figures, experience/client names, testimonial wording, email, social accounts and YouTube project titles with Karan. Values from the original portfolio are provisional until approved.

## Deploy
Import this repository into Vercel. Use Vite, build command `npm run build`, output directory `dist`. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` after configuring Sanity.


## Updating Karan's contact details and content

Contact destinations are centralised in `src/data/siteConfig.ts`. Update the WhatsApp number and message, email address, Instagram profile, or Topmate link there. The WhatsApp modal generates its QR locally in the browser; it does not call a paid QR service. `projectBookingUrl` is intentionally blank until Karan supplies a genuine project-call booking URL.

The main site content is kept in `src/App.tsx` and project entries are in `src/data/projects.ts`. The Services and Why Work With Me copy can be edited directly in the corresponding section markup. For the client feedback carousel, add each original, permission-cleared feedback image as an optimised WebP file under `public/feedback/` and add its `person`, `path`, and accessible `label` to `src/components/FeedbackCarousel.tsx`. Keep the source review wording/artwork intact. The carousel includes all ten original supplied feedback cards. Do not add private WhatsApp screenshots unless personal information is obscured and permission is confirmed.
