export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  openIssues: number;
  closedIssues: number;
  stars: number;
  language: string;
  lastUpdate: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  status: "open" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  labels: string[];
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  assignee?: {
    name: string;
    avatar: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  comments: number;
  aiInsight?: {
    summary: string;
    suggestedFix?: string;
    complexity: "simple" | "moderate" | "complex";
  };
}

export interface AITask {
  id: string;
  name: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  type: "fix" | "summary" | "explanation" | "analysis";
  issueNumber?: number;
  timestamp: string;
  result?: string;
}

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "react-dashboard",
    fullName: "acme-corp/react-dashboard",
    description: "Modern React dashboard with AI-powered analytics",
    openIssues: 23,
    closedIssues: 157,
    stars: 1243,
    language: "TypeScript",
    lastUpdate: "2 hours ago",
  },
  {
    id: "2",
    name: "api-gateway",
    fullName: "acme-corp/api-gateway",
    description: "High-performance API gateway with rate limiting",
    openIssues: 12,
    closedIssues: 89,
    stars: 876,
    language: "Go",
    lastUpdate: "5 hours ago",
  },
  {
    id: "3",
    name: "mobile-app",
    fullName: "acme-corp/mobile-app",
    description: "Cross-platform mobile application built with React Native",
    openIssues: 18,
    closedIssues: 234,
    stars: 2109,
    language: "JavaScript",
    lastUpdate: "1 day ago",
  },
  {
    id: "4",
    name: "ml-models",
    fullName: "acme-corp/ml-models",
    description: "Machine learning models for predictive analytics",
    openIssues: 7,
    closedIssues: 45,
    stars: 543,
    language: "Python",
    lastUpdate: "3 days ago",
  },
];

export const mockIssues: Issue[] = [
  {
    id: "1",
    number: 142,
    title: "Memory leak in data fetching hook",
    description: "When using the useDataFetch hook with polling enabled, memory consumption increases over time...",
    status: "open",
    priority: "high",
    labels: ["bug", "performance", "hooks"],
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      username: "sarahchen",
    },
    assignee: {
      name: "Mike Ross",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      username: "mikeross",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    comments: 8,
    aiInsight: {
      summary: "Memory leak caused by missing cleanup in useEffect. Polling interval not cleared on unmount.",
      suggestedFix: "Add cleanup function to clear interval in useEffect hook",
      complexity: "simple",
    },
  },
  {
    id: "2",
    number: 138,
    title: "Dashboard charts not rendering on Safari",
    description: "The recharts library seems to have compatibility issues with Safari 16+",
    status: "open",
    priority: "medium",
    labels: ["bug", "browser-compatibility", "ui"],
    author: {
      name: "Alex Kumar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      username: "alexk",
    },
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    comments: 5,
    aiInsight: {
      summary: "SVG rendering issue in Safari. Missing webkit-specific CSS properties.",
      complexity: "moderate",
    },
  },
  {
    id: "3",
    number: 135,
    title: "Add dark mode support to data table",
    description: "Feature request: Implement dark mode theming for the DataTable component",
    status: "open",
    priority: "low",
    labels: ["enhancement", "ui", "dark-mode"],
    author: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      username: "emmaw",
    },
    createdAt: "2024-01-13T11:00:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
    comments: 12,
    aiInsight: {
      summary: "Enhancement request for dark mode. Requires CSS variable updates and theme provider integration.",
      complexity: "simple",
    },
  },
  {
    id: "4",
    number: 129,
    title: "API rate limiting not working correctly",
    description: "The rate limiter allows more requests than configured limit",
    status: "open",
    priority: "critical",
    labels: ["bug", "backend", "security"],
    author: {
      name: "David Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      username: "davidp",
    },
    assignee: {
      name: "Rachel Green",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
      username: "rachelg",
    },
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-16T10:15:00Z",
    comments: 15,
    aiInsight: {
      summary: "Race condition in rate limiter middleware. Token bucket algorithm implementation flaw.",
      suggestedFix: "Implement atomic operations using Redis INCR with TTL",
      complexity: "complex",
    },
  },
  {
    id: "5",
    number: 125,
    title: "Improve error messages for validation",
    description: "Current validation error messages are not user-friendly",
    status: "open",
    priority: "low",
    labels: ["enhancement", "ux", "forms"],
    author: {
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      username: "lisaa",
    },
    createdAt: "2024-01-11T16:45:00Z",
    updatedAt: "2024-01-12T09:20:00Z",
    comments: 3,
  },
  {
    id: "6",
    number: 120,
    title: "Mobile responsive layout broken on tablet",
    description: "Layout breaks on iPad Pro and similar tablet devices",
    status: "open",
    priority: "medium",
    labels: ["bug", "responsive", "ui"],
    author: {
      name: "Tom Harris",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
      username: "tomh",
    },
    createdAt: "2024-01-10T13:30:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    comments: 7,
    aiInsight: {
      summary: "Media query breakpoint issue. Missing intermediate breakpoint for tablet devices.",
      complexity: "simple",
    },
  },
];

export const mockAITasks: AITask[] = [
  {
    id: "1",
    name: "Generate fix for issue #142",
    status: "completed",
    type: "fix",
    issueNumber: 142,
    timestamp: "2024-01-16T15:30:00Z",
    result: "Fix generated successfully. Added cleanup function to useDataFetch hook.",
  },
  {
    id: "2",
    name: "Summarize issue #138 discussion",
    status: "completed",
    type: "summary",
    issueNumber: 138,
    timestamp: "2024-01-16T14:15:00Z",
    result: "Issue involves Safari-specific SVG rendering problem. Team suggested using polyfill.",
  },
  {
    id: "3",
    name: "Analyze security implications of #129",
    status: "in-progress",
    type: "analysis",
    issueNumber: 129,
    timestamp: "2024-01-16T16:00:00Z",
  },
  {
    id: "4",
    name: "Explain architecture for #135",
    status: "pending",
    type: "explanation",
    issueNumber: 135,
    timestamp: "2024-01-16T16:10:00Z",
  },
];

export const mockComments = [
  {
    id: "c1",
    author: {
      name: "Mike Ross",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      username: "mikeross",
    },
    content: "I can reproduce this issue. The memory keeps growing even after navigating away from the component.",
    timestamp: "2024-01-15T11:00:00Z",
  },
  {
    id: "c2",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      username: "sarahchen",
    },
    content: "Looking at the code, I think the issue is in the polling logic. We're not clearing the interval properly.",
    timestamp: "2024-01-15T12:30:00Z",
  },
  {
    id: "c3",
    author: {
      name: "Alex Kumar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      username: "alexk",
    },
    content: "I've seen similar issues before. Adding a cleanup function in useEffect should fix it.",
    timestamp: "2024-01-15T14:15:00Z",
  },
];
