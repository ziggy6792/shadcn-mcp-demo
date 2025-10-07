'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRepositories, mockIssues } from '@/lib/mock-data';
import { ArrowRight, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const totalOpenIssues = mockRepositories.reduce((sum, repo) => sum + repo.openIssues, 0);
  const totalClosedIssues = mockRepositories.reduce((sum, repo) => sum + repo.closedIssues, 0);
  const urgentIssues = mockIssues.filter(issue => issue.aiPriority === 'urgent').length;
  const highPriorityIssues = mockIssues.filter(issue => issue.aiPriority === 'high').length;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your repositories and issue activity
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Open Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpenIssues}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </span>{' '}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed This Week</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8%
              </span>{' '}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{urgentIssues}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Tasks Complete</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 tasks in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Repositories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Your Repositories</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRepositories.map((repo) => (
            <Card key={repo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {repo.fullName}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{repo.language}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                      {repo.openIssues} open
                    </span>
                    <span className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                      {repo.closedIssues} closed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    Updated {repo.lastActivity}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/repo/${repo.name}/issues`}>
                      View Issues
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and AI-powered features</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="flex flex-col items-start">
              <span className="font-semibold">Prioritize Issues</span>
              <span className="text-xs text-muted-foreground">
                Let AI rank issues by urgency
              </span>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="flex flex-col items-start">
              <span className="font-semibold">Summarize Repository</span>
              <span className="text-xs text-muted-foreground">
                Get AI overview of all issues
              </span>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="flex flex-col items-start">
              <span className="font-semibold">Generate Weekly Report</span>
              <span className="text-xs text-muted-foreground">
                AI-powered activity summary
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
