# AIntropy Kurious — UI Prototype

A high-fidelity prototype of the redesigned Kurious search experience.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Building for GitHub Pages

```bash
npm run build
```

Outputs to `dist/` — deploy this folder to GitHub Pages.

## What's in the prototype

### All 4 States
| State | Description |
|---|---|
| **1 — Idle** | Personalized greeting, suggested questions, modality hint |
| **2 — Typing** | Greeting scrolls away, "You might also ask" suggestions appear |
| **3 — Thinking** | Live step-by-step trace animation |
| **4 — Answer** | Stacked conversation with answer cards |

### Key Features
- **First Visit vs Returning** toggle (top right) — shows both greeting experiences
- **Quick ⚡ vs Think Deeper 🔍** mode toggle — different placeholder text and thinking animations
- **View Sources** — expandable panel grouped by Primary / Supporting / Additional, each with "Used for:" labels
- **Feedback system** — 👍 path shows positive tags, 👎 path shows specific options
- **Smart suggestion cards** — never repeat asked questions, always relevant to latest answer
- **Stacked conversation** — full session history, new cards fade in/out

### Brand
- Colors: `#0D0D0D` bg · `#00D4FF` cyan · `#1A1A1A` cards
- Font: Inter
- Dark mode only

## Swapping mock data

Edit `src/data/mockData.js` to change questions, answers, and sources.
To connect to a real API, replace `getAnswerForQuestion()` with an async fetch call.
