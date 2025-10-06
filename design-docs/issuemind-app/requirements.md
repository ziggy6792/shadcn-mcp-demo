# IssueMind App - Component Requirements

## App Overview
**IssueMind** - AI-powered GitHub issue triage and management tool
- **Stack**: Next.js + ShadCN/UI + mock API layer
- **Design**: Developer-friendly, dark mode, clear hierarchy

---

## Global Layout Components

### Top Navbar
**Purpose**: Main navigation bar with repo selection, search, and user actions

**Components Required**:
- `menubar` - Main navigation structure
- `select` or `dropdown-menu` - Repo picker dropdown
- `input` - Search bar
- `button` - AI assistant trigger
- `avatar` - User menu/profile
- `popover` or `dropdown-menu` - User dropdown menu

**Component Hierarchy**:
```
Menubar
├── Logo
├── Select/DropdownMenu (repo picker)
├── Input (search)
├── Button (AI assistant)
└── DropdownMenu
    └── Avatar (user menu)
```

---

### Sidebar Navigation
**Purpose**: Main app navigation

**Components Required**:
- `sidebar` - Main sidebar component
- `button` - Navigation items
- `badge` - Notification badges

**Component Hierarchy**:
```
Sidebar
├── SidebarHeader
├── SidebarContent
│   ├── SidebarGroup (Dashboard)
│   ├── SidebarGroup (Issues)
│   ├── SidebarGroup (AI Tasks)
│   └── SidebarGroup (Settings)
└── SidebarFooter
```

---

### Toast Notifications
**Purpose**: System notifications and feedback

**Components Required**:
- `sonner` - Toast notifications (preferred over toast for better UX)

---

### Command Palette
**Purpose**: Quick actions (⌘K)

**Components Required**:
- `command` - Command palette interface
- `dialog` or command-dialog pattern - Modal wrapper

**Component Hierarchy**:
```
Dialog
└── Command
    ├── CommandInput
    ├── CommandList
    │   ├── CommandGroup (Search issues)
    │   ├── CommandGroup (Jump to repo)
    │   └── CommandGroup (Trigger AI)
    └── CommandSeparator
```

---

### Theme Toggle
**Purpose**: Light/dark mode switch

**Components Required**:
- `switch` or `dropdown-menu` - Theme toggle control

---

### Right-side Drawer
**Purpose**: Contextual AI suggestions and previews

**Components Required**:
- `drawer` or `resizable` - Side panel
- `tabs` - Different drawer sections
- `scroll-area` - Scrollable content

**Component Hierarchy**:
```
Drawer/Resizable
└── Tabs
    ├── TabsList
    └── TabsContent
        └── ScrollArea
```

---

## Page 1: /login

**Purpose**: Authentication entry point (mocked GitHub OAuth)

**Components Required**:
- `card` - Login form container
- `form` - Form validation
- `input` - Email/username field
- `label` - Field labels
- `button` - "Sign in with GitHub" button
- `alert` - Mock indicator/error messages

**Component Hierarchy**:
```
Card
└── Form
    ├── Label + Input (username/email)
    ├── Label + Input (password - optional for demo)
    ├── Button (Sign in with GitHub)
    └── Alert (mock indicator)
```

---

## Page 2: /dashboard

**Purpose**: Overview of repos and issue trends

**Components Required**:
- `card` - Repository cards and AI summary sections
- `button` - Quick action buttons
- `skeleton` - Loading placeholders for AI insights
- `badge` - Status indicators
- `separator` - Visual dividers

**Component Hierarchy**:
```
Layout
├── Section: Repository List
│   └── Grid of Cards (clickable repos)
│       ├── CardHeader (repo name)
│       ├── CardContent (stats)
│       └── Badge (status)
│
├── Separator
│
├── Section: AI Summary
│   └── Card
│       ├── CardHeader ("This week's issue trends")
│       └── CardContent
│           └── Skeleton (loading state)
│
└── Section: Quick Actions
    ├── Button ("Auto-prioritize issues")
    └── Button ("Summarize repo")
```

---

## Page 3: /repo/[name]/issues

**Purpose**: Main workspace for triaging issues

**Components Required**:
- `resizable` - Layout with sidebar and main area
- `checkbox` - Filter selections
- `select` or `dropdown-menu` - Filter dropdowns (labels, assignee)
- `table` - Issue list
- `badge` - Status, priority, AI tags
- `input` - Search bar
- `dropdown-menu` - Sort options
- `button` - Action buttons
- `drawer` - Right drawer for AI Assist
- `separator` - Visual dividers

**Component Hierarchy**:
```
ResizablePanel
├── ResizablePanel (Filters Sidebar)
│   ├── Input (search)
│   ├── Select (labels filter)
│   ├── Select (assignee filter)
│   ├── Checkbox (open/closed)
│   └── Checkbox group (AI tags)
│
├── ResizableHandle
│
├── ResizablePanel (Main Area)
│   ├── Toolbar
│   │   ├── Input (search)
│   │   └── DropdownMenu (sort options)
│   └── Table
│       ├── TableHeader
│       └── TableBody
│           └── TableRow
│               ├── TableCell (title)
│               ├── TableCell (Badge - status)
│               ├── TableCell (Badge - priority)
│               └── TableCell (last activity)
│
├── ResizableHandle
│
└── Drawer (AI Assist)
    ├── DrawerHeader ("AI Assist")
    └── DrawerContent
        └── ScrollArea (suggestions)
```

---

## Page 4: /repo/[name]/issues/[id]

**Purpose**: Issue detail page with AI enhancements

**Components Required**:
- `card` - Issue description container
- `scroll-area` - Scrollable content areas
- `tabs` - Right column navigation (Suggestions, Fix diff, Dependencies)
- `badge` - Labels and status
- `separator` - Visual dividers
- `button` - Action buttons
- `dialog` - AI modals ("AI Generated Fix", "Explain this Issue")
- `drawer` - "Related Issues" drawer
- `accordion` - Collapsible sections
- `alert` - Important notices
- `avatar` - User avatars in comments

**Component Hierarchy**:
```
Layout
├── Main Content Area
│   ├── Card (Issue Header)
│   │   ├── CardHeader
│   │   │   ├── Title
│   │   │   └── Badge group (labels)
│   │   └── CardContent
│   │       └── ScrollArea (markdown description)
│   │
│   └── Card (Comments/Activity)
│       └── ScrollArea
│           └── Comment items
│               ├── Avatar
│               └── Content
│
├── Right Column
│   └── Tabs
│       ├── TabsList
│       │   ├── Tab (Suggestions)
│       │   ├── Tab (Fix diff)
│       │   └── Tab (Dependencies)
│       └── TabsContent
│           └── ScrollArea
│
└── Fixed Bottom Action Bar
    ├── Button ("Explain code")
    ├── Button ("Generate fix")
    └── Button ("Summarize thread")

Modals/Drawers:
├── Dialog (AI Generated Fix)
│   ├── DialogHeader
│   └── DialogContent
│       └── Code block with diff
│
├── Dialog (Explain this Issue)
│   ├── DialogHeader
│   └── DialogContent
│       └── Markdown summary
│
└── Drawer (Related Issues)
    ├── DrawerHeader
    └── DrawerContent
        └── List of related issue cards
```

---

## Page 5: /ai-tasks

**Purpose**: Track AI operations

**Components Required**:
- `table` - Task list
- `badge` - Status indicators (pending, done, failed)
- `button` - Filter and delete actions
- `progress` - Progress indicators for in-progress tasks
- `dropdown-menu` - Filter options
- `alert-dialog` - Delete confirmation

**Component Hierarchy**:
```
Layout
├── Toolbar
│   ├── DropdownMenu (filter by status)
│   └── Button (Clear completed)
│
└── Table
    ├── TableHeader
    │   ├── Task name
    │   ├── Status
    │   ├── Timestamp
    │   └── Actions
    └── TableBody
        └── TableRow
            ├── TableCell (name)
            ├── TableCell
            │   └── Badge or Progress (status)
            ├── TableCell (timestamp)
            └── TableCell
                └── Button (delete)

AlertDialog (Delete Confirmation)
├── AlertDialogHeader
├── AlertDialogDescription
└── AlertDialogFooter
    ├── Button (Cancel)
    └── Button (Confirm)
```

---

## Page 6: /settings

**Purpose**: App preferences and integrations

**Components Required**:
- `tabs` - Settings navigation
- `card` - Section containers
- `switch` - Toggle settings
- `select` - Dropdown selections
- `button` - Action buttons
- `label` - Setting labels
- `separator` - Section dividers
- `form` - Form validation if needed

**Component Hierarchy**:
```
Tabs (Settings Navigation)
├── TabsList
│   ├── Tab (General)
│   ├── Tab (Integrations)
│   └── Tab (Experimental)
│
└── TabsContent
    ├── Tab Panel: General
    │   ├── Card
    │   │   ├── CardHeader ("Theme")
    │   │   └── CardContent
    │   │       ├── Label
    │   │       └── Select (theme options)
    │   └── Card
    │       ├── CardHeader ("Layout")
    │       └── CardContent
    │           ├── Label
    │           └── Switch (compact mode)
    │
    ├── Tab Panel: Integrations
    │   └── Card
    │       ├── CardHeader ("GitHub Connection")
    │       ├── CardContent
    │       │   └── Alert (connection status)
    │       └── CardFooter
    │           └── Button (Reconnect)
    │
    └── Tab Panel: Experimental
        └── Card
            ├── CardHeader ("Experimental Features")
            └── CardContent
                ├── Label + Switch (AI auto-label)
                ├── Separator
                └── Label + Switch (AI suggestions)
```

---

## Summary: All Components Needed

### Core UI Components (from @shadcn registry):
1. `accordion` - Collapsible sections
2. `alert` - Notifications and warnings
3. `alert-dialog` - Confirmation dialogs
4. `avatar` - User avatars
5. `badge` - Status indicators
6. `button` - Actions
7. `card` - Content containers
8. `checkbox` - Selections
9. `command` - Command palette
10. `dialog` - Modal dialogs
11. `drawer` - Side panels
12. `dropdown-menu` - Dropdown menus
13. `form` - Form validation
14. `input` - Text inputs
15. `label` - Form labels
16. `menubar` - Navigation bar
17. `popover` - Popover menus
18. `progress` - Progress indicators
19. `resizable` - Resizable panels
20. `scroll-area` - Scrollable areas
21. `select` - Select dropdowns
22. `separator` - Visual dividers
23. `sidebar` - Main sidebar
24. `skeleton` - Loading placeholders
25. `sonner` - Toast notifications
26. `switch` - Toggle switches
27. `table` - Data tables
28. `tabs` - Tabbed navigation
29. `textarea` - Multi-line text input
30. `tooltip` - Helpful tooltips

### Additional Considerations:
- **Breadcrumb** - Optional for nested navigation
- **Code blocks** - For displaying diffs (may need custom component or library like `react-syntax-highlighter`)
- **Markdown renderer** - For issue descriptions (e.g., `react-markdown`)

---

## Next Steps

1. Install all required components using shadcn CLI
2. Set up Next.js app structure with routes
3. Create mock API layer for GitHub data
4. Implement global layout (navbar, sidebar, theme provider)
5. Build pages in order: login → dashboard → issues → issue detail → ai-tasks → settings
6. Add AI interaction patterns (modals, drawers, loading states)
7. Implement dark mode theming
8. Add mock data and loading states
