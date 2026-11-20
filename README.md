# Karan Verma — Video Editor Portfolio

A dark cinematic responsive portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide.

## Includes
- Single-page layout: hero, selected work, impact, about, experience, testimonial and contact.
- Category filters and click-to-play project modal.
- Sanity project query with bundled fallback content.
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

## Sanity
See [sanity/README.md](sanity/README.md). Create a Sanity project and configure the Studio environment variables. Invite only Karan as an editor. The public website uses a read-only client; no write token belongs in the browser.

## Before launch
Confirm performance figures, experience/client names, testimonial wording, email, social accounts and YouTube project titles with Karan. Values from the original portfolio are provisional until approved.

## Deploy
Import this repository into Vercel. Use Vite, build command `npm run build`, output directory `dist`. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` after configuring Sanity.
