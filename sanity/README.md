# Sanity Studio

The Studio is a separate authenticated Sanity application. Create a Sanity project, set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET in sanity/.env, install dependencies from this folder, then run npm run dev.

Only invite Karan's account as an editor. Never put write tokens or admin credentials in the public website. Deploy the Studio separately from the Vite frontend.

The public frontend currently starts with bundled project placeholders. The Sanity project schemas and read-only client foundation are included; connect and verify the dataset before launch.