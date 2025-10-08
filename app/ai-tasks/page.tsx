'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/mocks/api';
import { store } from '@/lib/store';
import { AITask } from '@/lib/mocks/data';
import { Sparkles, CheckCircle2, Clock, XCircle, FileText, Code, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AITasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<AITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = store.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    loadTasks();

    // Poll for updates every 2 seconds
    const interval = setInterval(loadTasks, 2000);
    return () => clearInterval(interval);
  }, [router]);

  const loadTasks = async () => {
    const data = await api.getAITasks();
    setTasks(data);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-black">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'explain':
        return <FileText className="h-4 w-4" />;
      case 'fix':
        return <Code className="h-4 w-4" />;
      case 'summarize':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const failedTasks = tasks.filter((t) => t.status === 'failed');

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tasks</h1>
          <p className="text-muted-foreground">
            Track and manage AI-generated insights and solutions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingTasks.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">{failedTasks.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-12 text-center">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No AI tasks yet</p>
                <p className="text-sm text-muted-foreground">
                  AI tasks will appear here when you trigger AI actions on issues.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getStatusIcon(task.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <span className="capitalize">{task.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="font-medium truncate">{task.issueTitle}</p>
                          {task.result && (
                            <p className="text-sm text-muted-foreground truncate">
                              {task.result}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        {task.status === 'completed' && (
                          <Button variant="ghost" size="sm">
                            View Result
                          </Button>
                        )}
                        {task.status === 'pending' && (
                          <Button variant="ghost" size="sm" disabled>
                            Processing...
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
