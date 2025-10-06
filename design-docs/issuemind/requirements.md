## Feature: IssueMind Frontend (per plans/app-plan.md)

## Components Required

- form (validation and submission)
- input (text, email, password)
- textarea (multiline input)
- select (filters, settings)
- checkbox (bulk actions, filters)
- radio-group (options)
- switch (toggles)
- button (primary, secondary, destructive)
- label (field labels)
- card (containers, panels)
- alert (inline errors)
- alert-dialog (confirmations)
- dialog (AI fix modal)
- sheet (right-side drawer/assist panel)
- tabs (issue detail right column)
- table (issues list, ai-tasks list)
- pagination (issues list controls)
- progress (task progression)
- skeleton (loading placeholders)
- command (command palette ⌘K)
- dropdown-menu (user/account/actions)
- navigation-menu (top navigation)
- avatar (user avatar)
- badge (status/labels)
- scroll-area (long content)
- separator (section dividers)

## Component Hierarchy

Global Layout
├── Top Navigation
│ ├── navigation-menu
│ ├── dropdown-menu (account)
│ ├── command (⌘K)
│ └── avatar
├── Sidebar
│ └── navigation links
├── Toast
└── Right-Side Drawer
└── sheet (Assist Panel)

/login
└── card
└── form
├── label + input (email)
├── label + input (password)
└── button (submit)

/dashboard
├── card (metrics)
├── skeleton (loading)
└── table (repos overview)

/repo/[name]/issues
├── Sidebar Filters
│ ├── select (labels, assignees)
│ ├── checkbox (states)
│ └── switch (AI tags)
├── Main Panel
│ ├── table (issues)
│ ├── badge (status)
│ ├── pagination
│ └── dropdown-menu (row actions)
└── Right Drawer
└── sheet (AI summary)

/repo/[name]/issues/[id]
├── Main Content
│ ├── card
│ ├── scroll-area (markdown body)
│ └── separator
├── Right Column
│ └── tabs
│ ├── Suggestions
│ ├── Fix Preview
│ └── Related Issues
└── Action Bar (fixed bottom)
├── button: Explain Issue
├── button: Generate Fix
└── button: Summarize Discussion

Modals & Drawers
├── dialog (AI Fix Modal)
└── sheet (Related Issues Drawer)

/ai-tasks
├── table (tasks)
├── badge (status)
└── progress (in-progress tasks)

/settings
├── tabs (General, Integrations, Experimental)
├── switch (toggles)
├── select (preferences)
└── checkbox (options)

## Notes

- Use typesafe forms and props throughout; prefer explicit TypeScript types.
- All data interactions are mocked; show realistic loading via skeleton.
- Ensure accessibility: proper labels, roles, keyboard nav for command/dialog/sheet.
