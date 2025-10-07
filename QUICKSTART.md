# IssueMind - Quick Start Guide

## 🚀 Running the App

The development server is already running at:
- **Local:** http://localhost:3002
- **Network:** http://192.168.18.18:3002

Open http://localhost:3002 in your browser to view the app.

## 📖 Demo Walkthrough

### 1. Login (Entry Point)
- Visit http://localhost:3002
- You'll be redirected to the login page
- Click **"Continue with GitHub"** or use the email form
- Any credentials work (authentication is mocked)

### 2. Dashboard
After login, you'll see:
- **Statistics cards** showing open issues, closed issues, urgent items, and AI tasks
- **3 repository cards** (frontend-app, api-service, design-system)
- **Quick action buttons** for AI features

**Try this:**
- Click on any repository card to view its issues

### 3. Issues List
Browse issues for a repository:
- **Filter by status** (All, Open, Closed)
- **Filter by priority** (All, Urgent, High, Medium, Low)
- **Search** issues by title or description
- Notice the **AI priority badges** (colored tags)
- Notice the **AI-generated tags** (e.g., "browser-compatibility", "validation")

**Try this:**
- Click on issue #142 "Login form validation not working on Safari"

### 4. Issue Detail (The Star Feature!)
Here's where the AI magic happens:

**AI Actions** (bottom of page):
1. **Explain Issue**
   - Click to get AI analysis
   - Shows root cause, impact, and recommendations
   - Opens in a modal

2. **Generate Fix**
   - Click to get AI-generated code patch
   - Shows actual diff with syntax
   - Can copy to clipboard

3. **Summarize Discussion**
   - Click to condense the comment thread
   - Shows as toast notification

**Right Sidebar:**
- **Suggestions tab:** AI-generated next steps
- **Related tab:** Similar issues found by AI

**Try this:**
- Click "Generate Fix" and review the code diff
- Check the AI Suggestions in the right sidebar

### 5. AI Tasks
Navigate to AI Tasks (sidebar or ⌘K):
- See all AI operations (completed, pending, failed)
- **Filter by status** or **task type**
- View task execution times
- Click "View Results" to see the original issue

**Try this:**
- Filter by "Completed" to see finished tasks
- Notice the different task types (Fix, Summary, Explain, Related)

### 6. Settings
Open Settings (user dropdown or sidebar):

**General Tab:**
- Switch theme (Light/Dark/System)
- Change layout density
- Set default view preference

**Integrations Tab:**
- See GitHub connection status
- View permission scopes
- Toggle connection (mocked)

**Experimental Tab:**
- Enable/disable AI auto-labeling
- Enable/disable auto-summaries
- See experimental feature warnings

**Try this:**
- Toggle the theme and watch the UI update instantly

### 7. Command Palette (Power User Feature!)
Press **⌘K** (Mac) or **Ctrl+K** (Windows/Linux):
- Quick search appears
- Type to find:
  - Pages (Dashboard, AI Tasks, Settings)
  - Repositories
  - Issues
- Press Enter to navigate instantly

**Try this:**
- Press ⌘K
- Type "dashboard" and press Enter
- Press ⌘K again, type "login" and press Enter

## 🎯 Key Features to Demo

### AI-Powered Insights
1. Open any issue
2. Click "Generate Fix"
3. Review the AI-generated code diff
4. See it tracked in AI Tasks

### Smart Filtering
1. Go to any repository's issues
2. Filter by "Urgent" priority
3. Search for "validation"
4. Notice how results update instantly

### Theme Switching
1. Click theme toggle in navbar (sun/moon icon)
2. Or go to Settings → General → Theme
3. Watch the entire app transition smoothly

### Command Palette Navigation
1. From anywhere, press ⌘K
2. Type "api" to find api-service repo
3. Navigate with keyboard only

## 📁 Sample Data

**Repositories:**
- frontend-app (24 open issues)
- api-service (12 open issues)
- design-system (8 open issues)

**Sample Issues:**
- #142 - Login form validation (Safari bug) - **High Priority**
- #138 - Dark mode support (feature request) - **Medium Priority**
- #135 - API 500 error (backend bug) - **Urgent Priority**
- #67 - Update docs (documentation) - **Low Priority**

**AI Tasks:**
- Fix for issue #142 (Completed)
- Summary for issue #3 (Pending)
- Explanation for issue #2 (Completed)
- Related issues for #1 (Completed)
- Summary for issue #3 (Failed - for demo)

## 🎨 UI Elements to Notice

**Badges:**
- Priority badges (colored: red=urgent, orange=high, yellow=medium, blue=low)
- Status badges (green=open, purple=closed)
- AI tag badges (gray with sparkle icon)

**Loading States:**
- Spinner animations when AI is "thinking"
- Toast notifications for feedback
- Smooth page transitions

**Responsive Design:**
- Resize browser window
- Notice sidebar hides on mobile
- Cards stack on smaller screens

## 🔧 Development

**Commands:**
```bash
pnpm dev      # Start development server (already running)
pnpm build    # Build for production
pnpm start    # Run production build
pnpm lint     # Lint code
```

**File Structure:**
- `app/` - Pages and routes
- `components/` - Reusable UI components
- `lib/` - Types, utilities, mock data

## 💡 Tips

1. **Dark Mode First**: App defaults to dark mode (as specified in the plan)
2. **All Data is Mocked**: No backend needed, everything works offline
3. **Keyboard Shortcuts**: ⌘K is your best friend for navigation
4. **Mobile Friendly**: Try it on your phone (use network URL)
5. **AI Delays**: Realistic 1-2 second delays simulate actual AI processing

## ❓ Troubleshooting

**Port already in use:**
- App automatically tries ports 3000, 3001, 3002
- Currently running on 3002

**Page not found:**
- Make sure you're visiting `/login`, `/dashboard`, or using navigation
- Root `/` redirects to `/login`

**Styles not loading:**
- Refresh the page
- Check browser console for errors

## 🎉 Enjoy Exploring!

The app demonstrates modern React/Next.js patterns with a focus on:
- AI-enhanced developer workflows
- Beautiful, accessible UI
- Smooth, polished interactions
- Real-world app structure

Have fun exploring! 🚀
