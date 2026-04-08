# Wall Calendar - TUF SUMMER INTERN TASK

A wall calendar made for TUF Summer intern task, designed and developed by Aditya Kumar Jha.
It was built from a customer’s perspective, with careful attention to the smallest details and features.

## Overview

This project explores a calendar-note experience than a standard date picker. It combines:

- range selection with clear in-between highlighting
- month-specific hero visuals and muted seasonal color themes
- holiday markers
- monthly notes, saved range notes, and single-date notes
- responsive behavior across desktop and mobile

## Calendar Legend

- Diamond marker: a saved range note exists for that date
- Black dot: a date-specific note is attached to that day
- Red dot: gazetted holiday
- Yellow dot: restricted holiday
- Purple dot: tentative holiday

## Demo

[View project demo on Google Drive](https://drive.google.com/file/d/1J5peC7tubXmVZ2biIONN59q_m8RxvYzv/view?usp=sharing)

## Project Structure

- `app/` - Next.js app router entrypoints and layout
- `components/` - UI components, including the modular `wall-calendar` feature components
- `lib/` - shared calendar types and utilities
- `public/images/months/` - month-specific hero images

## Key Choices

- The calendar UI is split into smaller feature components so the hero, grid, notes, overview, and modal can be maintained independently.
- Shared date logic and theme data live in `lib/types.ts` and `lib/utils.ts` to keep components focused on rendering.
- Month styling is data-driven, which makes it easy to swap images, colors, and hero copy without rewriting component logic.
- Notes are stored in `localStorage` by month to keep the experience lightweight and backend-free.
- The day grid supports both mouse and keyboard interaction for accessibility.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Copilot Agent

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Useful Commands

```bash
npm run build
npm run start
npx tsc --noEmit
```

## Notes

- Month images are stored in `public/images/months/`.
- If you see a hydration warning in development, check whether a browser extension is injecting DOM attributes before React hydrates.
