# How deploys work

`git push` to `main` **is** the deploy. Nothing else to do, no credentials in
any session.

The Vercel project `jewish-venice` (team "Alice Parrot's projects") is linked
to this GitHub repo via Vercel's standard Git integration:

- push to `main` → production deploy at **https://jewish-venice.vercel.app**
- push to any other branch → preview deploy on its own URL

There is no build: the site is static and served from the repo root
(project output directory is `.`, framework "Other").

## One quirk to leave alone

The Vercel project has a build command:

```sh
[ -f index.html ] || (curl -fsSL https://codeload.github.com/aliceagent/jewish-venice/tar.gz/refs/heads/main | tar -xz --strip-components=1)
```

For Git-integration builds it is a **no-op** (the checkout contains
`index.html`). It exists so the site can also be deployed from a Claude
session via the Vercel MCP connector's `deploy_to_vercel` tool — uploading
only a stub file tree — in which case the command fetches the real content
from this repo's `main` tarball. That is how the project was first created,
before the Git link existed.

## Replicating this for a future project

1. From a Claude session with the Vercel connector: `deploy_to_vercel` with
   the project name and either the real files or the tarball-stub trick above.
   This creates the Vercel project and puts the site live — no dashboard step.
2. In the Vercel dashboard (one minute, once per project): Project →
   Settings → Git → connect the GitHub repo, production branch `main`.
3. From then on, plain `git push` deploys. Sessions never need Vercel
   tokens; GitHub pushes go through the session's pre-authenticated git
   remote.

There is deliberately **no** `VERCEL_TOKEN` GitHub secret and no deploy
workflow in `.github/workflows` — an earlier iteration used one, but the Git
integration replaced it.
