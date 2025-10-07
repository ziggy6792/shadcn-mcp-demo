# 🧠 IssueMind — AI-Powered GitHub Issue Solver

An AI-powered GitHub issue management application that helps developers triage, prioritize, and solve issues faster with intelligent insights and suggestions.

## ✨ Features

- **Dashboard Overview** - Get a bird's-eye view of all your repositories and their issues
- **AI-Powered Insights** - Automatic priority detection, issue summaries, and pattern recognition
- **Smart Issue Management** - Filter, search, and organize issues with AI-generated tags
- **Intelligent Suggestions** - Get AI-generated explanations, fixes, and summaries for issues
- **Task Tracking** - Monitor AI-generated analyses and fixes in the background
- **Command Palette** - Quick navigation with ⌘K keyboard shortcut
- **Dark Mode** - Full dark mode support with theme toggle
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Toast Notifications**: Sonner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shadcn-mcp-demo-3
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
app/
├── (app)/                      # App routes (with sidebar layout)
│   ├── dashboard/             # Dashboard page
│   ├── repo/[name]/issues/    # Repository issues list
│   │   └── [id]/             # Issue detail page
│   ├── ai-tasks/             # AI tasks tracker
│   ├── settings/             # Settings page
│   └── issues/               # Generic issues redirect
├── login/                    # Login page (no sidebar)
└── layout.tsx               # Root layout with theme provider

components/
├── layout/                  # Layout components
│   ├── app-sidebar.tsx     # Main navigation sidebar
│   ├── navbar.tsx          # Top navigation bar
│   ├── theme-toggle.tsx    # Theme switcher
│   ├── repository-selector.tsx
│   └── user-menu.tsx
├── ui/                      # shadcn/ui components
└── command-palette.tsx      # ⌘K command palette

lib/
├── mock-data.ts            # Mock repository and issue data
├── types.ts                # TypeScript type definitions
└── format.ts               # Utility formatting functions
```

## 🎯 Key Pages

### Login (`/login`)
- GitHub OAuth simulation
- Email/password form
- Redirects to dashboard

### Dashboard (`/dashboard`)
- Repository overview cards
- Issue statistics
- AI-generated insights
- Recent activity feed

### Issues List (`/repo/[name]/issues`)
- Filterable issue table
- AI priority badges
- Search functionality
- Repository-specific insights

### Issue Detail (`/repo/[name]/issues/[id]`)
- Full issue description
- AI-powered actions:
  - Explain Issue
  - Generate Fix
  - Summarize Discussion
- Related issues suggestions
- Comment thread

### AI Tasks (`/ai-tasks`)
- Background task monitoring
- Task history
- Status tracking (pending/completed/failed)

### Settings (`/settings`)
- Theme configuration
- GitHub integration (mock)
- Experimental AI features
- Notification preferences

## ⌨️ Keyboard Shortcuts

- `⌘K` or `Ctrl+K` - Open command palette

## 🎨 Design Features

- **Dark Mode First** - Optimized for dark mode with light mode support
- **Responsive Layout** - Works on desktop and mobile
- **Loading States** - Skeleton loaders and animations
- **Toast Notifications** - User feedback for actions
- **Collapsible Sidebar** - Space-efficient navigation
- **AI Visual Cues** - Sparkle icons and gradient cards for AI features

## 🔮 Mock Data

This is a **frontend-only demo** with realistic mock data for:
- 3 repositories
- Multiple issues per repository
- AI-generated priorities, summaries, and tags
- Mock comments and user data
- Simulated AI task results

## 📝 Future Enhancements

- Real GitHub API integration
- Actual AI/LLM integration
- User authentication
- Real-time updates
- Collaborative features
- Advanced analytics

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 📄 License

MIT License

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Geist](https://vercel.com/font)
