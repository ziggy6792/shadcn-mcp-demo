export type IssueStatus = 'open' | 'closed';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

export interface Repository {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  openIssues: number;
  updatedAt: string;
}

export interface Issue {
  id: string;
  repoName: string;
  title: string;
  body: string;
  author: string;
  labels: string[];
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
  aiPriority: IssuePriority;
}

export interface Comment {
  id: string;
  issueId: string;
  author: string;
  body: string;
  createdAt: string;
}

export type AiTaskStatus = 'pending' | 'completed' | 'failed';

export interface AiTask {
  id: string;
  name: string;
  status: AiTaskStatus;
  createdAt: string;
  updatedAt?: string;
  resultSummary?: string;
}
