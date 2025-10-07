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

