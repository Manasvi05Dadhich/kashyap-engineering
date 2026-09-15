# Kashyap Engineering — website + admin panel

Next.js site with a custom admin panel (no third-party CMS) for managing
products, categories, and blog posts. Data lives in MySQL (Railway).
Product photos are saved directly to the server's disk — built for
deployment on MilesWeb's Node.js hosting (mPanel).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Prisma ORM + MySQL (hosted on Railway)
- Custom admin panel at `/admin` (cookie session, no external CMS)
- Local disk storage for uploaded images (`public/uploads/products`)

## 1. Set up the database (Railway)

1. Create a free account at railway.app.
2. New Project -> Provision MySQL.
3. Open the MySQL service -> Connect tab -> copy the connection URL
   (looks like `mysql://root:xxxx@xxxx.railway.app:1234/railway`).

## 2. Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` - the Railway connection string from step 1
- `JWT_SECRET` - any long random string (`openssl rand -base64 32`)
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` - your first admin login

Then create the database tables and starter data:

```bash
npm run db:migrate    # creates tables in Railway MySQL
npm run db:seed       # adds starter categories + your admin login
```

Run it locally:

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin/login

Log in with the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set. From
there: Categories -> add a category -> Products -> add products with
photos.

## 3. Deploying to MilesWeb (mPanel)

1. In mPanel, open Node.js App Manager (or "Setup Node.js App").
2. Create a new app:
   - Node.js version: 20.x or later
   - Application root: wherever you upload this project's files
   - Application startup file: leave as default for Next.js (mPanel's
     Node.js App Manager runs `npm start` after build - check the exact
     field name in your panel, it varies slightly by version)
3. In the app's Environment Variables section, add the same variables
   as your local `.env` (`DATABASE_URL`, `JWT_SECRET`). You can leave the
   `SEED_ADMIN_*` ones out here - they're only needed once, when you run
   the seed script.
4. Upload the project (via Git, if mPanel supports it, or by zipping and
   using the File Manager / FTP).
5. In the app's terminal (mPanel gives you SSH or a built-in terminal):
   ```bash
   npm install
   npm run build
   npm run db:deploy   # applies migrations to the live database
   npm run db:seed     # only the first time, to create your admin login
   ```
6. Restart the Node.js app from mPanel.
7. Point your domain (kashyapengineering.com) at the app, either directly
   or through mPanel's reverse-proxy / domain mapping settings.

One thing to double check with MilesWeb support: if they put an Nginx
reverse proxy in front of your Node app, ask them to raise
`client_max_body_size` (e.g. to `10m`) - otherwise larger product photo
uploads from the admin panel may get rejected before they reach your app.

Also important: whatever deployment method you use for future updates
(Git pull, re-zip and upload, etc.), make sure it does NOT delete or
overwrite the `public/uploads` folder - that's where every product photo
you upload through the admin panel actually lives on disk.

## Project structure

```
prisma/schema.prisma        - database tables (Product, Category, BlogPost, Admin, CompanyStat)
prisma/seed.ts              - starter categories + first admin account
src/app/                    - public site pages
src/app/admin/              - admin panel (protected by middleware.ts)
src/app/api/                 - API routes used by both the admin panel and pages
src/components/              - homepage sections (Hero, StatsBar, ProductGrid, etc.)
src/lib/prisma.ts            - database client
src/lib/auth.ts              - admin password hashing + session tokens
```

## Adding more admin sections later

The Products and Categories sections follow the same pattern:
a Prisma model -> an API route in `src/app/api/...` -> a page + form under
`src/app/admin/(dashboard)/...`. Blog posts already follow this pattern
too, so it's a good template to copy for anything new (e.g. testimonials,
countries served, a video gallery).
