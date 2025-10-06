"use client"

import * as React from "react"
import { SearchIcon, SlidersHorizontalIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { mockIssues } from "@/lib/mock-data"
import type { Issue } from "@/types"

const priorityVariants = {
  low: "secondary",
  medium: "default",
  high: "outline",
  critical: "destructive",
} as const

const statusVariants = {
  open: "default",
  closed: "secondary",
} as const

export default function IssuesPage() {
  const [issues, setIssues] = React.useState<Issue[]>(mockIssues)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
  const [selectedLabel, setSelectedLabel] = React.useState<string>("all")
  const [selectedIssues, setSelectedIssues] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState<string>("updated")

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      selectedStatus === "all" || issue.status === selectedStatus
    const matchesLabel =
      selectedLabel === "all" || issue.labels.includes(selectedLabel)

    return matchesSearch && matchesStatus && matchesLabel
  })

  // Sort issues
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === "updated") {
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    } else if (sortBy === "created") {
      return b.createdAt.getTime() - a.createdAt.getTime()
    } else if (sortBy === "priority") {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return 0
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIssues(sortedIssues.map((i) => i.id))
    } else {
      setSelectedIssues([])
    }
  }

  const handleSelectIssue = (issueId: string, checked: boolean) => {
    if (checked) {
      setSelectedIssues([...selectedIssues, issueId])
    } else {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId))
    }
  }

  const handleBulkAIAction = async () => {
    const toastId = toast.loading(
      `Generating AI suggestions for ${selectedIssues.length} issues...`
    )

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success(`AI suggestions generated for ${selectedIssues.length} issues!`, {
      id: toastId,
    })
    setSelectedIssues([])
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <ResizablePanelGroup direction="horizontal">
        {/* Filters Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="flex h-full flex-col gap-4 p-4">
            <div>
              <h3 className="font-semibold mb-3">Filters</h3>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger id="status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="label-filter">Labels</Label>
                <Select value={selectedLabel} onValueChange={setSelectedLabel}>
                  <SelectTrigger id="label-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Labels</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="enhancement">Enhancement</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="ui">UI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>AI Tags</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="needs-reproduction" />
                    <label
                      htmlFor="needs-reproduction"
                      className="text-sm cursor-pointer"
                    >
                      Needs reproduction
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="security" />
                    <label htmlFor="security" className="text-sm cursor-pointer">
                      Security
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="optimization" />
                    <label
                      htmlFor="optimization"
                      className="text-sm cursor-pointer"
                    >
                      Optimization
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Content Area */}
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 border-b p-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontalIcon className="h-4 w-4" />
                      Sort: {sortBy}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortBy("updated")}>
                      Last Updated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("created")}>
                      Created Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("priority")}>
                      Priority
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {selectedIssues.length > 0 && (
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={handleBulkAIAction}
                >
                  <SparklesIcon className="h-4 w-4" />
                  AI Suggestions ({selectedIssues.length})
                </Button>
              )}
            </div>

            {/* Issues Table */}
            <ScrollArea className="flex-1">
              <div className="rounded-md border m-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            selectedIssues.length === sortedIssues.length &&
                            sortedIssues.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Labels</TableHead>
                      <TableHead>Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedIssues.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No issues found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedIssues.map((issue) => (
                        <TableRow
                          key={issue.id}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIssues.includes(issue.id)}
                              onCheckedChange={(checked) =>
                                handleSelectIssue(issue.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col gap-1">
                              <span>#{issue.number} {issue.title}</span>
                              {issue.aiTags && issue.aiTags.length > 0 && (
                                <div className="flex gap-1">
                                  {issue.aiTags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      AI: {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariants[issue.status]}>
                              {issue.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={priorityVariants[issue.priority]}>
                              {issue.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {issue.labels.slice(0, 2).map((label) => (
                                <Badge key={label} variant="secondary">
                                  {label}
                                </Badge>
                              ))}
                              {issue.labels.length > 2 && (
                                <Badge variant="secondary">
                                  +{issue.labels.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(issue.updatedAt)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
