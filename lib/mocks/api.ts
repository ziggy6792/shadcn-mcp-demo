import { mockRepositories, mockIssues, mockAITasks, Repository, Issue, AITask } from './data';

// Simulated API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getRepositories(): Promise<Repository[]> {
    await delay();
    return mockRepositories;
  },

  async getRepository(name: string): Promise<Repository | undefined> {
    await delay();
    return mockRepositories.find(repo => repo.name === name);
  },

  async getIssues(repoName: string): Promise<Issue[]> {
    await delay();
    return mockIssues[repoName] || [];
  },

  async getIssue(repoName: string, issueNumber: number): Promise<Issue | undefined> {
    await delay();
    const issues = mockIssues[repoName] || [];
    return issues.find(issue => issue.number === issueNumber);
  },

  async getAITasks(): Promise<AITask[]> {
    await delay();
    return mockAITasks;
  },

  async createAITask(issueId: string, issueTitle: string, type: 'explain' | 'fix' | 'summarize'): Promise<AITask> {
    await delay(1000);
    const newTask: AITask = {
      id: `t${Date.now()}`,
      issueId,
      issueTitle,
      type,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    mockAITasks.push(newTask);

    // Simulate completion after 3 seconds
    setTimeout(() => {
      newTask.status = 'completed';
      newTask.result = `AI ${type} completed for issue: ${issueTitle}`;
    }, 3000);

    return newTask;
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: { name: string; email: string } }> {
    await delay();
    // Mock authentication - always succeeds for demo
    if (email && password) {
      return {
        success: true,
        user: {
          name: 'Demo User',
          email,
        },
      };
    }
    return { success: false };
  },

  async loginWithGithub(): Promise<{ success: boolean; user?: { name: string; email: string } }> {
    await delay(800);
    return {
      success: true,
      user: {
        name: 'Demo User',
        email: 'demo@example.com',
      },
    };
  },
};
