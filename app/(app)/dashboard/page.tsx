'use client';

import Link from 'next/link';
import {
  GitBranchIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { CardHoverEffect } from '@/components/ui/card-hover-effect';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BackgroundLines } from '@/components/ui/background-lines';
import { GlowingStars } from '@/components/ui/glowing-stars';
import { Meteors } from '@/components/ui/meteors';
import { mockRepositories, mockIssues, mockAITasks } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils/format';

export default function DashboardPage() {
  const recentIssues = mockIssues.slice(0, 3);
  const activeAITasks = mockAITasks.filter((t) => t.status === 'in_progress');

  const stats = [
    {
      title: 'Open Issues',
      value: mockRepositories.reduce((sum, repo) => sum + repo.openIssuesCount, 0),
      icon: <AlertCircleIcon className="h-6 w-6" />,
      change: '+12%',
      color: 'text-orange-500',
    },
    {
      title: 'Resolved This Week',
      value: 34,
      icon: <CheckCircle2Icon className="h-6 w-6" />,
      change: '+18%',
      color: 'text-green-500',
    },
    {
      title: 'AI Tasks Running',
      value: activeAITasks.length,
      icon: <SparklesIcon className="h-6 w-6" />,
      change: 'Live',
      color: 'text-purple-500',
    },
    {
      title: 'Active Repos',
      value: mockRepositories.length,
      icon: <GitBranchIcon className="h-6 w-6" />,
      change: '+1',
      color: 'text-blue-500',
    },
  ];

  const repositories = mockRepositories.map((repo) => ({
    title: repo.name,
    description: repo.description,
    link: `/repo/${repo.name}/issues`,
  }));

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundLines className="absolute inset-0 z-0 opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your repositories.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* AI Insight Banner */}
          <div className="mb-8 relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6">
            <GlowingStars className="absolute inset-0 z-0" />
            <Meteors number={3} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-semibold text-purple-500">
                  AI Insights
                </span>
              </div>
              <TextGenerateEffect
                words="3 critical issues detected this week. AI has generated potential fixes for 2 of them."
                className="text-lg font-semibold"
              />
              <Link
                href="/ai-tasks"
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View AI Tasks
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color}`}>{stat.icon}</div>
                  <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Repositories Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GitBranchIcon className="h-6 w-6" />
              Your Repositories
            </h2>
            <CardHoverEffect items={repositories} />
          </div>

          {/* Recent Issues & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Issues */}
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircleIcon className="h-5 w-5 text-orange-500" />
                Recent Issues
              </h3>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    href={`/repo/awesome-app/issues/${issue.number}`}
                    className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        #{issue.number} {issue.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          issue.aiPriority === 'critical'
                            ? 'bg-red-500/10 text-red-500'
                            : issue.aiPriority === 'high'
                            ? 'bg-orange-500/10 text-orange-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {issue.aiPriority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {issue.aiSummary}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3" />
                      {formatRelativeTime(issue.updatedAt)}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/repo/awesome-app/issues"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:underline"
              >
                View All Issues
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Active AI Tasks */}
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-purple-500" />
                AI Activity
              </h3>
              <div className="space-y-4">
                {mockAITasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg border border-border bg-background/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{task.title}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          task.status === 'completed'
                            ? 'bg-green-500/10 text-green-500'
                            : task.status === 'in_progress'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3" />
                      {formatRelativeTime(task.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/ai-tasks"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:underline"
              >
                View All Tasks
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
