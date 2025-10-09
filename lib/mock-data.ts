import { Repository, Issue, User, Label, Comment, AITask, AIFix } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alexdev',
    name: 'Alex Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: '2',
    username: 'sarahcode',
    name: 'Sarah Coder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '3',
    username: 'mikebug',
    name: 'Mike Bugfixer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  },
  {
    id: '4',
    username: 'jennyai',
    name: 'Jenny AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny',
  },
];

export const mockLabels: Label[] = [
  { id: '1', name: 'bug', color: '#d73a4a' },
  { id: '2', name: 'enhancement', color: '#a2eeef' },
  { id: '3', name: 'documentation', color: '#0075ca' },
  { id: '4', name: 'good first issue', color: '#7057ff' },
  { id: '5', name: 'help wanted', color: '#008672' },
  { id: '6', name: 'priority: high', color: '#e11d48' },
  { id: '7', name: 'priority: medium', color: '#f59e0b' },
  { id: '8', name: 'needs reproduction', color: '#fbbf24' },
];

export const mockRepositories: Repository[] = [
  {
    id: 'repo1',
    name: 'awesome-app',
    fullName: 'acme-corp/awesome-app',
    description: 'An awesome full-stack application with AI features',
    openIssuesCount: 47,
    closedIssuesCount: 234,
    stars: 1243,
    language: 'TypeScript',
    lastActivity: new Date('2025-10-08'),
  },
  {
    id: 'repo2',
    name: 'ml-toolkit',
    fullName: 'acme-corp/ml-toolkit',
    description: 'Machine learning utilities and helpers',
    openIssuesCount: 23,
    closedIssuesCount: 156,
    stars: 867,
    language: 'Python',
    lastActivity: new Date('2025-10-07'),
  },
  {
    id: 'repo3',
    name: 'react-components',
    fullName: 'acme-corp/react-components',
    description: 'Reusable React component library',
    openIssuesCount: 12,
    closedIssuesCount: 89,
    stars: 456,
    language: 'TypeScript',
    lastActivity: new Date('2025-10-09'),
  },
];

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    author: mockUsers[1],
    body: 'I can reproduce this issue. It happens when the user input exceeds 255 characters.',
    createdAt: new Date('2025-10-07T10:30:00'),
  },
  {
    id: 'comment2',
    author: mockUsers[2],
    body: 'I think the problem is in the validation logic. Let me investigate.',
    createdAt: new Date('2025-10-07T14:20:00'),
  },
  {
    id: 'comment3',
    author: mockUsers[0],
    body: 'Thanks for looking into this! I noticed it also fails on Safari.',
    createdAt: new Date('2025-10-08T09:15:00'),
  },
];

export const mockIssues: Issue[] = [
  {
    id: 'issue1',
    number: 342,
    title: 'Form validation fails for long input strings',
    body: `## Description
When users enter text longer than 255 characters in the main input field, the validation breaks and shows an incorrect error message.

## Steps to Reproduce
1. Navigate to the form page
2. Enter more than 255 characters
3. Submit the form
4. See the error

## Expected Behavior
The form should either accept the input or show a proper character limit message.

## Actual Behavior
An uncaught exception is thrown and the app crashes.

## Environment
- Browser: Chrome 120
- OS: macOS Sonoma
- Version: 2.3.1`,
    state: 'open',
    labels: [mockLabels[0], mockLabels[5]],
    author: mockUsers[0],
    assignees: [mockUsers[2]],
    createdAt: new Date('2025-10-06T08:00:00'),
    updatedAt: new Date('2025-10-08T09:15:00'),
    comments: mockComments,
    aiPriority: 'high',
    aiTags: ['needs fix', 'user-facing', 'data validation'],
    aiSummary: 'Form validation fails when input exceeds 255 characters, causing app crash. Affects user experience on main form.',
  },
  {
    id: 'issue2',
    number: 341,
    title: 'Add dark mode support to dashboard',
    body: `## Feature Request
It would be great to have a dark mode option for the dashboard to reduce eye strain during late-night coding sessions.

## Proposed Solution
Add a theme toggle button in the header and implement CSS variables for light/dark themes.

## Alternatives Considered
Using a third-party theme library, but custom solution would be more lightweight.`,
    state: 'open',
    labels: [mockLabels[1], mockLabels[4]],
    author: mockUsers[1],
    assignees: [],
    createdAt: new Date('2025-10-05T14:30:00'),
    updatedAt: new Date('2025-10-05T14:30:00'),
    comments: [],
    aiPriority: 'medium',
    aiTags: ['ui/ux', 'enhancement'],
    aiSummary: 'User requesting dark mode implementation for better accessibility during extended use.',
  },
  {
    id: 'issue3',
    number: 340,
    title: 'API rate limiting not working correctly',
    body: `## Bug Report
The API rate limiting middleware is not correctly tracking request counts. Users can exceed the limit without being blocked.

## Impact
This could lead to abuse and increased server costs.

## Technical Details
The Redis cache key might not be properly formatted, causing each request to be treated as unique.`,
    state: 'open',
    labels: [mockLabels[0], mockLabels[5]],
    author: mockUsers[3],
    assignees: [mockUsers[0]],
    createdAt: new Date('2025-10-04T11:00:00'),
    updatedAt: new Date('2025-10-04T11:00:00'),
    comments: [],
    aiPriority: 'critical',
    aiTags: ['security', 'backend', 'performance'],
    aiSummary: 'Critical security issue: rate limiting bypass allows unlimited API requests, potential cost impact.',
  },
  {
    id: 'issue4',
    number: 339,
    title: 'Update documentation for new authentication flow',
    body: `## Documentation Update
The docs need to be updated to reflect the new OAuth 2.0 authentication flow implemented in v2.3.0.

## Sections to Update
- Getting Started
- Authentication Guide
- API Reference`,
    state: 'open',
    labels: [mockLabels[2], mockLabels[3]],
    author: mockUsers[2],
    assignees: [],
    createdAt: new Date('2025-10-03T16:45:00'),
    updatedAt: new Date('2025-10-03T16:45:00'),
    comments: [],
    aiPriority: 'low',
    aiTags: ['documentation', 'maintenance'],
    aiSummary: 'Documentation needs update for new OAuth 2.0 flow. Good first issue for contributors.',
  },
];

export const mockAITasks: AITask[] = [
  {
    id: 'task1',
    type: 'fix',
    status: 'completed',
    title: 'Generate fix for issue #342',
    createdAt: new Date('2025-10-08T10:00:00'),
    completedAt: new Date('2025-10-08T10:05:00'),
    result: 'Fix generated successfully',
    issueId: 'issue1',
    repoId: 'repo1',
  },
  {
    id: 'task2',
    type: 'summarize',
    status: 'completed',
    title: 'Summarize discussion for issue #341',
    createdAt: new Date('2025-10-08T09:30:00'),
    completedAt: new Date('2025-10-08T09:31:00'),
    result: 'Summary generated',
    issueId: 'issue2',
    repoId: 'repo1',
  },
  {
    id: 'task3',
    type: 'analyze',
    status: 'in_progress',
    title: 'Analyze repository issue trends',
    createdAt: new Date('2025-10-09T08:00:00'),
    repoId: 'repo1',
  },
  {
    id: 'task4',
    type: 'explain',
    status: 'pending',
    title: 'Explain issue #340 technical details',
    createdAt: new Date('2025-10-09T09:15:00'),
    issueId: 'issue3',
    repoId: 'repo1',
  },
];

export const mockAIFixes: AIFix[] = [
  {
    id: 'fix1',
    issueId: 'issue1',
    code: `// Updated validation function
export function validateInput(value: string): ValidationResult {
  const maxLength = 1000; // Increased from 255

  if (value.length > maxLength) {
    return {
      valid: false,
      error: \`Input must be less than \${maxLength} characters. Current: \${value.length}\`
    };
  }

  return { valid: true };
}`,
    diff: `@@ -1,8 +1,12 @@
 export function validateInput(value: string): ValidationResult {
-  const maxLength = 255;
+  const maxLength = 1000; // Increased from 255

-  if (value.length > maxLength) {
-    throw new Error('Input too long');
+  if (value.length > maxLength) {
+    return {
+      valid: false,
+      error: \`Input must be less than \${maxLength} characters. Current: \${value.length}\`
+    };
   }

-  return true;
+  return { valid: true };
 }`,
    explanation: 'This fix addresses the validation issue by: 1) Increasing the max length to 1000 characters, 2) Returning a proper error object instead of throwing an exception, 3) Providing clear error messages with actual character counts.',
    files: ['src/utils/validation.ts'],
  },
];

// Helper functions
export function getRepositoryById(id: string): Repository | undefined {
  return mockRepositories.find(repo => repo.id === id);
}

export function getIssuesByRepoId(repoId: string): Issue[] {
  // In a real app, this would filter by repo
  return mockIssues;
}

export function getIssueById(id: string): Issue | undefined {
  return mockIssues.find(issue => issue.id === id);
}

export function getAITasksByRepoId(repoId: string): AITask[] {
  return mockAITasks.filter(task => task.repoId === repoId);
}

export function getAIFixByIssueId(issueId: string): AIFix | undefined {
  return mockAIFixes.find(fix => fix.issueId === issueId);
}
