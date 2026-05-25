# Simple SEO CMS Admin

## Local Setup

1. Install dependencies:

```sh
npm install
```

2. Copy `.env.example` to `.env` and change:

- `JWT_SECRET`
- `CMS_ADMIN_EMAIL`
- `CMS_ADMIN_PASSWORD`

3. Run the API:

```sh
npm run dev:cms
```

4. Run the frontend:

```sh
npm run dev
```

5. Open:

```txt
http://localhost:8080/admin
```

The API seeds the first admin user the first time it creates `server/data/cms.json`.

**Important:** Changing `.env` later does **not** update an existing `server/data/cms.json` password. If login fails with the correct email/password:

```sh
npm run reset-admin
```

Or set `CMS_SYNC_ADMIN=true` and restart the CMS server to sync credentials from `.env`.

Use plain values in `.env` (no markdown):

```env
CMS_ADMIN_EMAIL=admin@example.com
CMS_ADMIN_PASSWORD=ChangeMe123!
```

## Production

Build the frontend:

```sh
npm run build
```

Start the combined API/static server:

```sh
npm start
```

### Vercel environment variables

In Vercel → Project → Settings → Environment Variables, add:

- `CMS_ADMIN_EMAIL` = `admin@example.com`
- `CMS_ADMIN_PASSWORD` = `ChangeMe123!`
- `JWT_SECRET` = (any long random string)
- `CMS_SYNC_ADMIN` = `true` (keeps admin password in sync with env on serverless)
- `CLIENT_ORIGIN` = your site URL, e.g. `https://your-app.vercel.app`

Redeploy after saving. Login at `https://your-app.vercel.app/admin/login`.

The Node server serves:

- `/api/*` CMS API routes
- `/uploads/*` media files
- the built public website from `dist`
- `/admin` as the protected CMS dashboard

## Admin Workflow

- Login at `/admin`.
- Use Blogs to create posts with rich HTML, headings, SEO fields, featured image, internal links, FAQ rows, author, disclaimer, and draft/publish status.
- Use Website Pages to view every public site page in one place, including static pages, trust pages, state calculator pages, blogs, and CMS pages.
- In Website Pages, select a page to update meta title, meta description, meta keywords, canonical URL, OG title, OG description, and URL slug fields individually.
- Published blogs render at `/blog/{slug}`.
- Use Pages to create lightweight CMS pages.
- Published pages render at `/p/{slug}`.
- Use SEO to create page-level SEO override records.
- Use Media to upload images, set alt text, delete images, and copy image URLs.
- Use Authors to manage EEAT author profiles.
- Admin users can manage Users and Settings.
- Editors can manage blogs, pages, media, authors, and SEO content.

## SEO Workflow

For each blog or page:

- Set the slug.
- Set meta title, meta description, meta keywords, canonical URL, OG title, and OG description.
- Add H1, H2, and H3 fields.
- Add internal links as `Label|/url`, one per line.
- Add FAQs as `Question|Answer`, one per line.
- Set status to `published`.

For built-in static pages and state calculator pages, Website Pages stores slug/canonical/SEO overrides while preserving the existing live route. For CMS-created blogs and pages, slug edits update the live `/blog/{slug}` or `/p/{slug}` route.

## Database

The current lightweight implementation uses JSON collections in `server/data/cms.json`. See `server/schema.md` for the collection/table structure. The same shape can be migrated to MongoDB collections or PostgreSQL tables later without changing the admin UI contracts.
