export type Repository = {
  name: string;
  openIssues: number;
  updatedAt: string;
};

export type IssueStatus = 'open' | 'closed';

export type IssueItem = {
  id: number;
  repo: string;
  title: string;
  status: IssueStatus;
  labels: string[];
  aiTagged: boolean;
};

export type AiTaskStatus = 'queued' | 'running' | 'done';

export type AiTask = {
  id: string;
  title: string;
  status: AiTaskStatus;
  progress: number;
};

