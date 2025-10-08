"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { IconSearch, IconFilter, IconRobot, IconCheck } from "@tabler/icons-react"

// Mock data
const issues = [
  {
    id: 1,
    number: 245,
    title: "Critical bug in authentication flow",
    status: "open",
    priority: "critical",
    labels: ["bug", "security"],
    assignee: "john-doe",
    aiScore: 95,
    created: "2 hours ago",
  },
  {
    id: 2,
    number: 244,
    title: "Add dark mode support to settings page",
    status: "open",
    priority: "medium",
    labels: ["enhancement", "ui"],
    assignee: null,
    aiScore: 72,
    created: "1 day ago",
  },
  {
    id: 3,
    number: 243,
    title: "Performance optimization for large datasets",
    status: "open",
    priority: "high",
    labels: ["performance", "optimization"],
    assignee: "jane-smith",
    aiScore: 88,
    created: "2 days ago",
  },
  {
    id: 4,
    number: 242,
    title: "Update dependencies to latest versions",
    status: "open",
    priority: "low",
    labels: ["maintenance"],
    assignee: null,
    aiScore: 45,
    created: "3 days ago",
  },
  {
    id: 5,
    number: 241,
    title: "Fix broken links in documentation",
    status: "open",
    priority: "low",
    labels: ["documentation"],
    assignee: "john-doe",
    aiScore: 30,
    created: "4 days ago",
  },
]

const priorityColors = {
  critical: "destructive",
  high: "default",
  medium: "secondary",
  low: "outline",
} as const

export default function IssuesPage() {
  const [selectedIssues, setSelectedIssues] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const toggleIssueSelection = (issueId: number) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIssues.length === issues.length) {
      setSelectedIssues([])
    } else {
      setSelectedIssues(issues.map((issue) => issue.id))
    }
  }

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Filters Sidebar */}
        <div className="w-64 border-r bg-muted/10 p-4">
          <h3 className="mb-4 font-semibold">Filters</h3>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-medium">Status</h4>
                <div className="space-y-2">
                  {["open", "closed", "all"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={statusFilter === status}
                        onCheckedChange={() => setStatusFilter(status)}
                      />
                      <label
                        htmlFor={`status-${status}`}
                        className="text-sm capitalize"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 text-sm font-medium">Priority</h4>
                <div className="space-y-2">
                  {["critical", "high", "medium", "low", "all"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={priorityFilter === priority}
                        onCheckedChange={() => setPriorityFilter(priority)}
                      />
                      <label
                        htmlFor={`priority-${priority}`}
                        className="text-sm capitalize"
                      >
                        {priority}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 text-sm font-medium">Labels</h4>
                <div className="space-y-2">
                  {["bug", "enhancement", "security", "performance"].map((label) => (
                    <div key={label} className="flex items-center space-x-2">
                      <Checkbox id={`label-${label}`} />
                      <label htmlFor={`label-${label}`} className="text-sm capitalize">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 text-sm font-medium">AI Tags</h4>
                <div className="space-y-2">
                  <Badge className="mr-1">High Priority</Badge>
                  <Badge variant="secondary" className="mr-1">Quick Fix</Badge>
                  <Badge variant="outline" className="mr-1">Needs Context</Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            {/* Search and Actions */}
            <div className="border-b p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search issues..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select defaultValue="updated">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Recently updated</SelectItem>
                    <SelectItem value="created">Recently created</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="ai-score">AI Score</SelectItem>
                  </SelectContent>
                </Select>

                {selectedIssues.length > 0 && (
                  <Button variant="outline" size="sm">
                    <IconCheck className="mr-2 h-4 w-4" />
                    Bulk Actions ({selectedIssues.length})
                  </Button>
                )}

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">
                      <IconRobot className="mr-2 h-4 w-4" />
                      AI Assist
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[85vh]">
                    <DrawerHeader>
                      <DrawerTitle>AI Assistant</DrawerTitle>
                      <DrawerDescription>
                        Get AI-powered insights and suggestions for your issues
                      </DrawerDescription>
                    </DrawerHeader>
                    <ScrollArea className="flex-1 px-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Suggested Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            Auto-label all issues
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Generate fix for critical issues
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Summarize recent activity
                          </Button>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* Issues Table */}
            <ScrollArea className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIssues.length === issues.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-16">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Labels</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead className="w-24">AI Score</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIssues.includes(issue.id)}
                          onCheckedChange={() => toggleIssueSelection(issue.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">#{issue.number}</TableCell>
                      <TableCell>
                        <Link
                          href={`/repo/issues/${issue.id}`}
                          className="hover:underline"
                        >
                          {issue.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {issue.labels.map((label) => (
                            <Badge key={label} variant="secondary" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityColors[issue.priority as keyof typeof priorityColors]}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{issue.assignee || "Unassigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${issue.aiScore}%` }}
                            />
                          </div>
                          <span className="text-xs">{issue.aiScore}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {issue.created}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
