'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Filter, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockIssues, mockRepositories } from '@/lib/mock-data'
import { formatDate, getPriorityColor } from '@/lib/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function RepoIssuesPage({ params }: { params: { name: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [stateFilter, setStateFilter] = useState<string>('open')

  // Find the repository
  const repo = mockRepositories.find(r => r.name === params.name)
  const issues = mockIssues[repo?.id || '1'] || []

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === 'all' || issue.aiPriority === priorityFilter
    const matchesState = stateFilter === 'all' || issue.state === stateFilter
    return matchesSearch && matchesPriority && matchesState
  })

  const criticalCount = issues.filter(i => i.aiPriority === 'urgent').length
  const highCount = issues.filter(i => i.aiPriority === 'high').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{repo?.fullName}</h1>
        <p className="text-muted-foreground">{repo?.description}</p>
      </div>

      {/* AI Summary Card */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Insights
          </CardTitle>
          <CardDescription>
            Automated analysis of your repository issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-background p-4">
              <p className="text-sm font-medium mb-1">Priority Issues</p>
              <p className="text-2xl font-bold">{criticalCount + highCount}</p>
              <p className="text-xs text-muted-foreground">
                {criticalCount} urgent, {highCount} high
              </p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-sm font-medium mb-1">Common Theme</p>
              <p className="text-sm text-muted-foreground">
                Performance & rendering issues
              </p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-sm font-medium mb-1">Recommendation</p>
              <p className="text-sm text-muted-foreground">
                Consider implementing virtualization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>Issues ({filteredIssues.length})</CardTitle>
          <CardDescription>
            Click on an issue to view details and AI suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Priority</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="w-[150px]">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow
                  key={issue.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/repo/${params.name}/issues/${issue.number}`)}
                >
                  <TableCell>
                    <Badge variant={getPriorityColor(issue.aiPriority || 'low') as any}>
                      {issue.aiPriority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-xs text-muted-foreground">
                        #{issue.number} opened by {issue.author.username}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {issue.labels.map((label) => (
                        <Badge
                          key={label.id}
                          variant="outline"
                          style={{
                            borderColor: `#${label.color}`,
                            color: `#${label.color}`,
                          }}
                        >
                          {label.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {issue.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.assignee.avatar} />
                          <AvatarFallback>{issue.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{issue.assignee.username}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(issue.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
