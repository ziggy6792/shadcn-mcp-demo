"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { IconCheck, IconX, IconClock, IconRefresh } from "@tabler/icons-react"

// Mock data
const tasks = [
  {
    id: 1,
    name: "Generate fix for Issue #245",
    status: "completed",
    timestamp: "2 hours ago",
    duration: "45s",
    result: {
      success: true,
      message: "Successfully generated fix with 95% confidence",
      details: "Added email verification check in auth middleware",
    },
  },
  {
    id: 2,
    name: "Auto-label 15 issues",
    status: "completed",
    timestamp: "5 hours ago",
    duration: "2m 15s",
    result: {
      success: true,
      message: "Labeled 15 issues with appropriate tags",
      details: "Applied labels: bug (5), enhancement (7), documentation (3)",
    },
  },
  {
    id: 3,
    name: "Summarize Issue #243 discussion",
    status: "pending",
    timestamp: "10 minutes ago",
    duration: "-",
    result: null,
  },
  {
    id: 4,
    name: "Generate test cases for security fix",
    status: "failed",
    timestamp: "1 day ago",
    duration: "15s",
    result: {
      success: false,
      message: "Failed to generate test cases",
      details: "Error: Insufficient context about the test framework",
    },
  },
  {
    id: 5,
    name: "Analyze performance bottleneck",
    status: "pending",
    timestamp: "30 minutes ago",
    duration: "-",
    result: null,
  },
]

const statusConfig = {
  completed: {
    variant: "default" as const,
    icon: IconCheck,
    color: "text-green-500",
  },
  failed: {
    variant: "destructive" as const,
    icon: IconX,
    color: "text-red-500",
  },
  pending: {
    variant: "secondary" as const,
    icon: IconClock,
    color: "text-yellow-500",
  },
}

export default function AITasksPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  )

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    failed: tasks.filter((t) => t.status === "failed").length,
  }

  return (
    <AppLayout>
      <div className="container space-y-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Tasks</h1>
            <p className="text-muted-foreground">
              Track and manage asynchronous AI-generated tasks
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <IconRefresh className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <IconCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <IconClock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <IconX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.failed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "failed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("failed")}
          >
            Failed
          </Button>
        </div>

        {/* Tasks Table */}
        <Card>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  const config = statusConfig[task.status as keyof typeof statusConfig]
                  const StatusIcon = config.icon

                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        <Badge variant={config.variant} className="flex w-fit items-center gap-1">
                          <StatusIcon className={`h-3 w-3 ${config.color}`} />
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.timestamp}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                          </div>
                        ) : (
                          task.duration
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {task.result ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Result
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{task.name}</DialogTitle>
                                <DialogDescription>
                                  Task result and details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="mb-2 text-sm font-semibold">Status</h4>
                                  <Badge variant={config.variant}>
                                    {task.result.success ? "Success" : "Failed"}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="mb-2 text-sm font-semibold">Message</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {task.result.message}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="mb-2 text-sm font-semibold">Details</h4>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <pre className="text-xs">{task.result.details}</pre>
                                    </CardContent>
                                  </Card>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Started:</span>
                                    <p className="font-medium">{task.timestamp}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Duration:</span>
                                    <p className="font-medium">{task.duration}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button variant="ghost" size="sm" disabled>
                            In Progress...
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
    </AppLayout>
  )
}
