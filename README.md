# IssueMind - AI-Powered GitHub Issue Solver

A modern, AI-enhanced issue management application built with Next.js 15, TypeScript, and shadcn/ui components.

## Features

### 🎯 Core Features
- **Dashboard** - Overview of repositories with key metrics and trends
- **Issue Management** - Browse, filter, and search issues with AI-enhanced metadata
- **AI-Powered Insights** - Generate fixes, explanations, and summaries for issues
- **Task Tracking** - Monitor AI-generated tasks and their status
- **Settings** - Customize theme, integrations, and experimental features

### 🤖 AI Capabilities
- **Generate Fix** - AI creates code patches and diffs for issues
- **Explain Issue** - Detailed analysis of root causes and impact
- **Summarize Discussion** - Condense long comment threads
- **Related Issues** - Find similar issues automatically
- **Auto-labeling** - Suggest and apply labels to issues
- **Priority Detection** - AI assigns priority levels (Low, Medium, High, Urgent)

### 🎨 User Experience
- **Dark Mode** - Full dark/light theme support with system preference detection
- **Command Palette** - Quick navigation with ⌘K/Ctrl+K
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Feedback** - Toast notifications for all actions
- **Loading States** - Smooth transitions and skeleton screens

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (Radix UI primitives)
- **Fonts:** Geist Sans & Geist Mono
- **Icons:** Lucide React
- **State:** React hooks (useState, useEffect)
- **Notifications:** Sonner

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (app)/              # Authenticated app pages
│   │   ├── dashboard/
│   │   ├── repo/[name]/issues/
│   │   ├── ai-tasks/
│   │   └── settings/
│   ├── login/              # Authentication page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home (redirects to login)
├── components/
│   ├── layout/             # Layout components (NavBar, Sidebar)
│   ├── ui/                 # shadcn/ui components
│   ├── command-palette.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── mock-data.ts        # Mock data for demo
│   └── utils.ts            # Utility functions
└── public/
    └── avatars/            # User avatar placeholders
```

## Pages

### `/login`
Authentication page with GitHub OAuth and email/password options (mocked).

### `/dashboard`
Overview of repositories, issue statistics, and quick actions.

### `/repo/[name]/issues`
Browse and filter issues for a specific repository with AI priority tags.

### `/repo/[name]/issues/[id]`
Detailed issue view with:
- Full description and comments
- AI suggestions panel
- Related issues
- Actions: Explain, Generate Fix, Summarize

### `/ai-tasks`
Track all AI-generated tasks with filtering by status and type.

### `/settings`
Configure:
- Appearance (theme, layout density)
- GitHub integration
- Experimental features (auto-labeling, auto-summary)

## Key Features Implementation

### Command Palette (⌘K)
Global search and navigation accessible via keyboard shortcut.

### Mock Data Layer
All data is mocked for demonstration purposes:
- 3 repositories
- 4+ sample issues with various priorities
- Comments and AI task history
- User profiles

### AI Actions
Simulated AI responses with realistic delays:
- Fix generation shows code diffs
- Explanations provide detailed analysis
- Tasks tracked in dedicated page

### Theme Support
- Dark mode (default)
- Light mode
- System preference sync
- Persistent across sessions

## Development Notes

This is a **frontend-only demo application**. All features are mocked:
- No real backend API calls
- Authentication is simulated
- AI responses are pre-generated
- GitHub integration is not functional

The app demonstrates:
- Modern React patterns (Server Components, Client Components)
- Type-safe development with TypeScript
- Accessible UI components
- Responsive design
- Loading and error states
- Optimistic updates

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
