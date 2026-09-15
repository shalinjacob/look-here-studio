# Deploying LOOK HERE STUDIO

This is a Next.js app with server routes (the waitlist + contact forms), so it
needs a Node host. **Vercel** is the easiest — free for this, made for Next.js.
You keep the domain at **GoDaddy** and just point its DNS at Vercel.

The repo is already initialised and committed locally.

---

## Step 1 — Put the code on GitHub (recommended path)

1. Create a new **empty** repo at https://github.com/new (e.g. `look-here-studio`).
   Don't add a README/gitignore — the project already has them.
2. In this folder, connect and push:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/look-here-studio.git
git push -u origin main
```

*(No GitHub account? Skip to “Alternative: Vercel CLI” at the bottom.)*

## Step 2 — Import into Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. **Add New → Project → Import** your `look-here-studio` repo.
3. Framework preset auto-detects **Next.js**. Leave build settings default
   (`next build`). Click **Deploy**. You'll get a live `*.vercel.app` URL.

## Step 3 — Add your domain in Vercel

1. Project → **Settings → Domains → Add** → type your domain (e.g.
   `lookhere.studio` — and add `www.lookhere.studio` too).
2. Vercel will show the exact DNS records to create. They are normally:

| Type | Name / Host | Value |
|------|-------------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

*(Use whatever Vercel shows you — those values are authoritative.)*

## Step 4 — Point GoDaddy at Vercel

1. GoDaddy → **My Products → Domain → DNS → Manage DNS**.
2. **Delete** GoDaddy's default parked `A @` record and the `CNAME www` if present.
3. **Add** the records from Step 3 (the `A @` and `CNAME www`).
4. Save. DNS usually propagates in minutes (can take up to a few hours). Vercel
   auto-issues the HTTPS certificate once it sees the records.

That's it — the site is live on your domain.

---

## Step 5 — Set the form providers (env vars)

The waitlist + contact forms fall back to a local file in dev; in production set
env vars so submissions actually go somewhere. In Vercel → **Settings →
Environment Variables**, add one waitlist provider and (optionally) a contact
webhook — see `.env.example` for the exact names (Buttondown / ConvertKit /
Mailchimp / generic webhook). Redeploy after adding them.

## Step 6 — Set the site URL for SEO

Once the domain is final, tell me the domain and I'll update `metadataBase` in
`app/layout.tsx` and the base URL in `app/sitemap.ts` / `app/robots.ts` so the
sitemap, robots and social cards use the real address. (Or change the
`https://lookhere.studio` strings in those three files yourself.)

## Redeploying later

With GitHub connected, every `git push` to `main` auto-deploys. To ship a change:

```bash
git add -A && git commit -m "your message" && git push
```

---

## Alternative: Vercel CLI (no GitHub)

```bash
npm i -g vercel
vercel        # first run: log in, link/create the project, deploys a preview
vercel --prod # deploy to production
```

Then do Steps 3–4 (domain + GoDaddy DNS) in the Vercel dashboard as above.

## Note on GoDaddy's own hosting

GoDaddy's cPanel / “Web Hosting” and Website Builder can't run a Next.js server
app, so the forms and dynamic routes wouldn't work there. Keep the domain at
GoDaddy for DNS, host the app on Vercel (or Netlify, which works the same way).
