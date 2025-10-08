# 🚀 IssueMind - Quick Start Guide

## ⚡ Get Started in 30 Seconds

The application is already running! Visit: **http://localhost:3004**

## 🎯 Demo Walkthrough

### Step 1: Login (15 seconds)
1. Open http://localhost:3004
2. You'll be redirected to `/login`
3. Click **"Continue with GitHub"** (instant demo login)
   - OR enter any email/password and click "Sign In"
4. You'll be redirected to the Dashboard

### Step 2: Explore Dashboard (30 seconds)
1. See 3 repository cards with stats
2. View AI-powered trends at the bottom
3. Click on **"react-app"** repository card

### Step 3: Browse Issues (45 seconds)
1. You're now at `/repo/react-app/issues`
2. See 4 issues with different priorities (Critical, High, Medium, Low)
3. Try the filters:
   - Type "button" in search
   - Select "bug" from label filter
   - Select "critical" from priority filter
4. Click on Issue **#342** (the critical button issue)

### Step 4: Explore Issue Detail & AI Features (2 minutes)
1. You're now at `/repo/react-app/issues/342`
2. Read the issue description and comments
3. Notice the **AI Insights** sidebar on the right
4. Try the AI actions:

   **🤖 Explain Issue:**
   - Click the "Explain Issue" button
   - See detailed AI analysis in a modal
   - Read root cause, recommendations, and impact
   - Click "Got it" to close

   **💻 Generate Fix:**
   - Click the "Generate Fix" button
   - View AI-generated code patch
   - See the diff with proposed changes
   - Copy the code or close the modal

   **💬 Summarize Discussion:**
   - Click the "Summarize Discussion" button
   - A side drawer opens with:
     - Key points from comments
     - Discussion themes
     - Participant list
     - Timeline
   - Scroll through the summary

5. Each AI action creates a task - check the toast notifications!

### Step 5: Check AI Tasks (1 minute)
1. Click **"AI Tasks"** in the left sidebar
2. See the tasks you just created
3. Watch them auto-complete after 3 seconds (with animated pulse)
4. View the summary cards showing counts

### Step 6: Explore Settings (1 minute)
1. Click **"Settings"** in the left sidebar
2. Try the tabs:
   - **General**: Change theme (click theme dropdown)
   - **Integrations**: See GitHub connection status
   - **Experimental**: Toggle AI features on/off
3. Click "Save Changes" to persist settings

### Step 7: Test Navigation (30 seconds)
1. Use the **repository selector** in top nav to switch repos
   - Try "api-gateway" or "data-pipeline"
2. Toggle **dark/light mode** with the sun/moon icon
3. Click your **user menu** and see logout option
4. Use the **sidebar** to jump between sections

## 🎨 Features to Notice

### Visual Feedback
- ✨ **Toast notifications** appear when you trigger AI actions
- 🎨 **Color-coded priorities** (Red=Critical, Orange=High, Yellow=Medium, Green=Low)
- ⚡ **Loading states** with skeleton loaders
- 🎯 **Active route highlighting** in sidebar
- 💫 **Smooth animations** on hover and transitions

### AI Intelligence
- 🤖 **AI Priority Scoring** on every issue
- 🏷️ **AI-Generated Tags** (needs-repro, mobile-specific, etc.)
- 💡 **Smart Suggestions** in issue detail sidebar
- 🔗 **Related Issues** detection
- 📊 **Trend Analysis** on dashboard

### User Experience
- 🔍 **Real-time search** filtering
- 🎛️ **Multiple filters** (label, priority)
- 📱 **Responsive design** (try resizing your browser)
- 💾 **Persistent state** (login, settings, repo selection)
- ⌨️ **Keyboard shortcuts** hint (⌘K search bar)

## 🧪 Test Different Scenarios

### Try Different Repositories
```bash
1. Navigate to Dashboard
2. Click "api-gateway" → See security issue #125
3. Click "data-pipeline" → See performance issue #89
```

### Filter Combinations
```bash
On issues list:
1. Search: "memory"
2. Label: "performance"
3. Priority: "high"
→ Should show issue #341
```

### AI Actions on Different Issues
```bash
1. Go to Issue #341 (Memory leak)
2. Try "Explain Issue" → See different analysis
3. Go to Issue #340 (Dark mode)
4. Try "Generate Fix" → See UI-focused patch
```

## 🎬 Complete User Journey

```
Login → Dashboard → Select Repo → Browse Issues →
Filter Issues → Open Issue → Read Details →
Trigger AI Explain → Review Analysis →
Trigger AI Fix → Review Code →
Go to AI Tasks → See Task Status →
Go to Settings → Change Theme →
Check Dashboard Trends → Logout
```

**Estimated time**: 5-7 minutes for complete journey

## 📊 What to Look For

### Data Richness
- 3 mock repositories with realistic stats
- 6 sample issues across repos
- 2 pre-existing AI tasks
- Multiple comments per issue
- Realistic timestamps

### Interaction Quality
- Instant feedback on clicks
- Smooth modal/dialog transitions
- Realistic loading delays (500ms-3s)
- Auto-updating task statuses
- Persistent user preferences

### Professional Polish
- Consistent design language
- Proper spacing and typography
- Accessible color contrasts
- Clear visual hierarchy
- Professional icons (Lucide)

## 🎯 Key Endpoints

| URL | Page |
|-----|------|
| http://localhost:3004 | Auto-redirect (Login or Dashboard) |
| http://localhost:3004/login | Login page |
| http://localhost:3004/dashboard | Main dashboard |
| http://localhost:3004/repo/react-app/issues | React app issues |
| http://localhost:3004/repo/react-app/issues/342 | Issue #342 detail |
| http://localhost:3004/ai-tasks | AI task tracker |
| http://localhost:3004/settings | Settings panel |

## 💡 Pro Tips

1. **Refresh After Logout**: The app persists login in localStorage. After logout, refresh to see the login page.

2. **Watch Task Completion**: After triggering an AI action, navigate to AI Tasks and watch the status change from "Pending" to "Completed" after ~3 seconds.

3. **Theme Persistence**: Change the theme in settings, refresh the page - your preference is saved!

4. **Mobile View**: Resize your browser to < 640px width to see the mobile layout.

5. **Network Tab**: Open DevTools Network tab to see the simulated API delays.

## 🐛 Known Demo Limitations

- Search bar is visual only (no global search implemented)
- Command palette (⌘K) hint is visual only
- "View Result" buttons on AI tasks are placeholders
- No actual GitHub API integration (all mocked)
- No real AI models (pre-written responses)
- Create/Edit issue functionality not implemented

## ✅ Success Criteria

You've successfully explored the app if you've:
- ✅ Logged in successfully
- ✅ Viewed all 3 repositories
- ✅ Opened at least one issue detail
- ✅ Triggered all 3 AI actions (Explain, Fix, Summarize)
- ✅ Seen tasks in the AI Tasks page
- ✅ Changed a setting and saw it persist
- ✅ Toggled between light and dark themes

## 🎉 Congratulations!

You've experienced a complete AI-powered issue management workflow. This demo showcases:
- Modern React/Next.js architecture
- Beautiful UI with shadcn components
- Realistic user flows and interactions
- Professional design patterns
- AI-first product thinking

---

**Ready to Start?** Open http://localhost:3004 now! 🚀
