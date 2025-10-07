'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAITasks } from '@/lib/mock-data';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Code,
  MessageSquare,
  GitBranch,
  Loader2,
} from 'lucide-react';
import { AITask } from '@/lib/types';

const taskTypeIcons = {
  summary: MessageSquare,
  fix: Code,
  explain: FileText,
  related: GitBranch,
};

const taskTypeLabels = {
  summary: 'Summary',
  fix: 'Fix Generation',
  explain: 'Explanation',
  related: 'Related Issues',
};

const statusColors = {
  pending: 'bg-yellow-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
};

const statusIcons = {
  pending: Clock,
  completed: CheckCircle2,
  failed: AlertCircle,
};

export default function AITasksPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Add more mock tasks for demo
  const [tasks] = useState<AITask[]>([
    ...mockAITasks,
    {
      id: 't3',
      type: 'explain',
      status: 'completed',
      issueId: '2',
      issueTitle: 'Add dark mode support for dashboard',
      repository: 'frontend-app',
      createdAt: '2024-01-15T16:00:00Z',
      completedAt: '2024-01-15T16:01:30Z',
      result: {
        explanation: 'This is a feature request to implement dark mode...',
      },
    },
    {
      id: 't4',
      type: 'related',
      status: 'completed',
      issueId: '1',
      issueTitle: 'Login form validation not working on Safari',
      repository: 'frontend-app',
      createdAt: '2024-01-15T15:30:00Z',
      completedAt: '2024-01-15T15:31:00Z',
      result: {
        relatedIssues: [
          { id: '124', title: 'Form validation on mobile Safari', similarity: 0.85 },
          { id: '98', title: 'Email input validation', similarity: 0.72 },
        ],
      },
    },
    {
      id: 't5',
      type: 'summary',
      status: 'failed',
      issueId: '3',
      issueTitle: 'API endpoint returning 500 error',
      repository: 'api-service',
      createdAt: '2024-01-15T14:00:00Z',
    },
  ]);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    return matchesStatus && matchesType;
  });

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Tasks</h1>
            <p className="text-muted-foreground">
              Track and manage AI-generated insights and solutions
            </p>
          </div>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            New AI Task
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter((t) => t.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter((t) => t.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter((t) => t.status === 'failed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="summary">Summary</SelectItem>
            <SelectItem value="fix">Fix Generation</SelectItem>
            <SelectItem value="explain">Explanation</SelectItem>
            <SelectItem value="related">Related Issues</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1"></div>

        <Button variant="outline" size="sm">
          Clear Completed
        </Button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const StatusIcon = statusIcons[task.status];
            const TypeIcon = taskTypeIcons[task.type];

            return (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`p-2 rounded-full ${statusColors[task.status]} bg-opacity-10`}>
                        {task.status === 'pending' ? (
                          <Loader2 className={`h-5 w-5 animate-spin text-yellow-500`} />
                        ) : (
                          <StatusIcon className={`h-5 w-5 ${
                            task.status === 'completed' ? 'text-green-500' :
                            task.status === 'failed' ? 'text-red-500' :
                            'text-yellow-500'
                          }`} />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-sm">
                              {taskTypeLabels[task.type]}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {task.repository}
                            </Badge>
                          </div>
                          <Link
                            href={`/repo/${task.repository}/issues/${task.issueId}`}
                            className="text-base font-medium hover:underline"
                          >
                            {task.issueTitle}
                          </Link>
                        </div>

                        <Badge
                          variant={
                            task.status === 'completed'
                              ? 'default'
                              : task.status === 'failed'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Created {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                          <>
                            <span>•</span>
                            <span className="flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed {new Date(task.completedAt).toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>

                      {task.status === 'completed' && task.result && (
                        <div className="pt-2 border-t">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/repo/${task.repository}/issues/${task.issueId}`}>
                              View Results
                            </Link>
                          </Button>
                        </div>
                      )}

                      {task.status === 'failed' && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-destructive">
                            Task failed. Please try again or contact support.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredTasks.length === 0 && (
            <Card className="p-12">
              <div className="text-center space-y-2">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="font-semibold text-lg">No tasks found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or create a new AI task
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
