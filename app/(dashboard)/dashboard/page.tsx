"use client"

import * as React from "react"
import Link from "next/link"
import { SparklesIcon, TrendingUpIcon, ActivityIcon, GitForkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { mockRepositories } from "@/lib/mock-data"
import type { Repository } from "@/types"

export default function DashboardPage() {
  const [repositories] = React.useState<Repository[]>(mockRepositories)
  const [isLoadingAI, setIsLoadingAI] = React.useState(true)

  // Simulate AI insights loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingAI(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAutoPrioritize = async () => {
    const toastId = toast.loading("Auto-prioritizing issues...")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Issues prioritized successfully!", { id: toastId })
  }

  const handleSummarizeRepo = async () => {
    const toastId = toast.loading("Generating repository summary...")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Summary generated!", { id: toastId })
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your repositories and AI-powered insights
        </p>
      </div>

      {/* Repositories Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Repositories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <Link key={repo.id} href={`/repo/${repo.name}/issues`}>
              <Card className="h-full hover:bg-accent transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {repo.owner}/{repo.name}
                      </CardTitle>
                      <CardDescription className="mt-1.5">
                        {repo.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{repo.language}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ActivityIcon className="h-4 w-4" />
                      <span>{repo.openIssues} open</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitForkIcon className="h-4 w-4" />
                      <span>{repo.stars} stars</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="text-xs">
                    {repo.closedIssues} closed issues
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* AI Summary Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5" />
          AI Insights
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>This Week's Issue Trends</CardTitle>
            <CardDescription>
              AI-powered analysis of your repository activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingAI ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <div className="pt-4 space-y-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUpIcon className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">23% increase in bug reports</p>
                    <p className="text-sm text-muted-foreground">
                      Most issues are related to authentication and performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <SparklesIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">5 issues need immediate attention</p>
                    <p className="text-sm text-muted-foreground">
                      Critical bugs affecting production users
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ActivityIcon className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Team velocity is up 15%</p>
                    <p className="text-sm text-muted-foreground">
                      Average resolution time decreased from 3.2 to 2.7 days
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleAutoPrioritize} className="gap-2">
            <SparklesIcon className="h-4 w-4" />
            Auto-prioritize Issues
          </Button>
          <Button onClick={handleSummarizeRepo} variant="outline" className="gap-2">
            <SparklesIcon className="h-4 w-4" />
            Summarize Repository
          </Button>
        </div>
      </section>
    </div>
  )
}
