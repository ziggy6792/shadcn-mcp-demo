// Type definitions for IssueMind App

export interface Repository {
  id: string
  name: string
  owner: string
  description: string
  openIssues: number
  closedIssues: number
  stars: number
  language: string
}

export interface Issue {
  id: string
  number: number
  title: string
  description: string
  status: "open" | "closed"
  priority: "low" | "medium" | "high" | "critical"
  labels: string[]
  assignee?: string
  createdAt: Date
  updatedAt: Date
  comments: Comment[]
  aiTags?: string[]
}

export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: Date
}

export interface AITask {
  id: string
  name: string
  status: "pending" | "in-progress" | "completed" | "failed"
  progress?: number
  createdAt: Date
  completedAt?: Date
  result?: string
}

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  githubConnected: boolean
}

export interface AISuggestion {
  id: string
  type: "fix" | "explanation" | "related"
  title: string
  content: string
  confidence: number
}
