export type Repo = {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  stars: number;
  language?: string;
  openIssuesCount: number;
  updatedAt: string; // ISO string
};

export type IssueStatus = 'open' | 'closed';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

export type Issue = {
  id: string;
  repoId: string;
  number: number;
  title: string;
  status: IssueStatus;
  labels: string[];
  assignee?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  aiUrgency?: IssuePriority;
  aiSummary?: string;
};

export type IssueDetail = Issue & {
  bodyMarkdown: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  body: string;
  createdAt: string; // ISO
};

export type AITaskStatus = 'pending' | 'in-progress' | 'done' | 'failed';

export type AITask = {
  id: string;
  name: string;
  status: AITaskStatus;
  createdAt: string; // ISO
  updatedAt?: string; // ISO
};

export type AIActionKind = 'summarize-repo' | 'auto-prioritize-issues' | 'explain-issue' | 'generate-fix';

export type RepoWithIssues = Repo & {
  issues: Issue[];
};

export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

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
