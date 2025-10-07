import { Repository, Issue, AITask, User, Comment, Label } from './types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Developer',
  email: 'alex@example.com',
  avatar: '/avatars/01.png',
  githubUsername: 'alexdev',
};

export const mockLabels: Label[] = [
  { id: '1', name: 'bug', color: '#d73a4a' },
  { id: '2', name: 'enhancement', color: '#a2eeef' },
  { id: '3', name: 'documentation', color: '#0075ca' },
  { id: '4', name: 'help wanted', color: '#008672' },
  { id: '5', name: 'good first issue', color: '#7057ff' },
];

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'frontend-app',
    fullName: 'acme-corp/frontend-app',
    description: 'Main frontend application built with React and TypeScript',
    openIssues: 24,
    closedIssues: 156,
    lastActivity: '2 hours ago',
    owner: 'acme-corp',
    stars: 342,
    language: 'TypeScript',
  },
  {
    id: '2',
    name: 'api-service',
    fullName: 'acme-corp/api-service',
    description: 'RESTful API service with Node.js and Express',
    openIssues: 12,
    closedIssues: 89,
    lastActivity: '5 hours ago',
    owner: 'acme-corp',
    stars: 189,
    language: 'JavaScript',
  },
  {
    id: '3',
    name: 'design-system',
    fullName: 'acme-corp/design-system',
    description: 'Company-wide design system and component library',
    openIssues: 8,
    closedIssues: 45,
    lastActivity: '1 day ago',
    owner: 'acme-corp',
    stars: 567,
    language: 'TypeScript',
  },
];

const sampleComments: Comment[] = [
  {
    id: 'c1',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/02.png',
    },
    body: 'I can reproduce this issue on the latest version. It seems to happen when the user navigates quickly between pages.',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'c2',
    author: {
      name: 'Mike Johnson',
      avatar: '/avatars/03.png',
    },
    body: 'Looking into this. It might be related to the state management refactor we did last week.',
    createdAt: '2024-01-15T14:20:00Z',
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    number: 142,
    title: 'Login form validation not working on Safari',
    body: `## Description
The login form validation appears to work fine on Chrome and Firefox, but fails silently on Safari. Users can submit invalid email addresses without any error messages.

## Steps to Reproduce
1. Open the login page on Safari
2. Enter an invalid email address (e.g., "notanemail")
3. Click submit
4. No validation error appears

## Expected Behavior
Should show a validation error message like on other browsers.

## Environment
- Browser: Safari 17.2
- OS: macOS Sonoma
- Version: 2.4.1`,
    status: 'open',
    labels: [mockLabels[0], mockLabels[3]],
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/04.png',
    },
    assignees: ['Sarah Chen'],
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    comments: sampleComments,
    aiPriority: 'high',
    aiTags: ['browser-compatibility', 'validation'],
    repository: 'frontend-app',
  },
  {
    id: '2',
    number: 138,
    title: 'Add dark mode support for dashboard',
    body: `## Feature Request
Users have been requesting dark mode support for the main dashboard. This would improve usability during nighttime hours and reduce eye strain.

## Proposed Solution
- Use CSS variables for theme switching
- Add a toggle in the user menu
- Persist preference in localStorage
- Follow system preference by default

## Additional Context
We already have dark mode working on the settings page, so we can reuse that implementation.`,
    status: 'open',
    labels: [mockLabels[1]],
    author: {
      name: 'Chris Martin',
      avatar: '/avatars/05.png',
    },
    assignees: [],
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T11:20:00Z',
    comments: [],
    aiPriority: 'medium',
    aiTags: ['feature-request', 'ui-ux'],
    repository: 'frontend-app',
  },
  {
    id: '3',
    number: 135,
    title: 'API endpoint returning 500 error for user profile updates',
    body: `## Bug Report
When attempting to update user profile information, the API returns a 500 Internal Server Error.

## Error Details
\`\`\`
POST /api/users/profile
Status: 500
Response: {"error": "Internal Server Error"}
\`\`\`

## Request Body
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

This started happening after the database migration last night.`,
    status: 'open',
    labels: [mockLabels[0]],
    author: {
      name: 'Alex Developer',
      avatar: '/avatars/01.png',
    },
    assignees: ['Mike Johnson'],
    createdAt: '2024-01-08T16:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    comments: [
      {
        id: 'c3',
        author: {
          name: 'Mike Johnson',
          avatar: '/avatars/03.png',
        },
        body: 'Found the issue - the migration script missed a column. Working on a fix.',
        createdAt: '2024-01-15T09:30:00Z',
      },
    ],
    aiPriority: 'urgent',
    aiTags: ['backend', 'database', 'needs-hotfix'],
    repository: 'api-service',
  },
  {
    id: '4',
    number: 67,
    title: 'Update button component documentation',
    body: `## Documentation Task
The Button component documentation is outdated and missing several new props that were added in v2.0.

## Missing Documentation
- \`variant\` prop options
- \`size\` prop examples
- Accessibility features
- Usage examples with icons

Please update the docs to include these.`,
    status: 'open',
    labels: [mockLabels[2], mockLabels[4]],
    author: {
      name: 'Lisa Anderson',
      avatar: '/avatars/06.png',
    },
    assignees: [],
    createdAt: '2024-01-05T10:15:00Z',
    updatedAt: '2024-01-07T14:00:00Z',
    comments: [],
    aiPriority: 'low',
    aiTags: ['documentation'],
    repository: 'design-system',
  },
];

export const mockAITasks: AITask[] = [
  {
    id: 't1',
    type: 'fix',
    status: 'completed',
    issueId: '1',
    issueTitle: 'Login form validation not working on Safari',
    repository: 'frontend-app',
    createdAt: '2024-01-15T17:00:00Z',
    completedAt: '2024-01-15T17:02:30Z',
    result: {
      fix: {
        description: 'Add Safari-specific validation polyfill and update form validation logic',
        diff: `--- a/components/LoginForm.tsx
+++ b/components/LoginForm.tsx
@@ -1,6 +1,7 @@
 import { useState } from 'react';
+import { validateEmail } from '@/lib/validation';

 export function LoginForm() {
   const [email, setEmail] = useState('');
+  const [error, setError] = useState('');

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
+
+    if (!validateEmail(email)) {
+      setError('Please enter a valid email address');
+      return;
+    }
+
     // Submit logic
   };`,
        files: ['components/LoginForm.tsx', 'lib/validation.ts'],
      },
    },
  },
  {
    id: 't2',
    type: 'summary',
    status: 'pending',
    issueId: '3',
    issueTitle: 'API endpoint returning 500 error',
    repository: 'api-service',
    createdAt: '2024-01-15T17:30:00Z',
  },
];

export async function mockDelay(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRepositoryById(id: string): Repository | undefined {
  return mockRepositories.find((repo) => repo.id === id);
}

export function getRepositoryByName(name: string): Repository | undefined {
  return mockRepositories.find((repo) => repo.name === name);
}

export function getIssuesByRepository(repoName: string): Issue[] {
  return mockIssues.filter((issue) => issue.repository === repoName);
}

export function getIssueById(id: string): Issue | undefined {
  return mockIssues.find((issue) => issue.id === id);
}

export function getAITasksByRepository(repoName: string): AITask[] {
  return mockAITasks.filter((task) => task.repository === repoName);
}
