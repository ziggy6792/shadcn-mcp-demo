'use client'

import { useRouter } from 'next/navigation'
import { GitPullRequest, Star, GitFork, TrendingUp, Sparkles } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockRepositories, mockIssues } from '@/lib/mock-data'
import { formatDate, formatNumber } from '@/lib/format'

export default function DashboardPage() {
  const router = useRouter()

  const totalOpenIssues = mockRepositories.reduce((acc, repo) => acc + repo.openIssues, 0)
  const totalClosedIssues = mockRepositories.reduce((acc, repo) => acc + repo.closedIssues, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your repositories and issues
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Repositories
            </CardTitle>
            <GitFork className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRepositories.length}</div>
            <p className="text-xs text-muted-foreground">
              Across your organization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpenIssues}</div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Closed Issues
            </CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClosedIssues}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((totalClosedIssues / (totalOpenIssues + totalClosedIssues)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Resolution rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Repositories</CardTitle>
          <CardDescription>
            Repositories you have access to with AI insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRepositories.map((repo) => (
              <div
                key={repo.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => router.push(`/repo/${repo.name}/issues`)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{repo.fullName}</h3>
                    <Badge variant="outline">{repo.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {formatNumber(repo.stars)}
                    </span>
                    <span>
                      {repo.openIssues} open issues
                    </span>
                    <span>
                      Updated {formatDate(repo.updatedAt)}
                    </span>
                  </div>
                </div>
                <Button variant="outline">View Issues</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription>
              This week's AI-generated insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium mb-1">High Priority Issues</p>
              <p className="text-sm text-muted-foreground">
                3 critical issues detected requiring immediate attention
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium mb-1">Common Patterns</p>
              <p className="text-sm text-muted-foreground">
                Performance issues detected in dashboard components
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium mb-1">Quick Wins</p>
              <p className="text-sm text-muted-foreground">
                2 issues can be auto-fixed with AI suggestions
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.values(mockIssues).flat().slice(0, 5).map((issue) => (
              <div key={issue.id} className="flex items-start gap-3">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  issue.aiPriority === 'urgent' ? 'bg-red-500' :
                  issue.aiPriority === 'high' ? 'bg-orange-500' :
                  issue.aiPriority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {issue.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    #{issue.number} · {formatDate(issue.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
