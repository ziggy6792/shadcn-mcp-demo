'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/mocks/api';
import { store } from '@/lib/store';
import { Repository } from '@/lib/mocks/data';
import { GitBranch, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = store.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    loadRepositories();
  }, [router]);

  const loadRepositories = async () => {
    setIsLoading(true);
    const repos = await api.getRepositories();
    setRepositories(repos);
    setIsLoading(false);
  };

  const handleRepoClick = (repoName: string) => {
    store.setCurrentRepo(repoName);
    router.push(`/repo/${repoName}/issues`);
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const totalOpen = repositories.reduce((sum, repo) => sum + repo.openIssues, 0);
  const totalClosed = repositories.reduce((sum, repo) => sum + repo.closedIssues, 0);

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your repositories and issue activity
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositories.length}</div>
              <p className="text-xs text-muted-foreground">Connected repositories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOpen}</div>
              <p className="text-xs text-muted-foreground">Across all repositories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Issues</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClosed}</div>
              <p className="text-xs text-muted-foreground">
                {totalClosed > 0 ? `${Math.round((totalClosed / (totalOpen + totalClosed)) * 100)}% resolution rate` : 'No closed issues'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Repositories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full mt-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              repositories.map((repo) => (
                <Card
                  key={repo.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleRepoClick(repo.name)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{repo.name}</span>
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${getActivityColor(repo.activity)}`} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {repo.activity}
                        </span>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {repo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">{repo.openIssues}</span>
                          <span className="text-xs text-muted-foreground">open</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">{repo.closedIssues}</span>
                          <span className="text-xs text-muted-foreground">closed</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      View Issues
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Week&apos;s Trends
            </CardTitle>
            <CardDescription>AI-powered insights on your issue activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Badge variant="secondary">Insight</Badge>
              <p className="text-sm">
                <strong>react-app</strong> has seen a 40% increase in bug reports this week.
                Most are related to mobile responsiveness.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Badge variant="secondary">Insight</Badge>
              <p className="text-sm">
                <strong>api-gateway</strong> has 2 critical security issues that need immediate attention.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Badge variant="secondary">Suggestion</Badge>
              <p className="text-sm">
                Consider prioritizing performance issues in <strong>data-pipeline</strong> -
                they&apos;re blocking the Q4 release.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
