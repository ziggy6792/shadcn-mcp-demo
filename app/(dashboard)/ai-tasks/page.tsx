"use client"

import * as React from "react"
import { TrashIcon, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { mockAITasks } from "@/lib/mock-data"
import type { AITask } from "@/types"

const statusVariants = {
  pending: "secondary",
  "in-progress": "default",
  completed: "outline",
  failed: "destructive",
} as const

export default function AITasksPage() {
  const [tasks, setTasks] = React.useState<AITask[]>(mockAITasks)
  const [statusFilter, setStatusFilter] = React.useState({
    pending: true,
    "in-progress": true,
    completed: true,
    failed: true,
  })

  const filteredTasks = tasks.filter((task) => statusFilter[task.status])

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
    toast.success("Task deleted successfully")
  }

  const handleClearCompleted = () => {
    const completedCount = tasks.filter((t) => t.status === "completed").length
    setTasks(tasks.filter((t) => t.status !== "completed"))
    toast.success(`Cleared ${completedCount} completed tasks`)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tasks</h1>
          <p className="text-muted-foreground">
            Track and manage your AI-powered operations
          </p>
        </div>
        <div className="flex gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FilterIcon className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter.pending}
                onCheckedChange={(checked) =>
                  setStatusFilter({ ...statusFilter, pending: checked })
                }
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter["in-progress"]}
                onCheckedChange={(checked) =>
                  setStatusFilter({ ...statusFilter, "in-progress": checked })
                }
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.completed}
                onCheckedChange={(checked) =>
                  setStatusFilter({ ...statusFilter, completed: checked })
                }
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.failed}
                onCheckedChange={(checked) =>
                  setStatusFilter({ ...statusFilter, failed: checked })
                }
              >
                Failed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Completed Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCompleted}
            disabled={!tasks.some((t) => t.status === "completed")}
          >
            Clear Completed
          </Button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Badge variant={statusVariants[task.status]}>
                        {task.status}
                      </Badge>
                      {task.status === "in-progress" && task.progress && (
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="h-2 w-24" />
                          <span className="text-xs text-muted-foreground">
                            {task.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(task.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {task.completedAt ? formatDate(task.completedAt) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">
            {tasks.filter((t) => t.status === "pending").length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">
            {tasks.filter((t) => t.status === "in-progress").length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">
            {tasks.filter((t) => t.status === "completed").length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">
            {tasks.filter((t) => t.status === "failed").length}
          </div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
      </div>
    </div>
  )
}
