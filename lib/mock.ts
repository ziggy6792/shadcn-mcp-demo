import type { Repo, Issue, IssueDetail, AITask, PagedResult } from '@/lib/types';

function iso(date: Date): string {
  return date.toISOString();
}

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

export const repos: Repo[] = [
  {
    id: '1',
    name: 'issue-mind',
    fullName: 'simon/issue-mind',
    description: 'AI-assisted GitHub issue triage demo',
    stars: 128,
    language: 'TypeScript',
    openIssuesCount: 12,
    updatedAt: iso(yesterday),
  },
  {
    id: '2',
    name: 'ui-kit',
    fullName: 'simon/ui-kit',
    description: 'Shadcn-based component kit',
    stars: 342,
    language: 'TypeScript',
    openIssuesCount: 7,
    updatedAt: iso(lastWeek),
  },
];

export const issues: Issue[] = [
  {
    id: '101',
    repoId: '1',
    number: 101,
    title: 'Bug: filters not persisting between navigations',
    status: 'open',
    labels: ['bug', 'triage'],
    assignee: 'octocat',
    createdAt: iso(lastWeek),
    updatedAt: iso(yesterday),
    aiUrgency: 'high',
    aiSummary: 'State reset when route changes; store filters in URL or context.',
  },
  {
    id: '102',
    repoId: '1',
    number: 102,
    title: 'Feature: add keyboard shortcuts for issue actions',
    status: 'open',
    labels: ['feature', 'a11y'],
    createdAt: iso(lastWeek),
    updatedAt: iso(now),
    aiUrgency: 'medium',
    aiSummary: 'Map shortcuts for bulk close, label, assign via Command Palette.',
  },
  {
    id: '201',
    repoId: '2',
    number: 12,
    title: 'Docs: clarify Card usage with dark mode',
    status: 'closed',
    labels: ['docs'],
    createdAt: iso(lastWeek),
    updatedAt: iso(yesterday),
    aiUrgency: 'low',
    aiSummary: 'Add example showing foreground tokens and contrast guidance.',
  },
];

export const issueDetails: Record<string, IssueDetail> = {
  '101': {
    ...issues.find((i) => i.id === '101')!,
    bodyMarkdown: '# Filters not persisting\nWhen navigating back from detail to list, filters reset.\nExpected: filters persist in URL or shared state.\n',
    comments: [
      {
        id: 'c1',
        author: 'octocat',
        body: 'Can reproduce on Safari 17 as well.',
        createdAt: iso(yesterday),
      },
    ],
  },
  '102': {
    ...issues.find((i) => i.id === '102')!,
    bodyMarkdown: '# Keyboard shortcuts\nProvide shortcuts for common actions. Consider conflicts with browser defaults.',
    comments: [],
  },
  '201': {
    ...issues.find((i) => i.id === '201')!,
    bodyMarkdown: '# Docs: Card\nDocument theming tokens and dark mode examples.',
    comments: [],
  },
};

export const aiTasks: AITask[] = [
  {
    id: 't1',
    name: 'Auto-prioritize issues',
    status: 'in-progress',
    createdAt: iso(lastWeek),
  },
  {
    id: 't2',
    name: 'Summarize repo',
    status: 'pending',
    createdAt: iso(yesterday),
  },
  {
    id: 't3',
    name: 'Explain Issue #101',
    status: 'done',
    createdAt: iso(yesterday),
    updatedAt: iso(now),
  },
];

export function listRepos(): Repo[] {
  return repos;
}

export function listIssues(repoId: string): Issue[] {
  return issues.filter((i) => i.repoId === repoId);
}

export function getIssueDetail(issueId: string): IssueDetail | undefined {
  return issueDetails[issueId];
}

export function listAITasks(): AITask[] {
  return aiTasks;
}

export function paginate<T>(items: T[], page: number, pageSize: number): PagedResult<T> {
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { items: paged, total: items.length, page, pageSize };
}

import type { AiTask, IssueItem, Repository } from './types';

export const mockRepositories: Repository[] = [
  { name: 'demo-repo', openIssues: 12, updatedAt: '2h ago' },
  { name: 'alpha', openIssues: 4, updatedAt: '1d ago' },
];

export const mockIssues: IssueItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  repo: i % 2 ? 'alpha' : 'demo-repo',
  title: `Issue #${i + 1}`,
  status: i % 3 === 0 ? 'closed' : 'open',
  labels: i % 2 ? ['enhancement'] : ['bug'],
  aiTagged: i % 4 === 0,
}));

export const mockAiTasks: AiTask[] = [
  { id: 'T-101', title: 'Explain issue #12', status: 'done', progress: 100 },
  { id: 'T-102', title: 'Generate fix for #8', status: 'running', progress: 60 },
  { id: 'T-103', title: 'Summarize discussion #14', status: 'queued', progress: 0 },
];
