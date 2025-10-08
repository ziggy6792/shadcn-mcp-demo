"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FocusCards } from "@/components/ui/focus-cards"
import { Timeline } from "@/components/ui/timeline"
import { IconGitBranch, IconBug, IconAlertCircle, IconTrendingUp } from "@tabler/icons-react"

// Mock data
const repositories = [
  {
    title: "owner/main-app",
    description: "Production application with 45 open issues",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
    openIssues: 45,
    criticalIssues: 5,
    lastActivity: "2 hours ago",
  },
  {
    title: "owner/api-service",
    description: "Backend API with 23 open issues",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    openIssues: 23,
    criticalIssues: 2,
    lastActivity: "5 hours ago",
  },
  {
    title: "user/frontend-app",
    description: "React frontend with 12 open issues",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    openIssues: 12,
    criticalIssues: 0,
    lastActivity: "1 day ago",
  },
]

const timelineData = [
  {
    title: "Issue #245 Created",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>New bug report in owner/main-app</p>
        <Badge variant="destructive" className="mt-1">Critical</Badge>
      </div>
    ),
  },
  {
    title: "AI Fix Generated",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>Automatic fix proposal for Issue #234</p>
        <Badge className="mt-1">Ready for Review</Badge>
      </div>
    ),
  },
  {
    title: "Issue #230 Resolved",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>Security vulnerability patched in api-service</p>
      </div>
    ),
  },
  {
    title: "Bulk Label Update",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>15 issues auto-labeled with AI tags</p>
      </div>
    ),
  },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="container space-y-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your repositories and issue activity
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <IconGitBranch className="mr-2 h-4 w-4" />
              Sync Repos
            </Button>
            <Button>
              <IconAlertCircle className="mr-2 h-4 w-4" />
              View All Issues
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <IconBug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">80</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <IconAlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                -3 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Fixes Generated</CardTitle>
              <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Repositories</CardTitle>
              <IconGitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                All synced
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Repository Cards */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Your Repositories</h2>
          <FocusCards cards={repositories.map(repo => ({
            title: repo.title,
            src: repo.image,
            description: (
              <div className="space-y-2">
                <p className="text-sm text-neutral-300">{repo.description}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{repo.openIssues} open</Badge>
                  {repo.criticalIssues > 0 && (
                    <Badge variant="destructive">{repo.criticalIssues} critical</Badge>
                  )}
                </div>
                <p className="text-xs text-neutral-400">Last activity: {repo.lastActivity}</p>
              </div>
            ),
          }))} />
        </div>

        {/* Activity Timeline */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Recent Activity</h2>
          <Timeline data={timelineData} />
        </div>
      </div>
    </AppLayout>
  )
}
