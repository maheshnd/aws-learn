# AWS Master Notes — Interactive Learning App

A fully static learning app for mastering AWS from zero to senior architect level.

## Live App
https://github.com/maheshnd.github.io/aws-learn

## Local Development
```bash
npm install
npm run build:content   # parse notes → JSON (run this first!)
npm run dev
```

## Adding New Content
1. Edit `content/aws_master_notes.md`
2. Add new topic: `# 21 — ServiceName`
3. `npm run build:content`
4. `npm run build`
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
