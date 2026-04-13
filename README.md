# AWS Master Notes — Interactive Learning App

A fully static learning app for mastering AWS from zero to senior architect level.

## Live App
https://maheshnd.github.io/aws-learn/

## Local Development
```bash
npm install
npm run build:content   # parse notes → JSON (run this first!)
npm run dev
```

## Deployment Workflow
The source notes in `content/aws_master_notes.md` stay local and are not pushed to GitHub.

Before pushing content updates:
```bash
npm run build:content
npm run build
```

Commit the generated files in `public/data/` along with your app changes, then push. GitHub Pages deploys from the committed JSON and does not rebuild from the private markdown source.

## Adding New Content
1. Edit `content/aws_master_notes.md` locally
2. Add new topic: `# 21 — ServiceName`
3. `npm run build:content`
4. Commit the updated `public/data/`
5. `git push` → GitHub Pages auto-deploys

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Zustand · Fuse.js

## Features
- 4 learning modes: Full Learn · Revision · Interview · Scenario
- Instant fuzzy search across all content
- 50+ interview Q&As with reveal button
- Visual diagrams for every topic
- Progress tracking in localStorage
- Keyboard shortcuts (press `?` to see all)
- Fully static — works offline after first load
