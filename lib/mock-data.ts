import { Repository, Issue, User, Comment, AITask, AIInsight } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    username: 'alicejohnson'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    username: 'bobsmith'
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    username: 'carolwhite'
  }
];

export const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'issuemind-core',
    owner: 'acme-corp',
    description: 'Core AI-powered issue tracking and resolution system',
    stars: 2450,
    openIssues: 23,
    closedIssues: 187,
    aiSuggestions: 15,
    lastActivity: '2 hours ago'
  },
  {
    id: 'repo-2',
    name: 'frontend-dashboard',
    owner: 'acme-corp',
    description: 'Modern React dashboard for issue management',
    stars: 890,
    openIssues: 12,
    closedIssues: 98,
    aiSuggestions: 8,
    lastActivity: '5 hours ago'
  },
  {
    id: 'repo-3',
    name: 'api-gateway',
    owner: 'acme-corp',
    description: 'Microservices API gateway with intelligent routing',
    stars: 1230,
    openIssues: 8,
    closedIssues: 142,
    aiSuggestions: 4,
    lastActivity: '1 day ago'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    author: mockUsers[1],
    content: 'I can reproduce this on the latest main branch. It seems to happen when the cache is invalidated.',
    createdAt: '2025-10-05T14:30:00Z'
  },
  {
    id: 'comment-2',
    author: mockUsers[0],
    content: 'Thanks for confirming. I\'ll look into the cache invalidation logic.',
    createdAt: '2025-10-05T15:45:00Z'
  },
  {
    id: 'comment-3',
    author: mockUsers[2],
    content: 'I have a potential fix. Will open a PR shortly.',
    createdAt: '2025-10-06T09:15:00Z'
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'issue-1',
    number: 142,
    title: 'Memory leak in background worker process',
    description: 'The background worker process gradually consumes more memory over time. After running for 24 hours, it uses over 4GB of RAM. The issue appears to be related to caching logic that doesn\'t properly clean up old entries.',
    status: 'open',
    priority: 'critical',
    labels: ['bug', 'performance', 'memory'],
    author: mockUsers[0],
    assignee: mockUsers[1],
    comments: mockComments,
    createdAt: '2025-10-04T10:20:00Z',
    updatedAt: '2025-10-06T09:15:00Z',
    aiScore: 9.2,
    aiTags: ['high-impact', 'needs-immediate-attention'],
    repository: 'issuemind-core'
  },
  {
    id: 'issue-2',
    number: 138,
    title: 'Dark mode toggle not persisting across sessions',
    description: 'When users toggle dark mode, the preference is not saved. Upon page reload, it reverts to the default light mode.',
    status: 'open',
    priority: 'medium',
    labels: ['bug', 'ui', 'enhancement'],
    author: mockUsers[1],
    assignee: mockUsers[2],
    comments: [],
    createdAt: '2025-10-03T08:45:00Z',
    updatedAt: '2025-10-05T16:30:00Z',
    aiScore: 6.5,
    aiTags: ['user-experience'],
    repository: 'frontend-dashboard'
  },
  {
    id: 'issue-3',
    number: 135,
    title: 'Add bulk issue assignment feature',
    description: 'Users need the ability to select multiple issues and assign them to a team member in one action.',
    status: 'in_progress',
    priority: 'medium',
    labels: ['enhancement', 'feature'],
    author: mockUsers[2],
    assignee: mockUsers[0],
    comments: [],
    createdAt: '2025-10-01T11:00:00Z',
    updatedAt: '2025-10-07T14:20:00Z',
    aiScore: 7.8,
    aiTags: ['productivity-boost'],
    repository: 'frontend-dashboard'
  },
  {
    id: 'issue-4',
    number: 89,
    title: 'API rate limiting too aggressive',
    description: 'The current rate limit of 100 requests per minute is causing issues for legitimate users.',
    status: 'open',
    priority: 'high',
    labels: ['bug', 'api', 'backend'],
    author: mockUsers[0],
    comments: [],
    createdAt: '2025-09-28T13:15:00Z',
    updatedAt: '2025-10-02T09:45:00Z',
    aiScore: 8.1,
    aiTags: ['api-stability'],
    repository: 'api-gateway'
  },
  {
    id: 'issue-5',
    number: 67,
    title: 'Documentation for webhooks is outdated',
    description: 'The webhook documentation doesn\'t reflect the latest API changes introduced in v2.3.',
    status: 'open',
    priority: 'low',
    labels: ['documentation'],
    author: mockUsers[1],
    comments: [],
    createdAt: '2025-09-20T10:30:00Z',
    updatedAt: '2025-09-25T14:00:00Z',
    aiScore: 4.2,
    aiTags: ['documentation'],
    repository: 'api-gateway'
  }
];

export const mockAITasks: AITask[] = [
  {
    id: 'task-1',
    name: 'Generate fix for issue #142',
    status: 'completed',
    createdAt: '2025-10-06T10:00:00Z',
    completedAt: '2025-10-06T10:15:00Z',
    issueId: 'issue-1',
    result: 'Fix generated successfully'
  },
  {
    id: 'task-2',
    name: 'Summarize discussion on issue #138',
    status: 'completed',
    createdAt: '2025-10-05T17:00:00Z',
    completedAt: '2025-10-05T17:02:00Z',
    issueId: 'issue-2',
    result: 'Summary: Users want dark mode preference to persist'
  },
  {
    id: 'task-3',
    name: 'Analyze impact of issue #89',
    status: 'pending',
    createdAt: '2025-10-07T09:30:00Z',
    issueId: 'issue-4'
  },
  {
    id: 'task-4',
    name: 'Generate test cases for bulk assignment',
    status: 'failed',
    createdAt: '2025-10-06T15:20:00Z',
    completedAt: '2025-10-06T15:25:00Z',
    issueId: 'issue-3',
    result: 'Failed: Insufficient context provided'
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-1',
    type: 'suggestion',
    content: 'Consider implementing a memory pool with automatic cleanup using WeakMap for cache entries.',
    confidence: 0.87,
    issueId: 'issue-1'
  },
  {
    id: 'insight-2',
    type: 'fix',
    content: `\`\`\`typescript
// Add to localStorage on theme change
localStorage.setItem('theme', theme);

// Read on app init
const savedTheme = localStorage.getItem('theme') || 'light';
\`\`\``,
    confidence: 0.95,
    issueId: 'issue-2'
  },
  {
    id: 'insight-3',
    type: 'explanation',
    content: 'This issue is caused by the worker process holding references to processed items in memory without clearing them. The cache grows unbounded over time.',
    confidence: 0.82,
    issueId: 'issue-1'
  }
];

export const currentUser: User = mockUsers[0];
