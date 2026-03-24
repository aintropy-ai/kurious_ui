# AIntropy Kurious — Design & Prototype Context

This file captures all design decisions made so that the conversation can be resumed at any point.

---

## About the Product

**AIntropy** — "The Hippocampus of Private AI"
- Universal Knowledge Perception Platform
- Multimodal retrieval: text, video, images, data, structured formats
- Key engine: **Kurious** — cross-modal search at 100M+ docs, sub-0.2s latency
- Zero fine-tuning required
- Founders: Kunal Sawarkar (CEO), Nirmit Desai (CTO)
- Website: aintropy.ai
- Demo: aintropy.ai/nj_demo (NJ Open Data — 57M docs, 23 agencies)

---

## Design Brief

**Role:** Product Manager redesigning the Kurious UI from scratch
**Goal:** Clean, transparent, trustworthy — better than Perplexity/ChatGPT/Grok for results display, but completely AIntropy's own identity
**Stack:** React + Tailwind CSS
**Prototype user name:** Kunal

---

## Brand System

| Element | Value |
|---|---|
| Background | `#0D0D0D` |
| Navbar | `#111111` |
| Card backgrounds | `#1A1A1A` |
| Card borders | `#2A2A2A` |
| Primary cyan | `#00D4FF` |
| Secondary teal | `#0891B2` |
| Headings | `#FFFFFF` |
| Body/subtext | `#A0A0A0` |
| Error/negative | `#EF4444` |
| CTA button | White bg + black text |
| Font | Inter (Google Fonts) |
| Style | Dark mode only, cyan glows on interactive elements |

---

## Design Philosophy

- **Not** a copy of ChatGPT / Perplexity / Grok
- Results should be clean and clear like those products but visually unique
- Core concept: **"The Intelligence Brief"** — structured, sourced, confident answers
- Kurious speaks in **first person** ("I reviewed..." not "Kurious reviewed...")
- **Progressive disclosure** — minimal by default, depth on demand
- **Trust through transparency** — always show how the answer was found

---

## State 1 — Idle (LOCKED)

### Greetings
- **First visit:** `Welcome to Kurious, Kunal.` / `Your AI-powered knowledge engine — what do you want to explore?`
- **Returning:** `Welcome back, Kunal.` / `Kurious is ready — what do you want to know today?`

### Layout
- **First visit:** Greeting → search bar → modality line → 2 suggestion cards ("Try asking:")
- **Returning:** Greeting → search bar → modality line → 2 suggestion cards ("Try asking:")

### Other elements
- Search bar placeholder: `Ask anything...`
- Modality line (subtle, below search bar): `Ask about anything — videos, documents, data, images and more.`
- No modality icons — single line replaces them
- 2 suggestion cards, AI-generated, clickable to auto-fill and submit

---

## State 2 — Typing (LOCKED)

- Greeting smoothly scrolls upward and out of view (~0.3s)
- "Try asking" cards fade out
- Search bar stays as visual anchor
- `You might also ask:` fades in with 3 suggestions (update as user types)
- Suggestion position mirrors State 1: above bar (first visit), below bar (returning)
- Arrow button: grey + inactive when empty → teal + active when text entered (Claude-style)
- Modality line stays visible

---

## State 3 — Thinking (LOCKED)

- Header: `Searching your knowledge base...`
- Live step trace:
  - ✓ Understood your question
  - ✓ Searching across 57M documents
  - ✓ Scanning videos, data & documents
  - ⟳ Connecting insights... (pulses until done)
- No spinner — steps build trust and transparency
- Suggestions and modality line disappear
- Search bar stays, shows submitted query (locked)

---

## State 3.1 — Quick vs Think Deeper (LOCKED)

- Toggle below search bar: `⚡ Quick · 🔍 Think Deeper`
- ⚡ Quick is default (teal), Think Deeper is grey until selected
- Placeholder explains the mode in first person (disappears when typing):
  - ⚡ Quick: `Go ahead — I answer at the speed of thought.`
  - 🔍 Think Deeper: `Ask the tough ones — I dig deeper so you don't have to.`
- No mention of tokens — backend only
- Thinking animation differs:
  - ⚡ Quick: 4 steps
  - 🔍 Think Deeper: 6 steps + `avg. under 10 seconds` indicator
- Answer card shows mode used: `⚡ Quick` or `🔍 Think Deeper` (top right)

---

## State 4 — Answer State (LOCKED)

- Search bar moves to top, stays persistent
- Stacked conversation — each Q&A stacks below previous, scrollable
- Each answer block: question label + mode tag → answer → provenance strip → feedback
- `You might also ask:` cards ONLY below latest answer
- Cards are smart:
  - Relevant to latest question + answer
  - Never repeat already-asked questions
  - Only ONE set visible at a time — old cards vanish, new ones fade in

---

## Answer Card (LOCKED)

```
┌──────────────────────────────────────────────────────────┐
│  ANSWER                                      ⚡ Quick    │
│  Bergen County leads with 12,400 employees...            │
├──────────────────────────────────────────────────────────┤
│  🎥 ×2   📄 ×3   📊 ×1   ·   0.18s                      │
│  I reviewed video, documents & data    ▸ View Sources    │
├──────────────────────────────────────────────────────────┤
│  Was this helpful?   👍   👎                             │
└──────────────────────────────────────────────────────────┘
```

---

## Provenance Strip (LOCKED)

- Line 1: Modality icons with counts (`🎥 ×2  📄 ×3  📊 ×1`) + retrieval time (`· 0.18s`)
  - No total file count — redundant with icons
- Line 2: `I reviewed video, documents & data`
- Toggle: `▸ View Sources` → expands → flips to `▾ Hide Sources`

---

## View Sources Panel (LOCKED)

- Grouped: **PRIMARY SOURCES** / **SUPPORTING** / **ADDITIONAL**
- Each file: icon + name + `Used for: [contribution]` + `↗` link
- No relevance percentages — too confusing
- Files ordered by contribution (most important first)
- `↗` always opens in new tab at exact location:
  - 📄 PDF → scrolled to highlighted passage
  - 📊 Table → exact row/column highlighted
  - 🎥 Video → starts at exact timestamp
  - 🖼️ Image → bounding box on relevant region
  - 🧬 Structured data → exact field highlighted

---

## Feedback System (LOCKED)

- Default: `Was this helpful?  👍  👎`
- **👍 path:** `Glad it helped! What worked well?` + one-click tags: `[Accurate] [Fast] [Great sources] [Easy to read]` + `Skip →`
  - After tag: auto-closes with `✓ Thanks — this helps me get smarter.`
- **👎 path:** panel slides open with:
  - Radio options:
    - The answer didn't address my question
    - The sources don't seem relevant
    - The answer is incomplete
    - The answer seems incorrect
    - I couldn't understand the answer
  - Optional open text: `Anything to add?`
  - `[Submit]` button + `✕` to dismiss
  - After submit: `✓ Thanks — this helps me get smarter.`
- No separate "Give feedback" link — thumbs ARE the trigger

---

## Prototype File Structure

```
kurious-prototype/
├── CLAUDE.md                  ← this file
├── README.md                  ← setup instructions for engineering team
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── App.jsx                ← main state machine + all screens
    ├── main.jsx
    ├── index.css
    ├── data/
    │   └── mockData.js        ← all mock Q&As, sources, suggestions
    └── components/
        ├── ThinkingState.jsx  ← animated step trace
        ├── AnswerBlock.jsx    ← answer card
        ├── SourcesPanel.jsx   ← expandable sources
        ├── FeedbackBar.jsx    ← thumbs + feedback flow
        └── SuggestionCards.jsx← follow-up question cards
```

---

## Running the Prototype

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Building for GitHub Pages

```bash
npm run build
# deploy dist/ folder to GitHub Pages
```

---

## Navigation & Structure (LOCKED)

### Top Nav
`[A] AIntropy · Kurious`  →  `My Chats`  `Projects`  →  `(for demo only) First Visit / Returning`  →  `Organization's Name.INC`  →  `[K] profile`

### My Chats view
- Left sidebar: + New Chat · chat history grouped Today / Yesterday / Last 7 Days
- Each chat: ⋯ → Rename · Delete (confirm prompt)
- Center: returning user idle screen → conversation on chat select

### Projects view
- Left sidebar: + New Project · Your Projects list
- Each project: ⋯ → Rename · Manage Members · Delete Project (confirm prompt)
- Clicking a project expands its chats in the sidebar
- Center: project header (name, members, last active) → idle screen scoped to project

### Roles & Permissions (LOCKED)
| Permission | Viewer | Contributor | Admin |
|---|---|---|---|
| View chats | ✓ | ✓ | ✓ |
| Search / create chats | ✗ | ✓ | ✓ |
| Add / remove members | ✗ | ✗ | ✓ |
| Delete chats/project | ✗ | ✗ | ✓ |

- Project owner = Admin by default; can assign Admin to others; multiple Admins allowed
- On deletion: member loses access immediately + receives notification

### Profile Dropdown (LOCKED)
- Top: name, email, org name
- Account Settings · Help & Support
- Sign out (red, divider above)

## Pending — Changes & Additions

*(to be discussed and added here as decisions are made)*

---

## What's NOT Built Yet

- Overall shell / navigation (sidebar, top nav beyond prototype)
- Vibe-Discovery Studio (pipeline builder)
- Knowledge Explorer
- Analytics Dashboard
- Mobile / responsive design
- Real API connection (currently static mock data)
- Onboarding flow beyond first visit greeting
