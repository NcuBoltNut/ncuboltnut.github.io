# CLAUDE.md — NCU BoltNut Robotics Web Platform

This file contains mandatory rules for Claude Code and AI-assisted contributors.

## 1. Architecture Contract

Target architecture:

```text
Astro + TypeScript
+
selective Vue islands
+
GitHub source of truth
+
GitHub Actions CI/CD
+
GitHub Pages staging
+
Cloudflare Pages production
```

The public website is a content-heavy static site.

Astro is primary.

Vue is used only where client-side application behavior is useful, especially:

- Admin UI
- 3D/interactive viewers
- rich filters/timelines
- other genuinely interactive islands

Do not turn the public website into a full client-side SPA.

## 2. Deployment Contract

GitHub is authoritative.

```text
main
→ accepted staging state

GitHub Pages
→ staging

Cloudflare Pages
→ production
```

Cloudflare production must NOT deploy automatically on every Git push.

Production deployment must use one GitHub Actions workflow with:

```text
schedule
workflow_dispatch
```

Build inside GitHub Actions, then upload the generated Astro `dist/` directory with Wrangler.

Do not create separate undocumented production deployment paths.

Do not expose Cloudflare credentials in client code.

## 3. GitHub Pages Is Staging

Changes merged to `main` should be testable on GitHub Pages before the next production deploy.

Preserve staging/prod separation.

Do not make Cloudflare the default preview environment.

When changing deploy architecture, update:

```text
docs/DEPLOYMENT.md
docs/adr/
```

## 4. GitHub Is the Content Source of Truth

Routine content must live in structured repository content/data.

Examples:

```text
news
projects
activities
achievements
members
generations
sponsors
sponsorships
site/social metadata
```

Do not hard-code repeatable team content inside presentation components.

If adding a normal sponsor/member/article requires modifying an Astro/Vue component, reconsider the content model.

## 5. Content vs Data

Prefer Astro Content Collections for long-form content:

```text
news
projects
activities
achievements
```

Prefer typed structured data for:

```text
members
generations
sponsors
sponsorship relationships
site metadata
```

Use references rather than duplicating labels.

## 6. Validate Schemas

Use Astro/TypeScript/Zod schemas.

Invalid content must fail CI.

Do not silently accept malformed records.

## 7. Admin Contract

The future Admin is an editor for repository-backed content.

It does NOT directly edit Cloudflare production.

Flow:

```text
Admin
→ validated content change
→ GitHub branch/commit/PR
→ CI
→ main
→ GitHub Pages staging
→ scheduled/manual production deploy
```

Do not introduce a traditional application database unless explicit new requirements justify it.

## 8. Admin Security

Never embed:

```text
GitHub PAT
GitHub App private key
Cloudflare API token
```

in browser JavaScript or public environment variables.

Use:

```text
GitHub OAuth
or
GitHub App
```

with a secure server-side exchange layer if browser-based editing is enabled.

A thin Cloudflare Worker may be used for authentication/API mediation.

Keep that backend intentionally small.

## 9. Git Is Not Autosave

Do not create Git commits for every keystroke.

Admin editing uses local state.

A user action such as:

```text
Save
Submit for Review
Publish
```

should produce logical commits/workflow operations.

## 10. Inspect Before Editing

Before every non-trivial task:

1. inspect relevant Astro pages
2. inspect relevant components
3. inspect content/data schema
4. inspect relevant styles
5. inspect relevant deployment workflow if affected
6. identify existing patterns
7. state affected files

Reuse existing architecture.

Do not create parallel solutions because reading the current implementation is inconvenient.

## 11. Preserve URLs and SEO

During migration from the old static website:

- inventory all existing public URLs
- preserve them whenever possible
- add explicit redirects where necessary
- preserve title/description/Open Graph metadata
- preserve canonical behavior
- preserve sitemap/robots behavior

Do not silently break indexed URLs.

## 12. Migration Policy

Migration happens in stages.

Required order:

```text
1. Astro/TypeScript/Vue bootstrap
2. shared layout/components
3. current page parity
4. design system cleanup
5. structured content/data
6. CI
7. GitHub Pages staging
8. hero/homepage enhancement
9. controlled Cloudflare production workflow
10. Admin UI
```

Do not combine all stages into a single uncontrolled rewrite.

Keep current production available until staging passes acceptance checks.

## 13. Public-Site Design Identity

Preserve:

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

Do not copy another robotics team's visual identity.

Do not default to generic cyberpunk, neon, glassmorphism, or excessive glow effects.

## 14. Hero Contract

Homepage hero target:

```text
native <video>
desktop source
mobile source
poster fallback
autoplay muted loop playsinline
full viewport
scroll progress
reduced-motion support
```

Do not reintroduce YouTube iframe as the default hero background unless explicitly requested.

## 15. Astro/Vue Responsibility Boundary

Use Astro for:

```text
pages
layouts
SEO
content rendering
navigation
footer
cards
static sections
```

Use Vue for:

```text
Admin application
interactive viewers
complex client state
interactive filters
```

Do not hydrate a component simply because it was easier to write in Vue.

## 16. CSS Architecture

Target:

```text
src/styles/tokens.css
src/styles/global.css
src/styles/components/
src/styles/pages/
```

Avoid:

- inline styles
- arbitrary duplicated values
- `!important` without a documented reason
- vague class names
- giant unstructured stylesheets

Use meaningful design tokens.

## 17. Component Rules

Create components for stable reusable concepts.

Good:

```text
Navbar
Footer
SectionHeader
NewsCard
ProjectFeature
MemberCard
SponsorLogo
```

Avoid premature abstraction.

Avoid giant components.

Avoid duplicate components solving the same problem.

## 18. Dependency Policy

Expected core dependencies may include:

```text
Astro
Vue
TypeScript
schema validation
Wrangler
```

Do not add large dependencies for simple tasks.

Before adding a significant dependency, explain:

```text
problem solved
why native/current stack is insufficient
runtime/build cost
maintenance implications
```

## 19. GitHub Actions Contract

Maintain separate workflows:

```text
ci.yml
staging.yml
production.yml
```

CI should validate pull requests and `main`.

Staging deploys `main` to GitHub Pages.

Production runs only through scheduled/manual workflow.

Production must rerun checks before deploying.

Use GitHub Secrets for credentials.

Use an Actions environment named `production` where practical.

Use concurrency control to avoid simultaneous production deployments.

## 20. Production Safety

Before production deploy:

```text
npm ci
npm run check
npm run build
```

Deployment failure must leave the existing production deployment untouched.

Never push unvalidated source directly to Cloudflare.

## 21. Media Rules

Use descriptive, web-ready assets.

Good:

```text
hero-2026-desktop.mp4
hero-2026-mobile.mp4
project-huntclaw-main.webp
team-2026-group.webp
```

Bad:

```text
IMG_4829.jpg
final-final.mp4
test2.png
```

Do not commit editing masters.

Large media should be moved to R2 or another documented media origin if needed.

## 22. Accessibility

Preserve:

- keyboard navigation
- visible focus
- semantic headings
- meaningful alt text
- contrast
- reduced motion
- correct link/button semantics

## 23. Performance

Public pages should ship minimal client JavaScript.

Do not block readable content on hero video.

Lazy-load below-the-fold media.

Do not ship Admin code to normal public pages.

Prefer static rendering.

## 24. Testing

Minimum:

```text
Astro check
TypeScript/schema validation
production build
link/asset checks
```

Recommended later:

```text
Playwright smoke tests
```

## 25. Architecture Decisions

Major changes require ADRs under:

```text
docs/adr/
```

Major changes include:

```text
framework changes
content-model changes
authentication
CMS backend
deployment changes
major dependency/platform changes
```

## 26. Scope Discipline

For one requested feature:

- do not rewrite unrelated pages
- do not reformat the repository unnecessarily
- do not rename everything
- do not perform architecture migration silently
- make the smallest coherent change

If a larger refactor is required, state it explicitly.

## 27. Definition of Done

Before completion:

- [ ] `npm run check` passes
- [ ] build passes
- [ ] desktop checked
- [ ] mobile checked
- [ ] no new console errors
- [ ] no broken internal links
- [ ] no missing referenced assets
- [ ] no secrets exposed
- [ ] no duplicate source-of-truth data introduced
- [ ] accessibility basics preserved
- [ ] reduced motion considered
- [ ] staging verified when appropriate
- [ ] docs/ADR updated if architecture changed
- [ ] changed files summarized

## 28. Default Decision Order

When unsure:

1. protect source-of-truth consistency
2. preserve staging/production separation
3. preserve current URLs
4. preserve the current visual identity
5. prefer Astro/static output
6. prefer structured content
7. reuse existing components/tokens
8. prefer native browser APIs
9. use Vue only for meaningful client interaction
10. choose the simpler long-term maintenance path
11. document non-obvious decisions

The platform optimizes for:

> safe handoff, structured maintenance, predictable deployment, and low-decision routine editing.

## Appendix: Astro Dev Server (tooling note)

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Full documentation: https://docs.astro.build
