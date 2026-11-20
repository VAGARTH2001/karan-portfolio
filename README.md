# Karan Verma — Video Editor Portfolio

A dark cinematic responsive portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide.

## Includes
- Single-page layout: hero, selected work, impact, about, experience, testimonial and contact.
- Category filtering and click-to-play project modal.
- Three supplied MP4 projects represented by thumbnails; two supplied YouTube URLs are included as provisional projects.
- Sanity Studio schemas for projects, profile, experience, statistics and testimonials.
- Vercel SPA rewrite and environment templates.

## Run
```bash
npm install
npm run dev
npm run build
```

## Videos and hosting
The source MP4 files are intentionally not committed to this repository. Upload them to Cloudinary and set each project's video URL in Sanity before going live. This also avoids GitHub's repository file-size limits and oversized Vercel deployments.

## Sanity
See [sanity/README.md](sanity/README.md). Create a Sanity project, configure environment variables and invite only Karan as an editor. The frontend uses a public, read-only client; no write token belongs in the browser.

## Before launch
Confirm all performance figures, experience/client names, the exact testimonial, contact email, social accounts and YouTube project titles with Karan. Values carried over from the original supplied portfolio are provisional until approved.

## Deploy
Import this repository into Vercel. Use Vite, build command `npm run build`, output directory `dist`. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` after configuring Sanity.