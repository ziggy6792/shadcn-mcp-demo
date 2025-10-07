export interface Repository {
  id: string
  name: string
  owner: string
  fullName: string
  description: string
  openIssues: number
  closedIssues: number
  stars: number
  language: string
  updatedAt: string
}

export interface Issue {
  id: string
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  labels: Label[]
  author: User
  assignee?: User
  createdAt: string
  updatedAt: string
  comments: Comment[]
  aiPriority?: 'low' | 'medium' | 'high' | 'urgent'
  aiSummary?: string
  aiTags?: string[]
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface User {
  id: string
  username: string
  avatar: string
  name: string
}

export interface Comment {
  id: string
  author: User
  body: string
  createdAt: string
}

export interface AITask {
  id: string
  type: 'explain' | 'summarize' | 'fix' | 'batch'
  issueId?: string
  issueTitle?: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  result?: string
}

export interface AIFix {
  id: string
  issueId: string
  description: string
  diff: string
  files: string[]
}
