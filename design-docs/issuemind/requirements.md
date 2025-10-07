# IssueMind - Component Requirements

## Project Overview

**IssueMind** is an AI-powered GitHub issue solver with a developer-friendly, dark mode centric interface. This document outlines all required shadcn/ui components organized by feature and page.

---

## Global Layout Components

### Top Navigation Bar
**Components Required:**
- `@shadcn/navigation-menu` - Main navigation structure
- `@shadcn/select` - Repository selector dropdown
- `@shadcn/input` - Global search field
- `@shadcn/button` - AI assistant trigger
- `@shadcn/dropdown-menu` - User account menu
- `@shadcn/avatar` - User profile picture

**Component Hierarchy:**
```
NavigationMenu
├── Logo
├── Select (repository selector)
├── Input (global search)
├── Button (AI assistant)
└── DropdownMenu
    ├── Avatar
    └── Menu items
```

---

### Sidebar Navigation
**Components Required:**
- `@aceternity/sidebar` - Main sidebar structure
- `@shadcn/button` - Navigation items
- `@shadcn/separator` - Section dividers

**Component Hierarchy:**
```
Sidebar
├── Navigation Items (Buttons)
│   ├── Dashboard
│   ├── Issues
│   ├── AI Tasks
│   └── Settings
└── Separator
```

---

### Toast Notifications
**Components Required:**
- `@shadcn/sonner` - Toast notification system

**Usage:**
- "AI fix generated"
- "Operation complete"
- Error messages

---

### Command Palette (⌘K)
**Components Required:**
- `@shadcn/command` - Command palette interface
- `@shadcn/dialog` - Modal wrapper for command palette

**Component Hierarchy:**
```
Dialog
└── Command
    ├── CommandInput
    ├── CommandList
    └── CommandItems
```

---

### Theme Toggle
**Components Required:**
- `@shadcn/switch` - Dark/light mode toggle

---

### Right-Side Drawer
**Components Required:**
- `@shadcn/drawer` - Contextual side panel
- `@aceternity/tabs` - Tab navigation within drawer

**Usage:**
- AI suggestions
- Diff previews
- Summaries
- Related data

---

## Page 1: `/login`

**Purpose:** Authentication page

**Components Required:**
- `@shadcn/card` - Login form container
- `@shadcn/form` - Form validation and submission
- `@shadcn/label` - Field labels
- `@shadcn/input` - Email and password fields
- `@shadcn/button` - Submit button and GitHub OAuth
- `@shadcn/alert` - Error message display
- `@shadcn/separator` - Divider between OAuth and form

**Component Hierarchy:**
```
Card
└── Form
    ├── Label + Input (email)
    ├── Label + Input (password)
    ├── Button (submit)
    ├── Separator
    ├── Button (GitHub OAuth)
    └── Alert (error messages)
```

---

## Page 2: `/dashboard`

**Purpose:** Overview of repositories and issue trends

**Components Required:**
- `@aceternity/3d-card` or `@aceternity/focus-cards` - Repository cards
- `@shadcn/card` - Metric containers
- `@shadcn/badge` - Issue counts, activity indicators
- `@shadcn/button` - Quick action buttons
- `@shadcn/skeleton` - Loading placeholders
- `@aceternity/timeline` - Issue trends visualization

**Component Hierarchy:**
```
Dashboard Layout
├── Header Section
│   └── Buttons (Quick Actions)
├── Repository Grid
│   └── FocusCards (repositories)
│       ├── Card Header (name)
│       ├── Badges (metrics)
│       └── Card Footer (actions)
├── Trends Section
│   └── Timeline (issue activity)
└── Skeleton (loading states)
```

---

## Page 3: `/repo/[name]/issues`

**Purpose:** Central workspace for viewing and managing issues

**Components Required:**
- `@aceternity/sidebar` - Filters sidebar
- `@shadcn/checkbox` - Multi-select filters
- `@shadcn/select` - Filter dropdowns (assignee, labels)
- `@shadcn/table` - Issues list table
- `@shadcn/badge` - Issue labels, AI tags, priority scores
- `@shadcn/input` - Search field
- `@shadcn/button` - Sort controls, bulk actions
- `@shadcn/drawer` - Right drawer for AI assist panel
- `@shadcn/scroll-area` - Scrollable content areas
- `@shadcn/separator` - Visual separation

**Component Hierarchy:**
```
Layout (3-column)
├── Sidebar (left - filters)
│   ├── Checkbox groups (labels, status)
│   ├── Select (assignee)
│   └── Badge (AI tags)
├── Main Panel
│   ├── Input (search)
│   ├── Button (sort, filter)
│   └── Table
│       ├── Row (issue item)
│       │   ├── Checkbox (select)
│       │   ├── Badge (labels, priority)
│       │   └── Button (actions)
│       └── ScrollArea
└── Drawer (right - AI panel)
    └── Card (insights)
```

---

## Page 4: `/repo/[name]/issues/[id]`

**Purpose:** Detailed issue view with AI insights

**Components Required:**
- `@shadcn/card` - Issue content container
- `@shadcn/badge` - Labels, metadata
- `@shadcn/avatar` - Author avatar
- `@shadcn/separator` - Content sections
- `@aceternity/timeline` - Comments and activity timeline
- `@aceternity/tabs` - Right column tabs (Suggestions, Fix Preview, Related Issues)
- `@shadcn/button` - Action bar buttons
- `@shadcn/dialog` - AI Fix Modal, Explain Modal
- `@shadcn/drawer` - Related Issues Drawer
- `@shadcn/scroll-area` - Scrollable content
- `@shadcn/textarea` - Comment input (if needed)

**Component Hierarchy:**
```
Layout (2-column with fixed action bar)
├── Main Content
│   ├── Card (issue header)
│   │   ├── Badge (labels)
│   │   ├── Avatar (author)
│   │   └── Metadata
│   ├── Separator
│   ├── ScrollArea (issue body - markdown)
│   ├── Separator
│   └── Timeline (comments/activity)
├── Right Column
│   └── Tabs
│       ├── Tab: Suggestions (Card with AI insights)
│       ├── Tab: Fix Preview (Code diff display)
│       └── Tab: Related Issues (List of cards)
└── Action Bar (fixed bottom)
    ├── Button (Explain Issue)
    ├── Button (Generate Fix)
    └── Button (Summarize Discussion)

Modals:
├── Dialog (AI Fix)
│   └── Code preview
└── Dialog (Explain)
    └── Card (markdown summary)

Drawer:
└── Drawer (Related Issues)
    └── ScrollArea
        └── Cards (issue list)
```

---

## Page 5: `/ai-tasks`

**Purpose:** Track asynchronous AI-generated tasks

**Components Required:**
- `@shadcn/table` - Task list
- `@shadcn/badge` - Status indicators (Pending, Completed, Failed)
- `@shadcn/button` - Filter and clear actions
- `@shadcn/skeleton` - Loading spinners
- `@shadcn/card` - Task result containers
- `@shadcn/scroll-area` - Scrollable list

**Component Hierarchy:**
```
Page Layout
├── Header
│   └── Button group (filters, clear)
└── Table
    ├── Row (task)
    │   ├── Task name
    │   ├── Badge (status)
    │   ├── Timestamp
    │   └── Button (view result)
    └── ScrollArea
```

---

## Page 6: `/settings`

**Purpose:** Configure preferences and integrations

**Components Required:**
- `@aceternity/tabs` - Settings category tabs
- `@shadcn/card` - Settings section containers
- `@shadcn/form` - Form handling
- `@shadcn/label` - Setting labels
- `@shadcn/switch` - Toggle settings
- `@shadcn/select` - Dropdown preferences
- `@shadcn/button` - Save/reset buttons
- `@shadcn/separator` - Section dividers
- `@shadcn/badge` - Feature status indicators

**Component Hierarchy:**
```
Tabs
├── Tab: General
│   └── Card
│       ├── Form
│       │   ├── Label + Switch (theme mode)
│       │   ├── Label + Select (layout density)
│       │   └── Label + Select (default repo view)
│       └── Button (save)
├── Tab: Integrations
│   └── Card
│       ├── Badge (connection status)
│       └── Button (link/unlink GitHub)
└── Tab: Experimental
    └── Card
        └── Form
            ├── Label + Switch (auto labeling)
            ├── Label + Switch (summary generation)
            └── Button (save)
```

---

## Complete Component List

### From @aceternity Registry:
1. `sidebar` - Main navigation sidebar
2. `tabs` - Tab navigation (settings, issue detail right panel)
3. `timeline` - Activity timeline and trends
4. `3d-card` or `focus-cards` - Repository showcase cards

### From @shadcn Registry:
1. `form` - Form validation and submission
2. `input` - Text input fields
3. `button` - Action buttons
4. `label` - Form labels
5. `card` - Content containers
6. `alert` - Error/warning messages
7. `table` - Data tables
8. `dialog` - Modal dialogs
9. `drawer` - Side drawers
10. `sonner` - Toast notifications
11. `command` - Command palette
12. `dropdown-menu` - Dropdown menus
13. `switch` - Toggle switches
14. `badge` - Status badges and labels
15. `skeleton` - Loading placeholders
16. `avatar` - User avatars
17. `separator` - Visual dividers
18. `select` - Dropdown selects
19. `checkbox` - Checkboxes
20. `scroll-area` - Scrollable containers
21. `navigation-menu` - Top navigation
22. `textarea` - Multi-line text input
23. `popover` - Popover menus (optional)

---

## Implementation Priority

### Phase 1 - Core Layout (High Priority):
- Navigation components (sidebar, navigation-menu)
- Card, Button, Badge
- Form, Input, Label
- Dialog, Drawer

### Phase 2 - Data Display (Medium Priority):
- Table
- Tabs
- Timeline
- Skeleton
- Avatar

### Phase 3 - Interactions (Medium Priority):
- Command palette
- Toast (sonner)
- Dropdown-menu
- Select, Checkbox, Switch

### Phase 4 - Enhancements (Low Priority):
- Scroll-area
- Separator
- Alert
- Textarea
- Specialty cards (3d-card, focus-cards)

---

## Notes

- All components should support dark mode as primary theme
- Focus on keyboard navigation for developer workflow
- Ensure proper loading states throughout
- Mock all API interactions at the frontend
- Prioritize @aceternity components for visual appeal where available
- Fall back to @shadcn components for standard functionality
