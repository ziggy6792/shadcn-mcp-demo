# IssueMind App Structure

## 🗺️ Complete Application Map

```
IssueMind Application
│
├── 🔐 Authentication Layer
│   └── /login
│       ├── GitHub OAuth button
│       ├── Email/Password form
│       └── Auto-redirect on success
│
├── 📊 Main Application (Authenticated)
│   │
│   ├── 🏠 Dashboard (/dashboard)
│   │   ├── Stats Cards (Repos, Open Issues, Closed Issues)
│   │   ├── Repository Grid
│   │   │   ├── Repository Card 1: react-app
│   │   │   ├── Repository Card 2: api-gateway
│   │   │   └── Repository Card 3: data-pipeline
│   │   └── AI Trends Section
│   │
│   ├── 📋 Issues (/repo/[name]/issues)
│   │   ├── Search Bar
│   │   ├── Filters
│   │   │   ├── Label Filter
│   │   │   └── Priority Filter
│   │   └── Issue Cards List
│   │       ├── Issue #342 (Critical)
│   │       ├── Issue #341 (High)
│   │       ├── Issue #340 (Medium)
│   │       └── Issue #339 (Low)
│   │
│   ├── 🔍 Issue Detail (/repo/[name]/issues/[id])
│   │   ├── Left Panel (Main Content)
│   │   │   ├── Issue Header
│   │   │   │   ├── Issue Number & State
│   │   │   │   ├── Title
│   │   │   │   ├── Priority Badge
│   │   │   │   └── Labels
│   │   │   ├── Issue Body (Markdown)
│   │   │   └── Comments Thread
│   │   │
│   │   └── Right Panel (AI Insights)
│   │       ├── AI Actions Card
│   │       │   ├── 🤖 Explain Issue → Opens Dialog
│   │       │   ├── 💻 Generate Fix → Opens Modal
│   │       │   └── 💬 Summarize Discussion → Opens Sheet
│   │       │
│   │       ├── AI Insights Tabs
│   │       │   ├── Tab: Suggestions
│   │       │   │   ├── Potential Root Cause
│   │       │   │   ├── Suggested Fix
│   │       │   │   └── Testing Recommendation
│   │       │   └── Tab: Related Issues
│   │       │       ├── Related Issue #340
│   │       │       └── Related Issue #335
│   │       │
│   │       └── AI Tags Card
│   │
│   ├── ⚡ AI Tasks (/ai-tasks)
│   │   ├── Summary Cards Row
│   │   │   ├── Pending Count
│   │   │   ├── Completed Count
│   │   │   └── Failed Count
│   │   └── Tasks Table
│   │       ├── Task Row: Explain Issue (Completed)
│   │       └── Task Row: Generate Fix (Pending)
│   │
│   └── ⚙️ Settings (/settings)
│       ├── Tab: General
│       │   ├── Appearance Card
│       │   │   ├── Theme Selector (Dark/Light/System)
│       │   │   └── Layout Density Selector
│       │   └── Default Views Card
│       │
│       ├── Tab: Integrations
│       │   └── GitHub Integration Card
│       │       ├── Connection Status
│       │       ├── Permissions List
│       │       └── Connect/Disconnect Button
│       │
│       └── Tab: Experimental
│           └── AI Features Card
│               ├── Toggle: Automatic Labeling
│               ├── Toggle: Automatic Summarization
│               ├── Toggle: Predictive Priority
│               └── Toggle: Code Suggestions
│
└── 🧩 Global Components (Present on All Pages)
    ├── Left Sidebar
    │   ├── Logo
    │   ├── Nav: Dashboard
    │   ├── Nav: Issues
    │   ├── Nav: AI Tasks
    │   └── Nav: Settings
    │
    └── Top Navigation Bar
        ├── Repository Selector Dropdown
        ├── Search Input (⌘K)
        ├── Theme Toggle Button
        └── User Menu
            ├── User Info Display
            └── Logout Option
```

## 🎭 AI Interaction Components

### 1. AIExplainDialog (Modal)
```
┌─────────────────────────────────────┐
│ 📄 AI Explanation                   │
│ Issue: Button not responding...     │
├─────────────────────────────────────┤
│ 💡 Issue Summary                    │
│ [Detailed explanation...]           │
│                                     │
│ ⚠️ Root Cause                       │
│ [Technical analysis...]             │
│                                     │
│ 📝 Recommended Actions              │
│ 1. Immediate: Add CSS property      │
│ 2. Short-term: Review z-index       │
│ 3. Long-term: Implement testing     │
│                                     │
│ ⚠️ Impact Assessment                │
│ [Business impact analysis...]       │
├─────────────────────────────────────┤
│           [Close]  [Got it]         │
└─────────────────────────────────────┘
```

### 2. AIFixModal (Modal)
```
┌─────────────────────────────────────┐
│ 💻 AI-Generated Fix                 │
│ Issue: Button not responding...     │
├─────────────────────────────────────┤
│ Suggested Fix        [📋 Copy Code] │
│                                     │
│ 📊 Analysis                         │
│ [Explanation of the issue...]       │
│                                     │
│ 📝 Proposed Changes                 │
│ ┌─────────────────────────────────┐ │
│ │ diff --git a/src/Button.tsx    │ │
│ │ @@ -10,7 +10,8 @@              │ │
│ │ -  className="primary-button"  │ │
│ │ +  className="primary-button"  │ │
│ │ +  style={{ pointerEvents...   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🧪 Testing Recommendations          │
│ • Test on iOS Safari 15, 16, 17    │
│ • Verify touch events work         │
│ • Check z-index conflicts          │
├─────────────────────────────────────┤
│           [Close]  [Apply Fix]      │
└─────────────────────────────────────┘
```

### 3. AISummarySheet (Side Drawer)
```
                    ┌──────────────────────────┐
                    │ 💬 Discussion Summary    │
                    │ Issue: Button not...     │
                    ├──────────────────────────┤
                    │ [2 Comments] [AI Generated]│
                    │                          │
                    │ 📌 Key Points            │
                    │ 1️⃣ john_mobile confirmed │
                    │    reproduction          │
                    │ 2️⃣ sarah_dev found CSS   │
                    │    z-index issue         │
                    │                          │
                    │ 🎯 Discussion Themes     │
                    │ • Touch Event Handling   │
                    │ • CSS Investigation      │
                    │                          │
                    │ 👥 Participants          │
                    │ • sarah_dev (2 comments) │
                    │ • john_mobile (1 comment)│
                    │                          │
                    │ 📅 Timeline              │
                    │ • Issue opened (3d ago)  │
                    │ • Investigation (2d ago) │
                    │ • CSS analysis (1d ago)  │
                    │                          │
                    │ ✅ Next Steps            │
                    │ • Apply CSS fix          │
                    │ • Test on iOS devices    │
                    │ • Review similar issues  │
                    └──────────────────────────┘
```

## 🎨 Color Coding System

### Priority Badges
- 🔴 **Critical**: Red background (bg-red-500)
- 🟠 **High**: Orange background (bg-orange-500)
- 🟡 **Medium**: Yellow background (bg-yellow-500)
- 🟢 **Low**: Green background (bg-green-500)

### Activity Indicators
- 🔴 **High Activity**: Red dot
- 🟡 **Medium Activity**: Yellow dot
- 🟢 **Low Activity**: Green dot

### Status Indicators
- ✅ **Completed**: Green checkmark
- ⏱️ **Pending**: Yellow clock (animated pulse)
- ❌ **Failed**: Red X

## 🔄 State Flow Diagram

```
User Visits App
      ↓
[Check Auth Status]
      ↓
  ┌───┴───┐
  NO     YES
  ↓       ↓
/login  /dashboard
  ↓       ↓
Login   View Repos
  ↓       ↓
Set User Select Repo
  ↓       ↓
Store   Set Current Repo
  ↓       ↓
Redirect /repo/[name]/issues
  ↓       ↓
/dashboard View Issues
            ↓
      Select Issue
            ↓
      /repo/[name]/issues/[id]
            ↓
      Trigger AI Action
            ↓
      Create AI Task
            ↓
      Show Modal/Dialog/Sheet
            ↓
      Track in /ai-tasks
            ↓
      [Auto-complete after 3s]
            ↓
      Show Result Notification
```

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
├── Stacked layouts
├── Full-width components
└── Collapsible navigation

Tablet (640px - 1024px)
├── 2-column grids
├── Side-by-side cards
└── Visible sidebar

Desktop (> 1024px)
├── 3-column grids
├── Persistent sidebar
└── Multi-panel layouts
```

## 🎯 Key User Interactions

| Action | Component | Result |
|--------|-----------|--------|
| Click Repository Card | Dashboard | Navigate to issues list |
| Type in Search | Issues List | Filter issues by text |
| Select Label Filter | Issues List | Filter by label |
| Select Priority Filter | Issues List | Filter by AI priority |
| Click Issue Card | Issues List | Navigate to issue detail |
| Click "Explain Issue" | Issue Detail | Open AIExplainDialog |
| Click "Generate Fix" | Issue Detail | Open AIFixModal |
| Click "Summarize" | Issue Detail | Open AISummarySheet |
| Click "Apply Fix" | AIFixModal | Show success toast |
| Toggle Theme | Top Nav | Switch dark/light mode |
| Change Repository | Top Nav | Navigate to new repo |
| Click Logout | User Menu | Clear auth & redirect |
| Toggle Feature | Settings | Save to localStorage |

## 🗂️ Data Models

### Repository
```typescript
{
  id: string
  name: string
  owner: string
  description: string
  openIssues: number
  closedIssues: number
  activity: 'high' | 'medium' | 'low'
}
```

### Issue
```typescript
{
  id: string
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  labels: string[]
  author: string
  assignee?: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
  aiPriority: 'critical' | 'high' | 'medium' | 'low'
  aiTags: string[]
}
```

### AITask
```typescript
{
  id: string
  issueId: string
  issueTitle: string
  type: 'explain' | 'fix' | 'summarize'
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  result?: string
}
```

---

**Complete Implementation**: All components, pages, and flows are fully functional and integrated.
