// Mock data for IssueMind App
import { Repository, Issue, AITask, User, AISuggestion } from "../types"

export const mockUser: User = {
  id: "1",
  username: "developer",
  email: "dev@example.com",
  avatar: "/avatars/default.png",
  githubConnected: true,
}

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "next-app",
    owner: "acme",
    description: "Modern Next.js application",
    openIssues: 23,
    closedIssues: 156,
    stars: 1234,
    language: "TypeScript",
  },
  {
    id: "2",
    name: "api-server",
    owner: "acme",
    description: "RESTful API server",
    openIssues: 12,
    closedIssues: 89,
    stars: 567,
    language: "Go",
  },
  {
    id: "3",
    name: "mobile-app",
    owner: "acme",
    description: "React Native mobile application",
    openIssues: 8,
    closedIssues: 45,
    stars: 890,
    language: "TypeScript",
  },
]

export const mockIssues: Issue[] = [
  {
    id: "1",
    number: 123,
    title: "Fix authentication bug in login flow",
    description: "Users are unable to login when using OAuth providers...",
    status: "open",
    priority: "high",
    labels: ["bug", "authentication"],
    assignee: "john_doe",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    comments: [
      {
        id: "c1",
        author: "john_doe",
        avatar: "/avatars/john.png",
        content: "I'm investigating this issue...",
        createdAt: new Date("2024-01-16"),
      },
    ],
    aiTags: ["needs reproduction", "security"],
  },
  {
    id: "2",
    number: 124,
    title: "Add dark mode support",
    description: "Implement dark mode theme for better user experience...",
    status: "open",
    priority: "medium",
    labels: ["enhancement", "ui"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    comments: [],
  },
  {
    id: "3",
    number: 125,
    title: "Performance optimization for data loading",
    description: "Data tables are loading slowly with large datasets...",
    status: "open",
    priority: "critical",
    labels: ["performance", "bug"],
    assignee: "jane_smith",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-21"),
    comments: [
      {
        id: "c2",
        author: "jane_smith",
        avatar: "/avatars/jane.png",
        content: "Working on implementing pagination...",
        createdAt: new Date("2024-01-21"),
      },
    ],
    aiTags: ["optimization"],
  },
]

export const mockAITasks: AITask[] = [
  {
    id: "1",
    name: "Generate fix for issue #123",
    status: "completed",
    progress: 100,
    createdAt: new Date("2024-01-20T10:00:00"),
    completedAt: new Date("2024-01-20T10:02:30"),
    result: "Fix generated successfully",
  },
  {
    id: "2",
    name: "Summarize repository issues",
    status: "in-progress",
    progress: 65,
    createdAt: new Date("2024-01-21T14:30:00"),
  },
  {
    id: "3",
    name: "Auto-prioritize issues",
    status: "pending",
    createdAt: new Date("2024-01-21T15:00:00"),
  },
  {
    id: "4",
    name: "Explain issue #124",
    status: "failed",
    createdAt: new Date("2024-01-21T12:00:00"),
    completedAt: new Date("2024-01-21T12:00:15"),
    result: "Failed: API rate limit exceeded",
  },
]

export const mockAISuggestions: AISuggestion[] = [
  {
    id: "1",
    type: "fix",
    title: "Suggested Fix",
    content: "The issue appears to be in the OAuth callback handler. Add proper error handling for expired tokens.",
    confidence: 0.85,
  },
  {
    id: "2",
    type: "explanation",
    title: "Root Cause Analysis",
    content: "This bug is caused by missing token refresh logic in the authentication middleware.",
    confidence: 0.92,
  },
  {
    id: "3",
    type: "related",
    title: "Related Issues",
    content: "Similar to issues #98 and #102 which were resolved by implementing token refresh.",
    confidence: 0.78,
  },
]
