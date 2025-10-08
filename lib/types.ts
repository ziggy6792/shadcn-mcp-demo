export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: number;
  openIssues: number;
  closedIssues: number;
  aiSuggestions: number;
  lastActivity: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress';
  priority: 'low' | 'medium' | 'high' | 'critical';
  labels: string[];
  author: User;
  assignee?: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  aiScore?: number;
  aiTags?: string[];
  repository: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface AITask {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  issueId?: string;
  result?: string;
}

export interface AIInsight {
  id: string;
  type: 'suggestion' | 'fix' | 'explanation' | 'summary';
  content: string;
  confidence: number;
  issueId: string;
}
