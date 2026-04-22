# Neutrino AI Ops Docs

Interactive documentation site for Neutrino AI Ops release material.

## Stack

- Next.js App Router
- TypeScript
- Framer Motion
- Lucide React
- Local Avenir fonts copied from the Neutrino frontend

## Routes

- `/docs/overview`
- `/docs/never-miss-an-alert-again`
- `/docs/rapid-root-cause-analysis`
- `/docs/stakeholder-communication`
- `/docs/platform-architecture`
- `/docs/integrations-and-workflow-execution`
- `/docs/governance-approvals-and-security`

## Local Development

```bash
npm install
npm run dev
```

## Production Verification

```bash
npm run typecheck
npm run build
```

## Structure

- `app/`: Next.js routes and global styles
- `components/`: docs shell, sidebar, TOC, and animated diagram components
- `data/docs.tsx`: content model for all documentation pages

## Notes

- The site is docs-first, not a landing page.
- Diagrams are implemented as React components so they can be refined without replacing image assets.
- The documentation intentionally presents workflow capability as Neutrino-native product functionality.
