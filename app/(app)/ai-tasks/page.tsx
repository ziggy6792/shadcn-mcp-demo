'use client'

import { Sparkles, CheckCircle2, Clock, XCircle, Loader2, FileText, Code, MessageSquare } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { mockAITasks } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/format'

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case 'pending':
      return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'explain':
      return <FileText className="h-4 w-4" />
    case 'fix':
      return <Code className="h-4 w-4" />
    case 'summarize':
      return <MessageSquare className="h-4 w-4" />
    default:
      return <Sparkles className="h-4 w-4" />
  }
}

export default function AITasksPage() {
  const completedTasks = mockAITasks.filter(t => t.status === 'completed').length
  const pendingTasks = mockAITasks.filter(t => t.status === 'pending').length
  const failedTasks = mockAITasks.filter(t => t.status === 'failed').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-500" />
          AI Tasks
        </h1>
        <p className="text-muted-foreground">
          Track and manage AI-generated analyses and fixes
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>
            History of AI operations across all repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="w-[150px]">Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAITasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge variant={getStatusColor(task.status) as any} className="text-xs">
                        {task.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <span className="text-sm capitalize">{task.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.issueTitle ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{task.issueTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          Issue #{task.issueId?.split('i')[1]}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Batch operation</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.result ? (
                      <p className="text-sm text-muted-foreground max-w-md truncate">
                        {task.result}
                      </p>
                    ) : (
                      <span className="text-sm text-muted-foreground">Processing...</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(task.createdAt)}
                  </TableCell>
                  <TableCell>
                    {task.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    )}
                    {task.status === 'failed' && (
                      <Button size="sm" variant="outline">
                        Retry
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">About AI Tasks</h3>
              <p className="text-sm text-muted-foreground">
                AI tasks are automatically created when you trigger AI actions on issues.
                They run asynchronously in the background and you can monitor their progress here.
                Completed tasks can be reviewed and applied to your codebase.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
