# IssueMind - AI-Powered GitHub Issue Solver

An AI-powered GitHub issue management application that helps developers triage, prioritize, and solve issues faster with AI-generated insights and suggestions.

## 🚀 Features

### Core Functionality
- **Smart Dashboard**: Overview of all repositories with key metrics and AI-powered insights
- **Issue Management**: Browse, filter, and search issues with AI priority scoring
- **AI-Powered Actions**:
  - Explain Issue: Get detailed AI explanations of complex issues
  - Generate Fix: AI-generated code patches and solutions
  - Summarize Discussion: Automatic summaries of long comment threads
- **AI Task Tracking**: Monitor all AI operations and their results
- **Settings & Preferences**: Customize theme, layout, and experimental features

### User Experience
- **Dark Mode**: Full dark/light theme support with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live polling for AI task completion
- **Intuitive Navigation**: Sidebar navigation with repository switcher
- **Smart Filtering**: Filter issues by labels, priority, and AI tags

## 📁 Project Structure

```
├── app/
│   ├── login/                 # Authentication page
│   ├── dashboard/             # Main dashboard with repository overview
│   ├── repo/
│   │   └── [name]/
│   │       └── issues/
│   │           ├── page.tsx   # Issues list view
│   │           └── [id]/
│   │               └── page.tsx  # Individual issue detail
│   ├── ai-tasks/              # AI task management
│   └── settings/              # Application settings
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx        # Main navigation sidebar
│   │   ├── top-nav.tsx        # Top navigation bar
│   │   └── app-layout.tsx     # Wrapper layout component
│   ├── ai/
│   │   ├── ai-fix-modal.tsx   # AI code fix modal
│   │   ├── ai-explain-dialog.tsx  # AI explanation dialog
│   │   └── ai-summary-sheet.tsx   # Discussion summary drawer
│   └── ui/                    # shadcn/ui components
└── lib/
    ├── mocks/
    │   ├── data.ts            # Mock data models and fixtures
    │   └── api.ts             # Simulated API layer
    ├── store.ts               # Client-side state management
    └── utils.ts               # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Handling**: date-fns

## 🎯 User Flows

### 1. Authentication Flow
1. User visits the app
2. Redirected to `/login` if not authenticated
3. Can log in via GitHub OAuth or email/password (demo)
4. Redirected to dashboard upon successful login

### 2. Repository & Issue Flow
1. View repository overview on dashboard
2. Click a repository to view its issues
3. Filter/search issues by labels, priority, or keywords
4. Click an issue to view full details
5. Access AI insights in the right sidebar

### 3. AI Action Flow
1. Open an issue detail page
2. Click AI action button (Explain, Generate Fix, or Summarize)
3. AI task is created and tracked
4. View results in modal/dialog or on AI Tasks page
5. Apply suggestions or review code patches

### 4. Settings Flow
1. Navigate to Settings from sidebar
2. Customize appearance (theme, layout density)
3. Manage GitHub integration
4. Toggle experimental AI features
5. Changes persist in localStorage

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Demo Credentials
The app uses a mock authentication system. Use any email/password combination or click "Continue with GitHub" to log in.

## 🎨 Design Principles

### Developer-Focused
- Clean, minimal interface optimized for productivity
- Dark mode by default (developer preference)
- Clear information hierarchy

### AI-First
- AI insights integrated throughout the app
- Non-intrusive suggestions and recommendations
- Transparent AI task tracking

### Performance
- Static generation where possible
- Optimized bundle sizes
- Minimal client-side JavaScript

## 🧪 Mock Data

The application uses a comprehensive mock data layer simulating:
- 3 GitHub repositories (react-app, api-gateway, data-pipeline)
- Multiple issues with varying priorities and states
- Comments and discussion threads
- AI-generated tasks and results
- Realistic loading states and delays

## 🔮 Experimental Features

Available in Settings > Experimental:
- **Automatic Labeling**: AI suggests and applies labels to new issues
- **Automatic Summarization**: Generate summaries for long threads
- **Predictive Priority**: AI predicts issue priority from content
- **Code Suggestions**: Generate fix suggestions for bugs

## 📝 Key Pages

### `/login`
Authentication page with GitHub OAuth and email/password options.

### `/dashboard`
Repository overview with metrics, trends, and AI insights.

### `/repo/[name]/issues`
Filterable list of issues with AI priority scoring and tags.

### `/repo/[name]/issues/[id]`
Detailed issue view with:
- Full issue content and comments
- AI insights sidebar
- Suggested fixes and related issues
- AI action buttons

### `/ai-tasks`
Track all AI operations with status indicators and results.

### `/settings`
Configure preferences across three tabs:
- General: Theme, layout, default views
- Integrations: GitHub connection management
- Experimental: Toggle new AI features

## 🎭 Component Highlights

### AI Components
- **AIFixModal**: Displays AI-generated code patches with syntax highlighting
- **AIExplainDialog**: Presents detailed issue analysis and recommendations
- **AISummarySheet**: Side drawer with discussion summaries and timelines

### Layout Components
- **Sidebar**: Main navigation with active route highlighting
- **TopNav**: Repository selector, search, theme toggle, user menu
- **AppLayout**: Wrapper providing consistent layout across pages

## 🔄 State Management

Simple, lightweight state management using a custom Store class:
- User authentication state
- Current repository selection
- Persists to localStorage
- Observable pattern for reactivity

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts for tablet and desktop
- Touch-friendly interactive elements
- Collapsible navigation on mobile

## 🚀 Future Enhancements

Potential improvements for a production version:
- Real GitHub API integration
- WebSocket for real-time updates
- Actual AI model integration (OpenAI, Anthropic)
- User collaboration features
- Advanced analytics and reporting
- Export functionality for issues and reports

## 📄 License

This is a demo application created for demonstration purposes.

---

Built with ❤️ using Next.js and shadcn/ui
