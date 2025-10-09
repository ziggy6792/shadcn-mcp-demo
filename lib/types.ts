export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  openIssuesCount: number;
  closedIssuesCount: number;
  stars: number;
  language: string;
  lastActivity: Date;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  labels: Label[];
  author: User;
  assignees: User[];
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  aiPriority?: 'low' | 'medium' | 'high' | 'critical';
  aiTags?: string[];
  aiSummary?: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  name: string;
}

export interface Comment {
  id: string;
  author: User;
  body: string;
  createdAt: Date;
}

export interface AITask {
  id: string;
  type: 'summarize' | 'explain' | 'fix' | 'analyze';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  title: string;
  createdAt: Date;
  completedAt?: Date;
  result?: string;
  issueId?: string;
  repoId?: string;
}

export interface AIFix {
  id: string;
  issueId: string;
  code: string;
  diff: string;
  explanation: string;
  files: string[];
}
