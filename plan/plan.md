🧩 Concept Overview

App Name (placeholder): IssueMind

Purpose: Help developers triage, prioritize, and solve GitHub issues faster with AI-generated suggestions.

Frontend stack: Next.js + ShadCN/UI + mock API layer

Design vibe: Developer / dark mode friendly / clear hierarchy

---

🧱 Core UX Flow

Think of it as an app where a user:

1. Logs in with GitHub or a demo account

2. Selects a repository

3. Views issues (list + AI insights)

4. Opens an issue to see suggestions, possible fixes, code diffs, and related issues

5. Optionally runs AI actions: explain, summarize, draft PR, etc.

6. Reviews AI outputs via modals or drawers

---

🔖 Global Layout Components (Shared)

These apply across all pages:

Component Description
Top Navbar Logo, repo picker dropdown, search bar, AI assistant trigger (button), user menu
Sidebar Navigation items: Dashboard, Issues, AI Tasks, Settings
Toast / Snackbar For notifications (e.g., “AI fix generated”, “mock API call complete”)
Command Palette (⌘K) Quick actions: search issues, jump to repo, trigger AI
Theme toggle Light/dark switch using ShadCN’s mode toggle
Right-side Drawer Contextual for "AI suggestions", "Diff preview", or "Auto summaries"

---

🗂️ Page Structure

1. /login

- UI Purpose: Authentication entry point (mocked GitHub OAuth)

- Components:

  - ShadCN Card containing login form

  - “Sign in with GitHub” button

  - Mock indicator (since backend is fake)

- Flow: On login, redirects → /dashboard

---

2. /dashboard

- Purpose: Overview of connected repos and summary of open issues

- Main Components:

  - Repository list (CardGrid, clickable)

  - AI summary section (“This week’s issue trends”)

  - Quick actions (“Auto-prioritize issues”, “Summarize repo”)

- AI Behavior (mocked):

  - Animated placeholder for “AI insights loading”

  - Mocked AI summary blocks

---

3. /repo/[name]/issues

- Purpose: Main workspace for triaging issues

- Layout:

  - Sidebar: Filters (labels, assignee, open/closed, AI tags like “bug”, “needs reproduction”)

  - Main Area:

    - Table/List of issues (title, status, last activity, AI urgency/priority)

    - Search bar

    - Sort options

  - Right Drawer: “AI Assist” — summary of all open issues or bulk suggestions

- Interactions:

  - Clicking issue opens /issues/[id]

  - Selecting multiple issues → "Bulk AI actions" (suggest fixes, cluster issues)

---

4. /repo/[name]/issues/[id]

- Purpose: Issue detail page — AI-enhanced reading and fix suggestion

- Layout:

  - Issue description (with markdown render)

  - Comments / activity feed

  - Right column tabs:

    - “Suggestions” (AI recommendations)

    - “Fix diff view” (mock code block diff)

    - “Dependencies or related issues”

  - Fixed bottom action bar: “Explain code”, “Generate fix”, “Summarize thread”

- Modals:

  - “AI Generated Fix” (diff preview modal)

  - “Explain this Issue” (shows summarized markdown)

  - “Related Issues” drawer

---

5. /ai-tasks

- Purpose: Shows current and past AI operations

- Components:

  - Table: Task name, status (pending, done, failed), timestamp

  - Filter and delete task buttons

- Mock behavior:

  - Spinners for tasks marked "in-progress"

  - Placeholder completions ("AI fix ready")

---

6. /settings

- Purpose: Mock integration and UI preferences

- Tabs:

  - General (theme, layout)

  - Integrations (GitHub connection mock)

  - Experimental features (AI auto-label toggle)

- Component ideas:
  - Switch, Tabs, Card, Button, Select (ShadCN variants)

---

🧮 Interaction Flow Summary

    Login → Dashboard → Repo selection → Issues page → Issue detail → AI assist modal/drawer
                                                            ↓
                                                      AI Tasks overview

All core user actions branch naturally from “Repo > Issues”.

---

🎨 Component-Level Mock Plan

The goal is to hand this spec to agents who’ll implement UIs using ShadCN components.

Area Component Type Example ShadCN UI Components
Layout ResizablePanel, Sidebar, Menubar, Navbar, Drawer Layout scaffold
Dashboard Cards Card, Skeleton, Badge Repo summaries
Issue List Table, Badge, DropdownMenu, Button, Separator Issue triage
Issue Detail Tabs, ScrollArea, Markdown Display, CodeBlock Viewer
AI Modals Dialog, Accordion, Progress, Alert AI interactions
Forms Form, Input, Switch, Select Settings & filters
Feedback Toast, Tooltip, Command System feedback

---
