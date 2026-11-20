# Sanity Studio

The Studio is a separate authenticated Sanity application. Create a Sanity project, copy this file to .env, set the project ID and dataset, then run npm install and npm run dev from this folder.

Only invite Karan's account as an editor. Never put write tokens or admin credentials in the public website. Deploy the Studio separately from the Vite frontend.

The public frontend reads published Project documents using the public dataset. The remaining profile, statistics, experience and testimonial sections currently use the supplied starter copy; their schemas are available for the next CMS wiring step.