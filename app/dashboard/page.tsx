"use client";

import Link from "next/link";
import { GitBranch, TrendingUp, TrendingDown, Clock, Star, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedList } from "@/components/ui/animated-list";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { mockRepositories, mockIssues } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

interface Notification {
  name: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

const notifications: Notification[] = [
  {
    name: "New Issue #142",
    description: "Memory leak in data fetching hook",
    time: "5m ago",
    icon: "🐛",
    color: "#FF6B6B",
  },
  {
    name: "AI Fix Generated",
    description: "Solution ready for issue #138",
    time: "12m ago",
    icon: "✨",
    color: "#4ECDC4",
  },
  {
    name: "Issue Closed #135",
    description: "Dark mode support added",
    time: "1h ago",
    icon: "✅",
    color: "#95E1D3",
  },
];

function NotificationItem({ name, description, icon, color, time }: Notification) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
      <div className="text-2xl" style={{ filter: `drop-shadow(0 0 10px ${color})` }}>
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

export default function DashboardPage() {
  const totalOpen = mockRepositories.reduce((acc, repo) => acc + repo.openIssues, 0);
  const totalClosed = mockRepositories.reduce((acc, repo) => acc + repo.closedIssues, 0);
  const criticalIssues = mockIssues.filter((issue) => issue.priority === "critical").length;

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="p-8">
          <BlurFade delay={0.1} inView>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your repositories and issues.
              </p>
            </div>
          </BlurFade>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <BlurFade delay={0.15} inView>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <NumberTicker value={totalOpen} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>12% from last week</span>
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Closed This Week</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <NumberTicker value={totalClosed} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span>8% from last week</span>
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <NumberTicker value={criticalIssues} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Needs immediate attention
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Repositories</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    <NumberTicker value={mockRepositories.length} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active projects
                  </p>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Repositories List */}
            <BlurFade delay={0.35} inView>
              <Card>
                <CardHeader>
                  <CardTitle>Your Repositories</CardTitle>
                  <CardDescription>Click on a repository to view its issues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockRepositories.map((repo, index) => (
                    <Link
                      key={repo.id}
                      href={`/repo/${repo.name}/issues`}
                      className="block"
                    >
                      <MagicCard
                        className="cursor-pointer p-4 hover:shadow-lg transition-shadow"
                        gradientColor="#262626"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{repo.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {repo.language}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {repo.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {repo.stars}
                              </span>
                              <span className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {repo.openIssues} open
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {repo.lastUpdate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </BlurFade>

            {/* Recent Activity */}
            <BlurFade delay={0.4} inView>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates across all repositories</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedList>
                    {notifications.map((notification, index) => (
                      <NotificationItem key={index} {...notification} />
                    ))}
                  </AnimatedList>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          {/* AI Insights Card */}
          <BlurFade delay={0.45} inView>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  duration={20}
                  delay={20}
                  radius={80}
                >
                  <div className="text-4xl">✨</div>
                </OrbitingCircles>
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  duration={20}
                  delay={10}
                  radius={80}
                >
                  <div className="text-4xl">🤖</div>
                </OrbitingCircles>
              </div>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Automated analysis of your issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Issues with AI suggestions</span>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending AI analysis</span>
                    <Badge variant="outline">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-generated fixes</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </main>
      </div>
    </>
  );
}
