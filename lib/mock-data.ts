import { Repository, Issue, User, AITask, Label, Comment } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  {
    id: '2',
    username: 'janesmit',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  },
  {
    id: '3',
    username: 'alexchen',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  },
]

export const mockLabels: Label[] = [
  { id: '1', name: 'bug', color: 'ef4444' },
  { id: '2', name: 'feature', color: '3b82f6' },
  { id: '3', name: 'documentation', color: '8b5cf6' },
  { id: '4', name: 'enhancement', color: '10b981' },
  { id: '5', name: 'needs-repro', color: 'f59e0b' },
  { id: '6', name: 'critical', color: 'dc2626' },
]

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-dashboard',
    owner: 'acme-corp',
    fullName: 'acme-corp/react-dashboard',
    description: 'A modern dashboard built with React and TypeScript',
    openIssues: 24,
    closedIssues: 156,
    stars: 1234,
    language: 'TypeScript',
    updatedAt: '2025-01-06T10:30:00Z',
  },
  {
    id: '2',
    name: 'api-gateway',
    owner: 'acme-corp',
    fullName: 'acme-corp/api-gateway',
    description: 'Microservices API gateway with authentication',
    openIssues: 12,
    closedIssues: 89,
    stars: 567,
    language: 'Go',
    updatedAt: '2025-01-05T14:20:00Z',
  },
  {
    id: '3',
    name: 'mobile-app',
    owner: 'acme-corp',
    fullName: 'acme-corp/mobile-app',
    description: 'Cross-platform mobile application',
    openIssues: 8,
    closedIssues: 43,
    stars: 890,
    language: 'Dart',
    updatedAt: '2025-01-04T09:15:00Z',
  },
]

const mockComments: Comment[] = [
  {
    id: 'c1',
    author: mockUsers[1],
    body: 'I can reproduce this issue on my local environment. The error occurs when...',
    createdAt: '2025-01-05T12:00:00Z',
  },
  {
    id: 'c2',
    author: mockUsers[2],
    body: 'Looking into this now. Will have a fix ready soon.',
    createdAt: '2025-01-05T14:30:00Z',
  },
]

export const mockIssues: Record<string, Issue[]> = {
  '1': [
    {
      id: 'i1',
      number: 245,
      title: 'Dashboard crashes when loading large datasets',
      body: 'When loading datasets with more than 10,000 rows, the dashboard becomes unresponsive and eventually crashes. This is a critical issue affecting production users.\n\n**Steps to reproduce:**\n1. Navigate to dashboard\n2. Load dataset with >10k rows\n3. Observe browser becoming unresponsive\n\n**Expected behavior:** Dashboard should handle large datasets gracefully.',
      state: 'open',
      labels: [mockLabels[0], mockLabels[5]],
      author: mockUsers[0],
      assignee: mockUsers[2],
      createdAt: '2025-01-04T08:00:00Z',
      updatedAt: '2025-01-05T14:30:00Z',
      comments: mockComments,
      aiPriority: 'urgent',
      aiSummary: 'Critical performance issue with large dataset rendering. Likely caused by inefficient React rendering. Recommend implementing virtualization.',
      aiTags: ['performance', 'critical', 'needs-optimization'],
    },
    {
      id: 'i2',
      number: 244,
      title: 'Add dark mode toggle to user settings',
      body: 'Users have requested the ability to toggle between light and dark modes. This should be accessible from the user settings page and persist across sessions.',
      state: 'open',
      labels: [mockLabels[1], mockLabels[3]],
      author: mockUsers[1],
      createdAt: '2025-01-03T15:20:00Z',
      updatedAt: '2025-01-03T15:20:00Z',
      comments: [],
      aiPriority: 'medium',
      aiSummary: 'Feature request for dark mode. Requires theme provider setup and UI toggle component.',
      aiTags: ['ui', 'enhancement', 'easy-win'],
    },
    {
      id: 'i3',
      number: 243,
      title: 'Update installation documentation',
      body: 'The current installation docs are outdated. Need to update for latest version and include Docker setup instructions.',
      state: 'open',
      labels: [mockLabels[2]],
      author: mockUsers[0],
      createdAt: '2025-01-02T10:00:00Z',
      updatedAt: '2025-01-02T10:00:00Z',
      comments: [],
      aiPriority: 'low',
      aiSummary: 'Documentation update required. Non-urgent but improves developer experience.',
      aiTags: ['docs', 'good-first-issue'],
    },
    {
      id: 'i4',
      number: 242,
      title: 'Chart tooltips not showing correct values',
      body: 'When hovering over data points in the charts, tooltips display incorrect values. The issue seems to be related to data formatting.',
      state: 'open',
      labels: [mockLabels[0], mockLabels[4]],
      author: mockUsers[2],
      createdAt: '2025-01-01T14:30:00Z',
      updatedAt: '2025-01-01T14:30:00Z',
      comments: [],
      aiPriority: 'high',
      aiSummary: 'Bug in chart tooltip rendering. Needs investigation of data pipeline and formatting logic.',
      aiTags: ['bug', 'charts', 'needs-repro'],
    },
  ],
  '2': [
    {
      id: 'i5',
      number: 112,
      title: 'Rate limiting not working correctly',
      body: 'API rate limiting allows more requests than configured. Security concern.',
      state: 'open',
      labels: [mockLabels[0], mockLabels[5]],
      author: mockUsers[1],
      assignee: mockUsers[0],
      createdAt: '2025-01-05T09:00:00Z',
      updatedAt: '2025-01-05T09:00:00Z',
      comments: [],
      aiPriority: 'urgent',
      aiSummary: 'Critical security issue with rate limiting. Immediate fix required.',
      aiTags: ['security', 'critical', 'rate-limiting'],
    },
    {
      id: 'i6',
      number: 111,
      title: 'Add health check endpoint',
      body: 'Need a /health endpoint for monitoring and load balancer checks.',
      state: 'open',
      labels: [mockLabels[1]],
      author: mockUsers[2],
      createdAt: '2025-01-03T11:00:00Z',
      updatedAt: '2025-01-03T11:00:00Z',
      comments: [],
      aiPriority: 'medium',
      aiSummary: 'Standard feature addition for production monitoring.',
      aiTags: ['infrastructure', 'monitoring'],
    },
  ],
  '3': [
    {
      id: 'i7',
      number: 45,
      title: 'App crashes on iOS 16 when using camera',
      body: 'The camera feature causes the app to crash on iOS 16 devices.',
      state: 'open',
      labels: [mockLabels[0], mockLabels[5]],
      author: mockUsers[0],
      createdAt: '2025-01-04T16:00:00Z',
      updatedAt: '2025-01-04T16:00:00Z',
      comments: [],
      aiPriority: 'high',
      aiSummary: 'Platform-specific crash. Requires iOS 16 testing and compatibility fix.',
      aiTags: ['ios', 'crash', 'camera'],
    },
  ],
}

export const mockAITasks: AITask[] = [
  {
    id: 'at1',
    type: 'fix',
    issueId: 'i1',
    issueTitle: 'Dashboard crashes when loading large datasets',
    status: 'completed',
    createdAt: '2025-01-05T15:00:00Z',
    result: 'Generated fix implementing react-window for virtualization',
  },
  {
    id: 'at2',
    type: 'explain',
    issueId: 'i4',
    issueTitle: 'Chart tooltips not showing correct values',
    status: 'completed',
    createdAt: '2025-01-05T13:00:00Z',
    result: 'Detailed explanation of data formatting pipeline',
  },
  {
    id: 'at3',
    type: 'summarize',
    issueId: 'i2',
    issueTitle: 'Add dark mode toggle to user settings',
    status: 'pending',
    createdAt: '2025-01-05T16:00:00Z',
  },
  {
    id: 'at4',
    type: 'batch',
    status: 'failed',
    createdAt: '2025-01-04T10:00:00Z',
    result: 'Error: Unable to process batch request',
  },
]

export const mockAIFix = `diff --git a/components/Dashboard.tsx b/components/Dashboard.tsx
index 1234567..abcdefg 100644
--- a/components/Dashboard.tsx
+++ b/components/Dashboard.tsx
@@ -1,5 +1,6 @@
 import React from 'react'
+import { FixedSizeList } from 'react-window'

-export function Dashboard({ data }: { data: any[] }) {
+export function Dashboard({ data }: { data: DataRow[] }) {
   return (
     <div className="dashboard">
-      {data.map((row, i) => (
-        <div key={i}>{row.name}</div>
-      ))}
+      <FixedSizeList
+        height={600}
+        itemCount={data.length}
+        itemSize={50}
+        width="100%"
+      >
+        {({ index, style }) => (
+          <div style={style}>{data[index].name}</div>
+        )}
+      </FixedSizeList>
     </div>
   )
 }`

// Simple in-memory state management
export let currentUser: User = mockUsers[0]
export let currentRepository: Repository | null = null

export function setCurrentUser(user: User) {
  currentUser = user
}

export function setCurrentRepository(repo: Repository | null) {
  currentRepository = repo
}
