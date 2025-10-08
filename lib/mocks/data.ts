export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  openIssues: number;
  closedIssues: number;
  activity: 'high' | 'medium' | 'low';
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  labels: string[];
  author: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  aiPriority: 'critical' | 'high' | 'medium' | 'low';
  aiTags: string[];
}

export interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface AITask {
  id: string;
  issueId: string;
  issueTitle: string;
  type: 'explain' | 'fix' | 'summarize';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  result?: string;
}

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-app',
    owner: 'acme-corp',
    description: 'Main React application for customer portal',
    openIssues: 23,
    closedIssues: 145,
    activity: 'high',
  },
  {
    id: '2',
    name: 'api-gateway',
    owner: 'acme-corp',
    description: 'Microservices API gateway',
    openIssues: 8,
    closedIssues: 67,
    activity: 'medium',
  },
  {
    id: '3',
    name: 'data-pipeline',
    owner: 'acme-corp',
    description: 'ETL and data processing pipeline',
    openIssues: 15,
    closedIssues: 89,
    activity: 'low',
  },
];

export const mockIssues: Record<string, Issue[]> = {
  'react-app': [
    {
      id: '1',
      number: 342,
      title: 'Button component not responding to click events on mobile',
      body: 'The primary button in the checkout flow is not triggering the onClick handler on iOS Safari. Works fine on desktop browsers.\n\n**Steps to reproduce:**\n1. Open app on iOS Safari\n2. Navigate to checkout\n3. Click primary button\n4. Nothing happens\n\n**Expected:** Button should proceed to payment\n**Actual:** No response',
      state: 'open',
      labels: ['bug', 'mobile', 'priority-high'],
      author: 'sarah_dev',
      assignee: 'john_mobile',
      createdAt: '2025-10-05T10:30:00Z',
      updatedAt: '2025-10-07T14:20:00Z',
      comments: [
        {
          id: 'c1',
          author: 'john_mobile',
          body: 'I can reproduce this. Seems like a touch event issue.',
          createdAt: '2025-10-06T09:15:00Z',
        },
        {
          id: 'c2',
          author: 'sarah_dev',
          body: 'Checked the CSS - might be a z-index problem with the overlay.',
          createdAt: '2025-10-07T14:20:00Z',
        },
      ],
      aiPriority: 'critical',
      aiTags: ['needs-repro', 'mobile-specific', 'checkout-blocker'],
    },
    {
      id: '2',
      number: 341,
      title: 'Memory leak in dashboard component',
      body: 'Dashboard component appears to have a memory leak when switching between tabs. Memory usage grows significantly over time.\n\n**Environment:**\n- Chrome 120\n- React 18.2\n- Dashboard component v2.3',
      state: 'open',
      labels: ['bug', 'performance'],
      author: 'mike_perf',
      createdAt: '2025-10-04T16:45:00Z',
      updatedAt: '2025-10-04T16:45:00Z',
      comments: [],
      aiPriority: 'high',
      aiTags: ['performance', 'needs-investigation'],
    },
    {
      id: '3',
      number: 340,
      title: 'Add dark mode support for data tables',
      body: 'Data tables need proper dark mode styling. Currently they look washed out in dark mode.',
      state: 'open',
      labels: ['enhancement', 'ui'],
      author: 'lisa_design',
      assignee: 'tom_frontend',
      createdAt: '2025-10-03T11:20:00Z',
      updatedAt: '2025-10-05T08:30:00Z',
      comments: [
        {
          id: 'c3',
          author: 'tom_frontend',
          body: 'I can work on this. Should be straightforward.',
          createdAt: '2025-10-05T08:30:00Z',
        },
      ],
      aiPriority: 'medium',
      aiTags: ['ui-enhancement', 'good-first-issue'],
    },
    {
      id: '4',
      number: 339,
      title: 'Upgrade React Router to v6',
      body: 'We need to upgrade from React Router v5 to v6 for better performance and new features.',
      state: 'open',
      labels: ['enhancement', 'dependencies'],
      author: 'alex_lead',
      createdAt: '2025-10-02T09:00:00Z',
      updatedAt: '2025-10-02T09:00:00Z',
      comments: [],
      aiPriority: 'low',
      aiTags: ['upgrade', 'breaking-change'],
    },
  ],
  'api-gateway': [
    {
      id: '5',
      number: 125,
      title: 'Rate limiting not working for authenticated requests',
      body: 'Rate limiting middleware bypasses authenticated requests, causing potential abuse.',
      state: 'open',
      labels: ['bug', 'security'],
      author: 'security_team',
      assignee: 'backend_lead',
      createdAt: '2025-10-06T13:30:00Z',
      updatedAt: '2025-10-07T10:15:00Z',
      comments: [],
      aiPriority: 'critical',
      aiTags: ['security', 'rate-limiting'],
    },
  ],
  'data-pipeline': [
    {
      id: '6',
      number: 89,
      title: 'ETL job fails on large datasets',
      body: 'The nightly ETL job times out when processing datasets larger than 10GB.',
      state: 'open',
      labels: ['bug', 'performance'],
      author: 'data_eng',
      createdAt: '2025-10-05T07:20:00Z',
      updatedAt: '2025-10-05T07:20:00Z',
      comments: [],
      aiPriority: 'high',
      aiTags: ['performance', 'scalability'],
    },
  ],
};

export const mockAITasks: AITask[] = [
  {
    id: 't1',
    issueId: '1',
    issueTitle: 'Button component not responding to click events on mobile',
    type: 'explain',
    status: 'completed',
    createdAt: '2025-10-07T15:30:00Z',
    result: 'This issue is caused by a touch event handling conflict. The button likely has an overlay element preventing touch events from reaching the click handler.',
  },
  {
    id: 't2',
    issueId: '2',
    issueTitle: 'Memory leak in dashboard component',
    type: 'fix',
    status: 'pending',
    createdAt: '2025-10-08T09:15:00Z',
  },
];
