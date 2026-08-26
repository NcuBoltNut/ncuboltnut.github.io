# NCU BoltNut Robotics Web Platform
## Architecture, CMS, Staging & Deployment Specification — v2

**Target repository:** `NcuBoltNut/ncuboltnut.github.io`  
**Target frontend:** Astro + TypeScript + Vue islands  
**Source of truth:** GitHub repository  
**Staging:** GitHub Pages  
**Production:** Cloudflare Pages  
**Production deployment policy:** Scheduled at most once per day by default, plus manual emergency deploy  
**Primary goal:** Build a site that can be maintained through structured content and UI workflows rather than by repeatedly reading and rewriting frontend code.

---

# 0. Decision Summary

The project should migrate from the current static HTML/CSS/vanilla-JS implementation to:

```text
Astro + TypeScript
        +
Vue where real interaction is needed
        +
Astro Content Collections / structured data
        +
GitHub as source of truth
        +
GitHub Actions for CI, staging and production deployment
        +
GitHub Pages as staging
        +
Cloudflare Pages as production
```

The key operating principle is:

> Ordinary website maintenance must be content management, not frontend development.

Future editors should be able to perform common tasks such as:

- add a news article
- add a generation
- add/remove/edit a member
- add a sponsor
- record a sponsorship
- add an achievement
- update social links
- upload media

without editing Astro components, Vue components or CSS.

Claude Code is used for **platform development and structural changes**.

The future Admin UI is used for **routine content maintenance**.

---

# 1. Why Migrate Now

The current site is still small enough that a migration is relatively inexpensive.

Most existing assets remain reusable:

- text content
- photography
- logos
- sponsor assets
- SEO copy
- visual identity
- design direction
- page hierarchy concepts

The main migration work is structural:

```text
duplicated page markup
→ reusable layouts/components

hard-coded content
→ collections/data

large shared CSS file
→ design tokens + component/page styles

page-specific scripts
→ isolated modules / Vue islands where appropriate

direct Cloudflare Git builds
→ GitHub-controlled CI/CD
```

AI-assisted development reduces implementation cost significantly.

The remaining important costs are:

- architecture decisions
- migration validation
- visual regression checking
- deployment correctness
- content model design

These costs should be paid once now, while the site is still manageable.

---

# 2. Technology Decision

## 2.1 Astro is the primary framework

BoltNut is primarily a content/portfolio/team website, not a SaaS dashboard.

Astro should own:

- routing
- layouts
- SEO
- static rendering
- content pages
- project archive
- news
- achievements
- sponsor pages
- member pages
- normal UI components

Default public output should remain static HTML whenever possible.

## 2.2 Vue is used selectively

Vue should be used where persistent client-side state or rich interaction is useful.

Examples:

- Admin UI
- interactive project filters
- interactive timelines
- 3D robot/CAD viewer
- complex media galleries
- other genuine application-like widgets

Do not hydrate static content unnecessarily.

Target ratio:

```text
PUBLIC WEBSITE
Astro     ~90%
Vue       ~10%

ADMIN
Vue       ~90%
Astro shell / routing as needed
```

---

# 3. Target Repository Structure

```text
/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── team/
│   │   ├── projects/
│   │   ├── news/
│   │   └── sponsors/
│   ├── video/
│   │   └── hero/
│   ├── icons/
│   └── documents/
│
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── achievements.astro
│   │   ├── sponsors.astro
│   │   ├── contact.astro
│   │   ├── news/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── admin/
│   │       └── index.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   └── ProjectLayout.astro
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── SectionHeader.astro
│   │   │   └── Button.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── CurrentEngineering.astro
│   │   │   └── FeaturedProject.astro
│   │   ├── projects/
│   │   └── sponsors/
│   │
│   ├── vue/
│   │   ├── public/
│   │   │   └── RobotViewer.vue
│   │   └── admin/
│   │       ├── AdminApp.vue
│   │       ├── NewsEditor.vue
│   │       ├── MemberEditor.vue
│   │       ├── SponsorEditor.vue
│   │       ├── ProjectEditor.vue
│   │       └── MediaLibrary.vue
│   │
│   ├── content/
│   │   ├── news/
│   │   ├── projects/
│   │   ├── activities/
│   │   └── achievements/
│   │
│   ├── data/
│   │   ├── site.ts
│   │   ├── generations.ts
│   │   ├── members.ts
│   │   ├── sponsors.ts
│   │   └── sponsorships.ts
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── components/
│   │   └── pages/
│   │
│   └── content.config.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTENT_GUIDE.md
│   ├── DESIGN_SYSTEM.md
│   ├── DEPLOYMENT.md
│   └── adr/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── staging.yml
│       └── production.yml
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── CONTRIBUTING.md
└── CLAUDE.md
```

---

# 4. Content Model

The frontend must not become the source of team data.

Content and presentation are separate.

## 4.1 Long-form content

Use Astro Content Collections for:

```text
news
projects
activities
achievements
```

Example article:

```md
---
title: "2026 Taipei Automation Exhibition"
date: 2026-08-21
category: event
cover: /images/news/2026-automation.webp
featured: false
authors:
  - pr-team
---

Article body...
```

## 4.2 Structured data

Use TypeScript/JSON/YAML-style structured records for data with stable fields:

```text
members
generations
sponsors
sponsorship relationships
social links
site metadata
```

Do not force everything into Markdown.

---

# 5. Reference-Based Data Design

Do not duplicate human-readable labels in every record.

## 5.1 Generations

```ts
{
  id: "gen-02",
  name: "第二屆",
  startYear: 2026,
  endYear: 2027
}
```

Member:

```ts
{
  id: "member-example",
  name: "Example",
  generation: "gen-02",
  group: "mechanical",
  role: "member",
  active: true
}
```

Changing the generation display name should require one change only.

## 5.2 Sponsors vs Sponsorships

Sponsor represents the organization:

```ts
{
  id: "misumi",
  name: "MISUMI",
  logo: "/images/sponsors/misumi.webp",
  website: "..."
}
```

Sponsorship represents a relationship/event:

```ts
{
  sponsor: "misumi",
  year: 2026,
  tier: "partner",
  support: [
    "Mechanical components",
    "Dream Gear program"
  ]
}
```

This allows the same sponsor to support multiple years without duplicating company metadata.

---

# 6. Schema Enforcement

The repository should validate content at build time.

Use Astro Content Collections schemas and/or Zod schemas.

Example:

```ts
const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  generation: z.string(),
  group: z.enum([
    "mechanical",
    "electrical",
    "software",
    "pr"
  ]),
  role: z.string(),
  photo: z.string().optional(),
  active: z.boolean(),
  order: z.number()
});
```

Goal:

> Do not depend on editors remembering every rule.

Invalid content should fail CI before production deployment.

---

# 7. Public Website Hero Upgrade

The homepage hero should move from YouTube iframe to native video.

Recommended assets:

```text
public/video/hero/hero-desktop.mp4
public/video/hero/hero-mobile.mp4
public/images/hero/hero-poster.webp
```

Required behavior:

- autoplay
- muted
- loop
- playsinline
- poster fallback
- desktop/mobile source
- full viewport
- accessible fallback
- reduced-motion support

Use one normalized `--hero-progress` value for scroll-driven effects.

Example:

```css
.hero-media {
  opacity: calc(1 - var(--hero-progress) * 0.82);
  transform: scale(calc(1 + var(--hero-progress) * 0.06));
}

.hero-content {
  opacity: calc(1 - var(--hero-progress) * 1.4);
  transform: translateY(calc(var(--hero-progress) * -48px));
}
```

Do not add a heavy animation library for this.

---

# 8. Homepage Information Architecture

Recommended homepage order:

```text
01 Hero
02 What We Build / Current Engineering
03 Featured Project
04 Team
05 Latest Updates
06 Achievements
07 Sponsors
08 Contact CTA
09 Footer
```

Narrative:

```text
Who we are
↓
What we build
↓
What we built
↓
Who builds it
↓
What is happening now
↓
What results we achieved
↓
Who supports us
```

Maintain the existing visual identity:

```text
Cream
Black
Orange
Orbitron
Noto Sans TC
Industrial
Editorial
Mechanical
Competition-driven
```

Do not copy DIT Robotics' visual identity.

---

# 9. GitHub Becomes the Operational Center

GitHub is the authoritative source for:

```text
source code
content
member data
sponsor data
media references
version history
review history
rollback history
```

Cloudflare should not be treated as the editor or primary build system.

The platform responsibilities are:

```text
GitHub
  Source of Truth

GitHub Actions
  Build / Test / Validation / Deploy orchestration

GitHub Pages
  Staging

Cloudflare Pages
  Production Hosting
```

---

# 10. Environment Model

## 10.1 Local

Used by developers/Claude Code.

```bash
npm install
npm run dev
```

Typical URL:

```text
localhost:4321
```

Purpose:

- feature development
- component work
- UI development
- local visual testing

## 10.2 GitHub Pages — STAGING

GitHub Pages deploys the current accepted `main` branch.

It updates whenever `main` changes.

Purpose:

- verify the exact built website
- content review
- mobile/desktop inspection
- smoke test before the next production window

Staging is not the public canonical site.

Use appropriate robots/noindex configuration if necessary to avoid staging SEO duplication.

## 10.3 Cloudflare Pages — PRODUCTION

Cloudflare serves the official public site.

Production does **not** deploy on every Git push.

Default policy:

```text
one scheduled production deployment per day
+
manual emergency deployment
```

This creates a natural review window.

---

# 11. Cloudflare Build/Deployment Budget Strategy

As verified in Cloudflare documentation in August 2026:

- Pages Free plan documents 500 Git builds per month.
- Cloudflare's Pages overview also summarizes a Free-plan limit of 500 deployments/month.
- Static asset requests remain free/unlimited.
- Pages single asset maximum is 25 MiB.
- Direct Upload/Wrangler supports prebuilt assets and external CI.

Therefore, design conservatively around **no more than 500 Cloudflare deployment events per month**, regardless of whether a specific path is categorized internally as a build or direct deployment.

A once-daily production policy produces approximately:

```text
28–31 scheduled deployments/month
```

Even with emergency manual deployments, this stays far below 500.

Do not depend on committing fewer times.

Developers/editors should be free to use GitHub normally.

Cloudflare usage is controlled by the deployment workflow.

Current Cloudflare documentation:

```text
https://developers.cloudflare.com/pages/platform/limits/
https://developers.cloudflare.com/pages/get-started/direct-upload/
https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
```

---

# 12. Cloudflare Integration Mode

If the current Pages project uses Git integration:

1. Disable automatic production deployments for Git branches.
2. Keep or migrate deployment responsibility to GitHub Actions.
3. Build the Astro site inside GitHub Actions.
4. Upload the generated `dist/` directory through Wrangler.

Conceptual command:

```bash
npx wrangler pages deploy dist   --project-name=<PROJECT_NAME>
```

Cloudflare credentials must be stored in GitHub Actions Secrets.

Never commit API tokens.

Recommended secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Give the token the minimum permissions needed for Pages deployment.

---

# 13. GitHub Actions Workflows

Three workflows are recommended.

## 13.1 CI — `.github/workflows/ci.yml`

Trigger:

```text
Pull Request
Push to main
```

Responsibilities:

```text
npm ci
typecheck
Astro content/schema validation
build
link check
basic tests
```

Conceptual workflow:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run check
      - run: npm run build
```

## 13.2 Staging — `.github/workflows/staging.yml`

Trigger:

```text
push to main
```

Responsibilities:

```text
build Astro
deploy to GitHub Pages
```

Staging should update frequently.

Cloudflare does not participate in this workflow.

## 13.3 Production — `.github/workflows/production.yml`

Trigger:

```text
schedule
workflow_dispatch
```

Responsibilities:

```text
checkout main
npm ci
validate
build
deploy dist/ to Cloudflare Pages
```

Conceptual structure:

```yaml
name: Production

on:
  schedule:
    - cron: "<chosen daily UTC time>"

  workflow_dispatch:

concurrency:
  group: production
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run check
      - run: npm run build

      - run: >
          npx wrangler pages deploy dist
          --project-name=${{ vars.CLOUDFLARE_PROJECT_NAME }}
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Choose a low-traffic daily window.

GitHub cron uses UTC and scheduled Actions are not guaranteed to start at the exact second/minute, which is acceptable for this use case.

---

# 14. Manual Emergency Deploy

Production workflow must include:

```yaml
workflow_dispatch:
```

Use when:

- urgent correction
- sponsor/legal correction
- broken production content
- major event requires immediate publishing

Workflow:

```text
fix/merge to main
↓
check GitHub Pages staging
↓
GitHub Actions
↓
Run workflow: Production
↓
Cloudflare
```

Do not create a second ad-hoc deployment mechanism.

There should be exactly one production pipeline.

---

# 15. CMS / Admin Strategy

The Admin UI should not be a traditional database dashboard.

It is a UI layer over repository content.

Architecture:

```text
Vue Admin UI
      ↓
validated content model
      ↓
GitHub write operation
      ↓
branch / commit / PR
      ↓
GitHub repository
      ↓
CI
      ↓
main
      ↓
GitHub Pages staging
      ↓
scheduled/manual Cloudflare production
```

Admin never writes directly to Cloudflare production.

---

# 16. Admin Information Architecture

Target `/admin`:

```text
BOLTNUT CMS

Dashboard

Content
├── News
├── Projects
├── Activities
└── Achievements

Team
├── Generations
├── Members
└── Advisors

Partners
├── Sponsors
└── Sponsorship History

Media
├── Images
├── Videos
└── Documents

Site
├── Homepage
├── Contact
├── Social Links
└── SEO
```

---

# 17. Admin Editing Experience

Example: Add member

```text
Name
Generation
Group
Role
Photo
Bio
Display order
Active
```

Example: Add sponsor

```text
Organization
Logo
Website
Tier
Year
Support type/content
Homepage visibility
Display order
```

Example: Add news

```text
Title
Publish date
Cover
Category
Summary
Body
Author
Gallery
Featured
```

The editor should not need to know:

```text
Astro
Vue
TypeScript
content collection syntax
CSS class names
routing
Cloudflare
```

---

# 18. Draft / Review / Publish Model

Recommended lifecycle:

```text
editing in Admin UI
↓
Save Draft
↓
content branch / commit
↓
Submit for Review
↓
Pull Request
↓
CI validates
↓
Merge to main
↓
GitHub Pages staging
↓
production window
↓
Cloudflare
```

A simpler early version may allow trusted maintainers to commit content directly to `main`.

However, the architecture should support PR-based editorial workflow later.

---

# 19. GitHub Authentication — Security Requirement

Never put a personal access token into browser JavaScript.

Forbidden:

```js
const token = "github_pat_...";
```

Forbidden:

```text
PAT stored in public repo
PAT embedded in Astro/Vue bundle
PAT stored as ordinary client-visible environment variable
```

Target secure choices:

```text
GitHub OAuth
or
GitHub App
```

A thin authentication/API layer may be hosted in a Cloudflare Worker if needed.

Responsibilities of that layer:

```text
OAuth callback/token exchange
authorize allowed GitHub users
perform restricted GitHub API actions
never expose long-lived secrets to browser
```

Keep this layer thin.

Do not turn the CMS into a large custom backend unless requirements expand.

---

# 20. Admin Development Phases

## Phase A — structured content first

Before building Admin UI:

```text
all common content must already be editable through data/content files
```

If adding a sponsor still requires editing a component, the content model is not ready.

## Phase B — read-only Admin

Build Vue UI capable of:

```text
list content
search content
preview content structure
```

No write API yet.

## Phase C — safe editing

Add:

```text
forms
schema validation
local editing state
preview
GitHub authentication
save/commit
```

## Phase D — editorial workflow

Add:

```text
draft branches
PR creation
review state
publish status
```

## Phase E — role controls if necessary

Only later consider:

```text
Editor
Reviewer
Maintainer
Administrator
```

Do not build complex permissions before the team actually needs them.

---

# 21. Git Is Not Autosave

Do not create a commit for every keystroke.

Admin state should remain local until the user explicitly saves.

Correct:

```text
type/edit
↓
local state
↓
Save
↓
one logical commit
```

Incorrect:

```text
type one character
↓
commit
```

Recommended commit examples:

```text
content: add 2026 automation exhibition article
team: add second-generation member
sponsors: record MISUMI 2026 partnership
content: fix exhibition article typo
```

---

# 22. Media Strategy

Cloudflare Pages static asset limit currently includes a maximum single-file size of 25 MiB.

Hero videos and other large media should be optimized aggressively.

Recommended:

```text
small hero media
→ public/video

large media
→ Cloudflare R2 / dedicated static media origin
```

Content data should reference media URLs/paths.

Do not commit uncompressed source footage.

Repository stores web delivery assets, not editing masters.

---

# 23. CSS / Design System Maintenance

Use:

```text
src/styles/tokens.css
src/styles/global.css
src/styles/components/
src/styles/pages/
```

No uncontrolled inline styles.

Design tokens should cover:

```text
colors
typography
spacing
container widths
breakpoints
radii
shadows
motion durations
z-index layers
```

Rule:

> New reusable visual values should become tokens rather than scattered magic numbers.

Preserve:

```text
cream
black
orange
Orbitron
Noto Sans TC
industrial/editorial look
```

---

# 24. Component Policy

Create reusable components when they represent a real repeated concept.

Good:

```text
Navbar
Footer
SectionHeader
ProjectFeature
SponsorLogo
NewsCard
MemberCard
```

Do not abstract one-off markup solely to reduce line count.

Avoid giant components.

Avoid duplicate competing components.

If two components solve the same purpose, consolidate them.

---

# 25. Dependency Policy

Dependencies are allowed when they clearly improve maintainability or enable a real requirement.

Core expected dependencies:

```text
Astro
Vue
TypeScript
Zod/content schema support
Wrangler in devDependencies for deployment
```

Do not add libraries casually for:

```text
simple fade animations
basic DOM interaction
small utility functions
layout
ordinary forms
```

For any significant dependency, document:

```text
purpose
why native implementation is insufficient
maintenance cost
replacement risk
```

---

# 26. Testing / Validation

Because AI reduces coding effort, invest more heavily in automated verification.

Minimum checks:

```text
Astro check
TypeScript
schema/content validation
production build
broken internal links
missing referenced assets
HTML smoke test
```

Recommended later:

```text
Playwright
```

Use a small set of representative tests:

```text
homepage desktop
homepage mobile
navigation
news article
project page
sponsor page
404
```

---

# 27. Branch / Responsibility Model

Recommended:

```text
main
= accepted staging version

feature/*
= product/frontend features

fix/*
= bug fixes

content/*
= content drafts / editorial PRs
```

Cloudflare production always deploys from `main`.

Do not deploy arbitrary feature branches to production.

---

# 28. Roles

## Editor

Can maintain:

```text
news
activities
members
generations
sponsors
photos
achievements
```

Uses Admin UI.

## Maintainer

Can maintain:

```text
Admin
Astro components
Vue components
schemas
design system
GitHub Actions
```

Uses Claude Code / source code.

## Architect

Can change:

```text
framework
content model
authentication
deployment model
major dependencies
repository architecture
```

Architectural changes require an ADR.

---

# 29. Architecture Decision Records

Use:

```text
docs/adr/
```

Initial ADRs should include:

```text
0001-use-astro-and-vue.md
0002-github-as-source-of-truth.md
0003-github-pages-staging-cloudflare-production.md
0004-scheduled-production-deployment.md
0005-content-collections-and-structured-data.md
0006-admin-writes-to-github-not-production.md
```

Template:

```md
# Decision

## Context

## Decision

## Alternatives

## Consequences
```

---

# 30. Migration Plan

Do not migrate everything in one uncontrolled prompt.

## Stage 1 — Bootstrap Astro

Create:

```text
Astro
TypeScript
Vue integration
base layout
design tokens
```

Do not redesign content yet.

## Stage 2 — Reproduce current pages

Migrate existing pages with visual parity first.

Goal:

```text
old site and new site contain the same information
```

## Stage 3 — Hero upgrade

Implement:

```text
native video
poster
desktop/mobile video
scroll progress
reduced motion
```

## Stage 4 — Homepage redesign

Add:

```text
Current Engineering
Featured Project
improved narrative
```

## Stage 5 — Content model

Move:

```text
news
projects
achievements
members
generations
sponsors
```

out of frontend markup.

## Stage 6 — CI + GitHub Pages staging

Implement:

```text
CI
staging
```

Confirm staging works reliably.

## Stage 7 — Cloudflare production workflow

Disable Git-triggered production builds.

Deploy using GitHub Actions + Wrangler on:

```text
daily schedule
workflow_dispatch
```

## Stage 8 — Admin UI

Start read-only.

Then add secure GitHub-backed editing.

---

# 31. Migration Safety Rule

Until the new Astro site passes acceptance testing, keep the current production site untouched.

Recommended migration workflow:

```text
new architecture branch
↓
local testing
↓
GitHub staging
↓
content parity check
↓
responsive check
↓
SEO check
↓
production switch
```

Do not dismantle the current deployment before the replacement is proven.

---

# 32. Production Acceptance Checklist

Before switching production:

- [ ] all existing public pages migrated
- [ ] URLs preserved or redirected
- [ ] SEO title/description preserved
- [ ] Open Graph metadata preserved
- [ ] canonical URL correct
- [ ] sitemap correct
- [ ] robots configuration correct
- [ ] desktop navigation works
- [ ] mobile navigation works
- [ ] hero fallback works
- [ ] reduced motion works
- [ ] sponsor links work
- [ ] social links work
- [ ] content schemas validate
- [ ] GitHub Pages staging deploys successfully
- [ ] production workflow deploys manually
- [ ] scheduled workflow configured
- [ ] Cloudflare automatic Git deployment disabled
- [ ] API tokens are secrets, not repository content
- [ ] rollback process documented

---

# 33. Definition of Done for Future Changes

A change is complete only when:

- [ ] task behavior implemented
- [ ] `npm run check` passes
- [ ] production build passes
- [ ] desktop checked
- [ ] mobile checked
- [ ] no new console errors
- [ ] no broken links/assets
- [ ] no source-of-truth duplication
- [ ] accessibility preserved
- [ ] reduced motion considered
- [ ] no secrets exposed
- [ ] docs updated if architecture changed
- [ ] GitHub staging verified when applicable

---

# 34. Claude Code Initial Migration Prompt

```text
Read CLAUDE.md and the Web Platform Architecture Specification before changing code.

Goal:
Migrate the existing NCU BoltNut Robotics website from flat static HTML/CSS/JS to Astro + TypeScript with selective Vue usage.

Important constraints:
- Preserve existing public content, SEO metadata and URLs wherever possible.
- Do not redesign the entire website during the first migration step.
- First achieve structural parity, then perform the hero/homepage redesign.
- Astro is the primary public-site framework.
- Vue is reserved for interactive islands and the future Admin UI.
- GitHub is the source of truth.
- GitHub Pages is staging.
- Cloudflare Pages is production.
- Cloudflare production must not deploy on every Git push.
- Production deployment will be performed by GitHub Actions through Wrangler on a daily schedule and workflow_dispatch.
- Do not embed GitHub or Cloudflare credentials in browser code.
- Do not add a database.
- Do not create the custom Admin write API until the content model is stable.

Before editing:
1. inspect all current HTML pages, style.css and script.js
2. inventory routes, SEO tags, images and repeated components
3. propose a migration mapping
4. list files to create/change
5. identify URLs that require redirects
6. identify repeated content that should become structured data

Implement in stages:
1. Astro/TypeScript/Vue bootstrap
2. BaseLayout/Navbar/Footer
3. migrate existing pages with visual parity
4. split design tokens/global styles
5. establish content/data schemas
6. add CI
7. add GitHub Pages staging

Do NOT configure the final Cloudflare production pipeline until the migrated staging site builds successfully.

After each stage:
- run validation/build
- summarize changes
- list known regressions or debt
- do not silently expand scope
```

---

# 35. Final Operating Model

```text
                    ┌─────────────────────┐
                    │ Editor / Maintainer │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
             Admin UI                    Claude Code
          routine content              platform changes
                │                             │
                └──────────────┬──────────────┘
                               ▼
                         GitHub Repository
                               │
                    CI / schema validation
                               │
                               ▼
                              main
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
           GitHub Pages              scheduled/manual
             STAGING                   production job
                                            │
                                            ▼
                                      Astro build dist/
                                            │
                                            ▼
                                         Wrangler
                                            │
                                            ▼
                                    Cloudflare Pages
                                      PRODUCTION
```

The desired handoff rule is:

> If you are updating normal team content, use Admin.  
> If you are changing website capability or design, use the source repository / Claude Code.  
> GitHub records every change.  
> GitHub Pages proves the accepted version.  
> Cloudflare receives production updates on a controlled schedule.

This architecture intentionally separates:

```text
editing
review
staging
production
```

so routine maintenance does not require future members to understand the frontend architecture, while the site remains fully version-controlled and reversible.
