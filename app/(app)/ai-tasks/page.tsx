'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  LoaderIcon,
  FileTextIcon,
  CodeIcon,
  SearchIcon,
  BrainIcon,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader } from '@/components/ui/loader';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { mockAITasks } from '@/lib/mock-data';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/format';

const taskTypeIcons = {
  summarize: FileTextIcon,
  explain: BrainIcon,
  fix: CodeIcon,
  analyze: SearchIcon,
};

const taskTypeColors = {
  summarize: 'text-blue-500',
  explain: 'text-green-500',
  fix: 'text-purple-500',
  analyze: 'text-orange-500',
};

export default function AITasksPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'failed'>('all');

  const filteredTasks = mockAITasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: mockAITasks.length,
    completed: mockAITasks.filter((t) => t.status === 'completed').length,
    inProgress: mockAITasks.filter((t) => t.status === 'in_progress').length,
    pending: mockAITasks.filter((t) => t.status === 'pending').length,
    failed: mockAITasks.filter((t) => t.status === 'failed').length,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarsBackground className="absolute inset-0" />
      <ShootingStars />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <SparklesIcon className="h-8 w-8 text-purple-500" />
                  AI Tasks
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage AI-powered analysis and fixes
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-xs text-muted-foreground">Total Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{stats.completed}</span>
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <LoaderIcon className="h-5 w-5 text-blue-500 animate-spin" />
                <span className="text-2xl font-bold">{stats.inProgress}</span>
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <ClockIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">{stats.pending}</span>
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <XCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-2xl font-bold">{stats.failed}</span>
              </div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
              <TabsList>
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress ({stats.inProgress})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
                <TabsTrigger value="failed">Failed ({stats.failed})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const Icon = taskTypeIcons[task.type];
              const iconColor = taskTypeColors[task.type];

              return (
                <div
                  key={task.id}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="capitalize">{task.type}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {formatRelativeTime(task.createdAt)}
                          </div>
                          {task.completedAt && (
                            <>
                              <span>•</span>
                              <span>
                                Completed {formatRelativeTime(task.completedAt)}
                              </span>
                            </>
                          )}
                        </div>
                        {task.result && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {task.result}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full border font-semibold ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status === 'in_progress' ? (
                          <span className="flex items-center gap-2">
                            <Loader className="h-3 w-3" />
                            In Progress
                          </span>
                        ) : (
                          task.status.replace('_', ' ')
                        )}
                      </span>
                    </div>
                  </div>

                  {task.issueId && (
                    <div className="pt-4 border-t border-border">
                      <Link
                        href={`/repo/awesome-app/issues/342`}
                        className="text-sm text-primary hover:underline flex items-center gap-2"
                      >
                        <FileTextIcon className="h-4 w-4" />
                        View related issue
                      </Link>
                    </div>
                  )}

                  {task.status === 'completed' && task.type === 'fix' && (
                    <div className="pt-4 border-t border-border flex gap-3">
                      <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors">
                        View Fix
                      </button>
                      <button className="px-4 py-2 border border-border hover:bg-accent rounded-lg text-sm font-semibold transition-colors">
                        Apply to Repository
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <SparklesIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">
                {filter === 'all'
                  ? 'No AI tasks have been created yet'
                  : `No ${filter.replace('_', ' ')} tasks`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
