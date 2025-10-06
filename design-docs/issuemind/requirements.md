## Feature: IssueMind

## Components Required:

- form (validation and submission)
- input (email, password, search fields)
- button (primary, secondary, icon)
- label (field labels)
- card (containers and sections)
- alert (error and info display)
- command (command palette / ⌘K)
- switch (toggles)
- sheet (right-side contextual drawer)
- drawer (mobile/alternative drawer)
- sidebar (primary navigation)
- menubar or navigation-menu (top navbar)
- resizable (layout panes)
- table (issue lists, task lists)
- tabs (detail page right column)
- dropdown-menu (row actions, menus)
- badge (status, labels)
- separator (section dividers)
- skeleton (loading states)
- dialog and alert-dialog (AI outputs, confirmations)
- accordion (AI suggestion sections)
- progress (operation progress)
- select (filters, settings)
- tooltip (affordances)
- textarea (comments, descriptions)
- checkbox (filters, settings)
- radio-group (filter modes)
- scroll-area (long content)
- avatar (user menu)
- pagination (issue list)
- toast (notifications)

## Component Hierarchy:

Layout
├── Top Navbar (menubar or navigation-menu)
│ ├── Repo picker (select)
│ ├── Search (input)
│ ├── AI assistant trigger (button)
│ └── User menu (avatar, dropdown-menu)
├── Sidebar (sidebar)
│ └── Navigation items (badge for counts)
└── Main Outlet (per-route content)

    /login
    └── Card (card)
        └── Form (form)
            ├── Label + Input (email)
            ├── Label + Input (password)
            ├── Button (Sign in with GitHub)
            └── Alert (mock indicator / errors)

    /dashboard
    ├── Card Grid (card, skeleton, badge)
    ├── AI Summary Section (card, skeleton, progress)
    └── Quick Actions (button, dropdown-menu)

    /repo/[name]/issues
    ├── Filters Sidebar (card, form)
    │   ├── Select (labels, assignee)
    │   ├── Checkbox/Switch (open/closed, AI tags)
    │   └── Separator
    ├── Main List (table)
    │   ├── Search bar (input)
    │   ├── Row Actions (dropdown-menu, button)
    │   └── Pagination (pagination)
    └── Right Drawer: AI Assist (sheet or drawer)
        ├── Summary (alert, accordion)
        └── Progress indicators (progress)

    /repo/[name]/issues/[id]
    ├── Issue Description (markdown render – custom)
    ├── Comments (scroll-area, separator)
    ├── Right Column (tabs)
    │   ├── Suggestions (accordion, alert)
    │   ├── Fix Diff View (code viewer – custom)
    │   └── Related Issues (list, badge)
    └── Bottom Action Bar
        ├── Buttons (explain, generate fix, summarize)
        ├── Dialogs (dialog, alert-dialog) for AI outputs
        └── Progress / Alerts (progress, alert)

    /ai-tasks
    ├── Tasks Table (table)
    ├── Status (badge, progress)
    └── Row Actions (dropdown-menu)

    /settings
    ├── Tabs (tabs)
    ├── General (form, switch, select)
    ├── Integrations (card, button)
    └── Experimental (switch)

Global
├── Theme toggle (switch)
├── Toasts (toast) for notifications
├── Command Palette (command)
└── Right-side Drawer usage across pages (sheet/drawer)
