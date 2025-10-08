'use client';

import Link from 'next/link';
import { ArrowUpRight, GitBranch, Bug, CheckCircle2 } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { mockRepositories, mockIssues } from '@/lib/mock-data';

export default function DashboardPage() {
  const totalIssues = mockIssues.length;
  const openIssues = mockIssues.filter(i => i.status === 'open').length;
  const closedIssues = mockIssues.filter(i => i.status === 'closed').length;
  const inProgressIssues = mockIssues.filter(i => i.status === 'in_progress').length;

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your repositories and issue trends
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <Bug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalIssues}</div>
              <p className="text-xs text-muted-foreground">
                Across all repositories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openIssues}</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressIssues}</div>
              <p className="text-xs text-muted-foreground">
                Currently being worked on
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closedIssues}</div>
              <p className="text-xs text-muted-foreground">
                Completed this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Repositories Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Your Repositories</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRepositories.map((repo) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{repo.name}</span>
                    <Badge variant="secondary">{repo.stars} ⭐</Badge>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {repo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Open Issues</span>
                      <Badge variant="outline">{repo.openIssues}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">AI Suggestions</span>
                      <Badge variant="outline" className="bg-primary/10">
                        {repo.aiSuggestions}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Activity</span>
                      <span className="text-xs">{repo.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/repo/${repo.name}/issues`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Issues
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockIssues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <Link
                        href={`/repo/${issue.repository}/issues/${issue.id}`}
                        className="font-medium hover:underline"
                      >
                        #{issue.number} {issue.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            issue.status === 'open'
                              ? 'destructive'
                              : issue.status === 'in_progress'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {issue.status}
                        </Badge>
                        {issue.labels.slice(0, 2).map((label) => (
                          <Badge key={label} variant="outline">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {issue.repository}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
