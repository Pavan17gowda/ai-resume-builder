# KodNest Premium Build System - Project 3: AI Resume Builder

A premium build tracking system for the AI Resume Builder project with 8-step gated progression.

## Features

- 8-step build track with gating system
- Premium layout with top bar, context header, workspace, and build panel
- Artifact upload system - next step unlocks only after artifact upload
- Proof page with step status and final submission
- Local storage persistence

## Routes

- `/rb/01-problem` - Problem Definition
- `/rb/02-market` - Market Research
- `/rb/03-architecture` - Architecture Design
- `/rb/04-hld` - High-Level Design
- `/rb/05-lld` - Low-Level Design
- `/rb/06-build` - Build Implementation
- `/rb/07-test` - Testing & QA
- `/rb/08-ship` - Ship & Deploy
- `/rb/proof` - Proof of Completion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## How It Works

1. Start at Step 1 (Problem Definition)
2. Read instructions in the main workspace
3. Copy instructions to Lovable using the build panel
4. Upload your artifact (document, screenshot, etc.)
5. Mark as "It Worked" to unlock the next step
6. Complete all 8 steps
7. Visit `/rb/proof` to submit final links

## Gating System

- Step 1 is always accessible
- Steps 2-8 require the previous step's artifact to be uploaded
- Next button is disabled until current step is completed
- All progress is saved in localStorage

## Tech Stack

- React 18
- TypeScript
- React Router 6
- Vite
- CSS Modules
