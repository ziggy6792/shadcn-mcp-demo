import type { AiTask, Comment, Issue, Repository } from './types';

export const repositories: Repository[] = [
  {
    name: 'issue-mind',
    fullName: 'acme/issue-mind',
    description: 'AI-powered GitHub issue assistant demo',
    stars: 1420,
    openIssues: 12,
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'demo-repo',
    fullName: 'acme/demo-repo',
    description: 'Sample repository for demos',
    stars: 218,
    openIssues: 5,
    updatedAt: new Date().toISOString(),
  },
];

export const issues: Issue[] = [
  {
    id: '1024',
    repoName: 'issue-mind',
    title: 'Bug: dark mode flicker on route change',
    body: 'Users report a brief flicker to light theme when navigating between pages in dark mode.',
    author: 'alice',
    labels: ['bug', 'ui'],
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
    aiPriority: 'high',
  },
  {
    id: '1025',
    repoName: 'issue-mind',
    title: 'Feature: add bulk label editing',
    body: 'Allow selecting multiple issues and applying labels in one action.',
    author: 'bob',
    labels: ['enhancement'],
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date().toISOString(),
    aiPriority: 'medium',
  },
];

export const comments: Comment[] = [
  {
    id: 'c1',
    issueId: '1024',
    author: 'charlie',
    body: 'I can reproduce this on Safari only.',
    createdAt: new Date().toISOString(),
  },
];

export const aiTasks: AiTask[] = [
  {
    id: 't1',
    name: 'Summarize repository issues',
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date().toISOString(),
    resultSummary: 'There are 2 key priorities: dark mode flicker and bulk labels.',
  },
  {
    id: 't2',
    name: 'Generate fix for dark mode flicker',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];
