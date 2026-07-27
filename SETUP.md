# One-time deploy setup

The deploy workflow (`.github/workflows/deploy.yml`) runs `vercel deploy --prod`
on every push to `main` — from GitHub's runners, so the Vercel token never
exists in any agent or developer environment.

It needs exactly one secret. Until it is set, every run fails immediately with
`VERCEL_TOKEN secret is not set`.

## 1. Create a Vercel token

<https://vercel.com/account/settings/tokens> → **Create Token**.

- Scope: the account (or team) the site should live in.
- If you set an expiry, set a reminder to rotate it.

## 2. Store it as a GitHub secret named `VERCEL_TOKEN`

Prefer an **organisation-level** secret if the repo lives in an org — every
future repo inherits it, which is what makes new projects zero-touch:

> Org → Settings → Secrets and variables → Actions → **New organization secret**
> → name `VERCEL_TOKEN`, repository access **All repositories**.

For a personal account (no org secrets), set it per-repo instead:

> Repo → Settings → Secrets and variables → Actions → **New repository secret**.

Or with the `gh` CLI:

```bash
# org-wide (preferred, orgs only)
gh secret set VERCEL_TOKEN --org <org> --visibility all

# repo-level fallback
gh secret set VERCEL_TOKEN --repo <owner>/jewish-venice
```

*Only if deploying into a Vercel **Team*** rather than a personal account, also
add `VERCEL_ORG_ID` (Vercel → Team Settings → General → Team ID). The workflow
passes it through when present.

## 3. Re-run the workflow

Actions → **Deploy to Vercel** → re-run the failed run (or just push to
`main`). The first successful run **creates the Vercel project** automatically,
named after the repo — there is no "Import Project" step in the dashboard. The
run's summary page shows the live URL, and a smoke-test step confirms it
returns HTTP 200.

## After that

`git push` to `main` is the only deploy action, forever. No per-project setup
remains for future repos if the secret was set at org level.

## First-visit check

Once live, eyeball the pages in a real browser: the photos are hot-linked from
Wikimedia Commons, which agent sandboxes cannot reach, so image loading has
never been verified end-to-end. A broken image hides its whole `<figure>`
(that's deliberate), so a missing photo looks like an intentional gap — check
that the synagogue and bridge photos actually appear.
