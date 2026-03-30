# Garden State of Corruption

Satirical React browser game where you play as Senator Bob Menendez trying to be as corrupt as possible without getting caught by the FBI.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (no tailwind.config.js — configured via CSS)
- No external state management, no animation libraries

## Game Design

- 20 rounds of corruption scenarios
- 3 hidden meters: FBI Suspicion, Foreign Interest, Cash
- 3 possible endings based on meter values at game end

## Rules

- All game scenarios live in `src/data/scenarios.ts` as a typed array
- SVG character art is built as React components, not external files
- Keep components under 200 lines — split into smaller components when needed
- Use CSS animations over JS animation libraries
- State management: React `useState` / `useReducer` only
- Mobile-first responsive design
- All colors use CSS custom properties defined in `index.css`
- Commit after each working feature with descriptive messages

## Style

- South Park-inspired SVG character art
- Dark UI theme
- Gold accent colors
