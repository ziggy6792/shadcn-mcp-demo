"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, XCircle, Clock, FileText, Code, Lightbulb, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { mockAITasks } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    icon: Clock,
    variant: "outline" as const,
    className: "text-blue-500 border-blue-500/20 bg-blue-500/10",
  },
  "in-progress": {
    icon: Loader2,
    variant: "outline" as const,
    className: "text-yellow-500 border-yellow-500/20 bg-yellow-500/10 animate-pulse",
  },
  completed: {
    icon: CheckCircle2,
    variant: "outline" as const,
    className: "text-green-500 border-green-500/20 bg-green-500/10",
  },
  failed: {
    icon: XCircle,
    variant: "outline" as const,
    className: "text-red-500 border-red-500/20 bg-red-500/10",
  },
};

const typeConfig = {
  fix: { icon: Code, label: "Generate Fix", color: "text-purple-500" },
  summary: { icon: FileText, label: "Summarize", color: "text-blue-500" },
  explanation: { icon: Lightbulb, label: "Explain", color: "text-yellow-500" },
  analysis: { icon: Search, label: "Analyze", color: "text-green-500" },
};

export default function AITasksPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredTasks =
    selectedFilter === "all"
      ? mockAITasks
      : mockAITasks.filter((task) => task.status === selectedFilter);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="p-8">
          <BlurFade delay={0.1} inView>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-8 w-8 text-purple-500" />
                <h1 className="text-4xl font-bold">
                  <AnimatedGradientText>AI Tasks</AnimatedGradientText>
                </h1>
              </div>
              <TypingAnimation
                className="text-muted-foreground text-lg"
                text="Track and manage all AI-generated insights and solutions"
              />
            </div>
          </BlurFade>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <BlurFade delay={0.15} inView>
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedFilter === "all" && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedFilter("all")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">All Tasks</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{mockAITasks.length}</div>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedFilter === "pending" && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedFilter("pending")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockAITasks.filter((t) => t.status === "pending").length}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedFilter === "in-progress" && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedFilter("in-progress")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockAITasks.filter((t) => t.status === "in-progress").length}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedFilter === "completed" && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedFilter("completed")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockAITasks.filter((t) => t.status === "completed").length}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          {/* Tasks Table */}
          <BlurFade delay={0.35} inView>
            <Card>
              <CardHeader>
                <CardTitle>Task History</CardTitle>
                <CardDescription>
                  View all AI-generated tasks and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => {
                      const StatusIcon = statusConfig[task.status].icon;
                      const TypeIcon = typeConfig[task.type].icon;

                      return (
                        <TableRow key={task.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{task.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <TypeIcon className={cn("h-4 w-4", typeConfig[task.type].color)} />
                              <span className="text-sm">{typeConfig[task.type].label}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {task.issueNumber ? (
                              <a
                                href={`/repo/react-dashboard/issues/${task.issueNumber}`}
                                className="text-primary hover:underline"
                              >
                                #{task.issueNumber}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={statusConfig[task.status].variant}
                              className={cn("gap-1", statusConfig[task.status].className)}
                            >
                              <StatusIcon className="h-3 w-3" />
                              <span className="capitalize">{task.status.replace("-", " ")}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(task.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            {task.result ? (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {task.result}
                              </p>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {filteredTasks.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No tasks found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </main>
      </div>
    </>
  );
}
