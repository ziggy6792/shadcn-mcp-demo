export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  githubUsername?: string;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  openIssues: number;
  closedIssues: number;
  lastActivity: string;
  owner: string;
  stars: number;
  language: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  status: 'open' | 'closed';
  labels: Label[];
  author: {
    name: string;
    avatar: string;
  };
  assignees: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  aiPriority?: 'low' | 'medium' | 'high' | 'urgent';
  aiTags?: string[];
  repository: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  body: string;
  createdAt: string;
}

export interface AITask {
  id: string;
  type: 'summary' | 'fix' | 'explain' | 'related';
  status: 'pending' | 'completed' | 'failed';
  issueId: string;
  issueTitle: string;
  repository: string;
  createdAt: string;
  completedAt?: string;
  result?: AITaskResult;
}

export interface AITaskResult {
  summary?: string;
  fix?: {
    description: string;
    diff: string;
    files: string[];
  };
  explanation?: string;
  relatedIssues?: {
    id: string;
    title: string;
    similarity: number;
  }[];
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  layoutDensity: 'comfortable' | 'compact';
  defaultRepoView: 'list' | 'grid';
  githubConnected: boolean;
  experimentalFeatures: {
    autoLabeling: boolean;
    autoSummary: boolean;
  };
}
