'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockAITasks, mockIssues } from '@/lib/mock-data';

export default function AITasksPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = mockAITasks.filter(
    (task) => statusFilter === 'all' || task.status === statusFilter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const task = selectedTask
    ? mockAITasks.find((t) => t.id === selectedTask)
    : null;

  const relatedIssue = task?.issueId
    ? mockIssues.find((i) => i.id === task.issueId)
    : null;

  const pendingCount = mockAITasks.filter((t) => t.status === 'pending').length;
  const completedCount = mockAITasks.filter((t) => t.status === 'completed').length;
  const failedCount = mockAITasks.filter((t) => t.status === 'failed').length;

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tasks</h1>
          <p className="text-muted-foreground">
            Track and manage asynchronous AI-generated tasks
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Tasks in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{failedCount}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All Tasks
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === 'failed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('failed')}
          >
            Failed
          </Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm">
            Clear Completed
          </Button>
        </div>

        {/* Tasks Table */}
        <Card>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Related Issue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  const issue = task.issueId
                    ? mockIssues.find((i) => i.id === task.issueId)
                    : null;

                  return (
                    <TableRow key={task.id}>
                      <TableCell>{getStatusIcon(task.status)}</TableCell>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(task.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {task.completedAt
                          ? new Date(task.completedAt).toLocaleString()
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {issue ? (
                          <Link
                            href={`/repo/${issue.repository}/issues/${issue.id}`}
                            className="text-sm hover:underline"
                          >
                            #{issue.number} {issue.title.slice(0, 30)}...
                          </Link>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(task.id)}
                        >
                          View Result
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredTasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No tasks found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>

      {/* Task Result Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{task?.name}</DialogTitle>
            <DialogDescription>
              {task?.status === 'completed'
                ? 'Task completed successfully'
                : task?.status === 'failed'
                ? 'Task failed to complete'
                : 'Task is still processing'}
            </DialogDescription>
          </DialogHeader>

          {task && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Status</div>
                  {getStatusBadge(task.status)}
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Created</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(task.createdAt).toLocaleString()}
                  </div>
                </div>
                {task.completedAt && (
                  <div>
                    <div className="text-sm font-medium mb-1">Completed</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(task.completedAt).toLocaleString()}
                    </div>
                  </div>
                )}
                {relatedIssue && (
                  <div>
                    <div className="text-sm font-medium mb-1">Related Issue</div>
                    <Link
                      href={`/repo/${relatedIssue.repository}/issues/${relatedIssue.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      #{relatedIssue.number} {relatedIssue.title}
                    </Link>
                  </div>
                )}
              </div>

              {task.result && (
                <div>
                  <div className="text-sm font-medium mb-2">Result</div>
                  <Card>
                    <CardContent className="pt-4">
                      <pre className="whitespace-pre-wrap text-sm">
                        {task.result}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {task.status === 'pending' && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-3 text-muted-foreground">
                    Processing...
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
