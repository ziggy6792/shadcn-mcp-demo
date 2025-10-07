# IssueMind App - Component Requirements

## Registry Configuration
- **Primary Registry**: @shadcn

---

## Global Layout Components

### 1. Top Navigation Bar
**Components Required:**
- `button` - User account menu trigger, AI assistant trigger
- `dropdown-menu` - User account menu, repository selector
- `select` - Repository selector dropdown
- `input` - Global search field
- `avatar` - User profile picture
- `separator` - Visual dividers between nav sections

**Component Hierarchy:**
```
Navigation Container
├── Logo
├── Select (repository selector)
├── Input (global search)
├── Button + DropdownMenu (AI assistant)
└── Button + DropdownMenu + Avatar (user account)
```

### 2. Sidebar
**Components Required:**
- `sidebar-01` or `sidebar-08` (block) - Main sidebar structure
- `button` - Navigation items
- `separator` - Section dividers
- `scroll-area` - Scrollable navigation

**Component Hierarchy:**
```
Sidebar
├── ScrollArea
│   ├── Nav Section: Dashboard
│   ├── Separator
│   ├── Nav Section: Issues
│   ├── Separator
│   ├── Nav Section: AI Tasks
│   ├── Separator
│   └── Nav Section: Settings
```

### 3. Toast / Snackbar
**Components Required:**
- `sonner` - Toast notifications

**Usage:**
- Success notifications ("AI fix generated")
- Error notifications
- Info notifications ("Operation complete")

### 4. Command Palette (⌘K)
**Components Required:**
- `command` - Command palette base
- `command-dialog` (example) - Dialog wrapper for command palette
- `dialog` - Modal container

**Component Hierarchy:**
```
Dialog
└── Command
    ├── CommandInput (search)
    ├── CommandList
    │   ├── CommandGroup (Repositories)
    │   ├── CommandGroup (AI Actions)
    │   └── CommandGroup (Navigation)
```

### 5. Theme Toggle
**Components Required:**
- `switch` or `dropdown-menu` - Theme switcher control
- `button` - Toggle trigger

### 6. Right-Side Drawer
**Components Required:**
- `sheet` - Drawer/sheet component
- `tabs` - Tab navigation within drawer
- `scroll-area` - Scrollable content area
- `button` - Close and action buttons

**Component Hierarchy:**
```
Sheet (side="right")
├── SheetHeader
├── Tabs
│   ├── TabsList
│   │   ├── TabsTrigger (AI Suggestions)
│   │   ├── TabsTrigger (Diff Preview)
│   │   └── TabsTrigger (Related Issues)
│   └── TabsContent (with ScrollArea)
└── SheetFooter (action buttons)
```

---

## Page-Specific Components

## Page 1: `/login`

**Components Required:**
- `card` - Form container
- `form` - Form validation and submission
- `input` - Email and password fields
- `label` - Field labels
- `button` - Submit and OAuth buttons
- `alert` - Error messages
- `spinner` - Loading indicator

**Pre-built Blocks Available:**
- `login-01` (block) - Simple login form
- `login-04` (block) - Login with form and image

**Component Hierarchy:**
```
Card
└── Form
    ├── Label + Input (email)
    ├── Label + Input (password)
    ├── Alert (errors, if any)
    ├── Button (submit) + Spinner (loading)
    └── Separator + Button (GitHub OAuth)
```

---

## Page 2: `/dashboard`

**Components Required:**
- `card` - Repository cards, metrics cards
- `badge` - Issue counts, status indicators
- `skeleton` - Loading placeholders
- `button` - Quick action buttons
- `separator` - Section dividers
- `progress` - Activity progress bars
- `scroll-area` - Scrollable repository list

**Pre-built Blocks Available:**
- `dashboard-01` (block) - Dashboard with sidebar, charts, and data table

**Component Hierarchy:**
```
Dashboard Container
├── Section: Repository List
│   ├── ScrollArea
│   │   └── Card (repeated for each repo)
│   │       ├── CardHeader (name + Badge for issue count)
│   │       ├── CardContent (metrics)
│   │       └── CardFooter (Button: View Issues)
├── Separator
└── Section: This Week's Trends
    ├── Card (Issue Summary)
    │   ├── Skeleton (loading state)
    │   └── Progress (activity bars)
    └── Card (Quick Actions)
        ├── Button (Prioritize Issues)
        └── Button (Summarize Repository Issues)
```

---

## Page 3: `/repo/[name]/issues`

**Components Required:**
- `table` - Issues list
- `input` - Search field
- `button` - Filter buttons, action buttons
- `dropdown-menu` - Sort options
- `badge` - Labels, status, priority indicators
- `checkbox` - Multi-select rows
- `sheet` - Right drawer for AI assist panel
- `tabs` - Filter tabs (Open/Closed)
- `scroll-area` - Scrollable table
- `avatar` - Assignee avatars
- `separator` - Table sections

**Component Hierarchy:**
```
Layout (3-column)
├── Sidebar (Filters)
│   ├── Tabs (Open/Closed)
│   ├── Separator
│   ├── Label + Checkbox[] (Labels filter)
│   ├── Separator
│   ├── Label + Select (Assignee filter)
│   └── Label + Checkbox[] (AI tags)
│
├── Main Panel
│   ├── Input (search) + DropdownMenu (sort)
│   ├── Table
│   │   ├── TableHeader
│   │   │   ├── Checkbox (select all)
│   │   │   ├── Title
│   │   │   ├── Status
│   │   │   ├── Last Update
│   │   │   └── AI Priority
│   │   └── TableBody
│   │       └── TableRow (repeated)
│   │           ├── Checkbox
│   │           ├── TableCell (title)
│   │           ├── TableCell (Badge: status)
│   │           ├── TableCell (date)
│   │           └── TableCell (Badge: AI priority)
│   └── Button[] (bulk actions, when items selected)
│
└── Sheet (Right Drawer - AI Assist)
    ├── Tabs
    │   ├── TabsTrigger (Insights)
    │   ├── TabsTrigger (Recommendations)
    │   └── TabsContent (ScrollArea with content)
```

---

## Page 4: `/repo/[name]/issues/[id]`

**Components Required:**
- `card` - Issue container
- `badge` - Labels, status
- `avatar` - Author avatar
- `separator` - Content sections
- `tabs` - Right column tabs (Suggestions, Fix Preview, Related Issues)
- `button` - Action buttons
- `dialog` - AI Fix modal, Explain modal
- `sheet` - Related Issues drawer
- `scroll-area` - Comments timeline
- `textarea` - Comment input (if adding comments)
- `tooltip` - Helper tooltips

**Component Hierarchy:**
```
Layout (2-column + fixed bottom bar)
├── Main Content
│   ├── Card (Issue Header)
│   │   ├── CardHeader
│   │   │   ├── Title
│   │   │   ├── Badge[] (labels)
│   │   │   └── Avatar + metadata (author, date)
│   │   └── CardContent
│   │       └── Markdown content (issue body)
│   │
│   └── Card (Comments/Activity Timeline)
│       └── ScrollArea
│           └── Comment items (repeated)
│               ├── Avatar
│               ├── Author name + timestamp
│               └── Comment text
│
├── Right Column
│   └── Tabs
│       ├── TabsList
│       │   ├── TabsTrigger (Suggestions)
│       │   ├── TabsTrigger (Fix Preview)
│       │   └── TabsTrigger (Related Issues)
│       ├── TabsContent (Suggestions)
│       │   └── ScrollArea
│       │       └── Card[] (AI suggestions)
│       ├── TabsContent (Fix Preview)
│       │   └── ScrollArea (code diff preview)
│       └── TabsContent (Related Issues)
│           └── ScrollArea
│               └── Card[] (related issues)
│
└── Action Bar (Fixed Bottom)
    ├── Button (Explain Issue) + Tooltip
    ├── Button (Generate Fix) + Tooltip
    └── Button (Summarize Discussion) + Tooltip

Modals/Dialogs:
├── Dialog (AI Fix Modal)
│   ├── DialogHeader (title)
│   ├── DialogContent
│   │   └── ScrollArea (code diff)
│   └── DialogFooter
│       ├── Button (Cancel)
│       └── Button (Apply Fix)
│
├── Dialog (Explain Modal)
│   ├── DialogHeader
│   ├── DialogContent
│   │   └── Markdown summary
│   └── DialogFooter (Button: Close)
│
└── Sheet (Related Issues Drawer)
    └── ScrollArea
        └── Card[] (issue previews)
```

---

## Page 5: `/ai-tasks`

**Components Required:**
- `table` - Task list
- `badge` - Status indicators (Pending, Completed, Failed)
- `button` - Filter buttons, clear completed, action buttons
- `spinner` - In-progress task indicators
- `dropdown-menu` - Task actions menu
- `tabs` - Filter tabs (All/Pending/Completed/Failed)
- `alert` - Error messages for failed tasks
- `dialog` - Task detail modal

**Component Hierarchy:**
```
Container
├── Header
│   ├── Title
│   └── Button (Clear Completed)
│
├── Tabs (filter by status)
│   ├── TabsTrigger (All)
│   ├── TabsTrigger (Pending)
│   ├── TabsTrigger (Completed)
│   └── TabsTrigger (Failed)
│
└── Table
    ├── TableHeader
    │   ├── Task Name
    │   ├── Status
    │   ├── Timestamp
    │   └── Actions
    └── TableBody
        └── TableRow (repeated)
            ├── TableCell (task name)
            ├── TableCell
            │   └── Badge (status) or Spinner (if pending)
            ├── TableCell (timestamp)
            └── TableCell
                └── DropdownMenu (View, Retry, Delete)

Task Detail Dialog:
Dialog
├── DialogHeader (task name)
├── DialogContent
│   ├── Status Badge
│   ├── Timestamp
│   ├── Separator
│   └── ScrollArea (task result/output)
└── DialogFooter
    ├── Button (Retry, if failed)
    └── Button (Close)
```

---

## Page 6: `/settings`

**Components Required:**
- `tabs` - Settings sections (General, Integrations, Experimental)
- `card` - Settings group containers
- `label` - Setting labels
- `switch` - Toggle settings
- `select` - Dropdown settings
- `button` - Save/Connect/Disconnect buttons
- `separator` - Section dividers
- `badge` - Status indicators (Connected/Disconnected)
- `alert` - Information/warning messages

**Component Hierarchy:**
```
Container
└── Tabs (vertical layout)
    ├── TabsList (sidebar)
    │   ├── TabsTrigger (General)
    │   ├── TabsTrigger (Integrations)
    │   └── TabsTrigger (Experimental)
    │
    ├── TabsContent (General)
    │   ├── Card (Appearance)
    │   │   ├── Label + Switch (Dark mode)
    │   │   └── Label + Select (Layout density)
    │   ├── Separator
    │   └── Card (Defaults)
    │       └── Label + Select (Default repo view)
    │
    ├── TabsContent (Integrations)
    │   └── Card (GitHub Connection)
    │       ├── Badge (Connected/Disconnected)
    │       ├── Separator
    │       ├── Button (Link/Unlink GitHub)
    │       └── Alert (connection status info)
    │
    └── TabsContent (Experimental)
        ├── Alert (warning about experimental features)
        ├── Separator
        ├── Label + Switch (Auto-labeling)
        ├── Separator
        ├── Label + Switch (Auto-summarization)
        └── Separator
```

---

## Complete Component List (Alphabetical)

### UI Components (from @shadcn registry:ui)
1. `alert` - Error and notification messages
2. `avatar` - User profile pictures, assignee icons
3. `badge` - Status indicators, labels, counts
4. `breadcrumb` - Navigation breadcrumbs (optional)
5. `button` - All interactive actions
6. `card` - Content containers
7. `checkbox` - Multi-select, filters
8. `command` - Command palette
9. `dialog` - Modals and popups
10. `dropdown-menu` - Contextual menus
11. `form` - Form validation
12. `input` - Text input fields
13. `label` - Form field labels
14. `popover` - Additional context displays (optional)
15. `progress` - Progress indicators
16. `scroll-area` - Scrollable regions
17. `select` - Dropdown selectors
18. `separator` - Visual dividers
19. `sheet` - Side drawers
20. `skeleton` - Loading placeholders
21. `sonner` - Toast notifications
22. `spinner` - Loading indicators
23. `switch` - Toggle controls
24. `table` - Data tables
25. `tabs` - Tabbed interfaces
26. `textarea` - Multi-line text input
27. `tooltip` - Helpful hints

### Pre-built Blocks (registry:block) - Optional
1. `login-01` - Simple login form
2. `login-04` - Login with image
3. `sidebar-01` - Simple sidebar with navigation
4. `sidebar-08` - Inset sidebar with secondary navigation
5. `dashboard-01` - Dashboard with sidebar, charts, and data table

---

## Installation Command

To install all required UI components at once:

```bash
pnpm dlx shadcn@latest add alert avatar badge button card checkbox command dialog dropdown-menu form input label progress scroll-area select separator sheet skeleton sonner spinner switch table tabs textarea tooltip
```

To add useful blocks:
```bash
pnpm dlx shadcn@latest add @shadcn/login-01 @shadcn/sidebar-01 @shadcn/dashboard-01
```

---

## Implementation Priority

### Phase 1: Core Layout (High Priority)
1. Navigation bar components
2. Sidebar
3. Theme toggle
4. Toast notifications

### Phase 2: Authentication (High Priority)
1. Login page
2. Form components

### Phase 3: Main Features (Medium Priority)
1. Dashboard
2. Issues list page
3. Issue detail page

### Phase 4: Advanced Features (Low Priority)
1. AI Tasks page
2. Settings page
3. Command palette
4. Right-side drawer enhancements

---

## Notes
- All components are from the **@shadcn** registry
- Focus on dark mode as the primary theme
- Use mocked data throughout (no backend)
- Prioritize loading states (skeleton, spinner) for realistic AI simulation
- Component hierarchy is flexible and can be adjusted during implementation
