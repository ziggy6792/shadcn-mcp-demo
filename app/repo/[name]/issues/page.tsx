'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { mockIssues } from '@/lib/mock-data';

export default function IssuesPage({ params }: { params: { name: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const filteredIssues = mockIssues
    .filter((issue) => issue.repository === params.name)
    .filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });

  const toggleIssueSelection = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'destructive';
      case 'in_progress':
        return 'default';
      case 'closed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Filters Sidebar */}
        <div className="w-64 border-r bg-muted/10">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </h3>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">AI Tags</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="high-impact" />
                    <label
                      htmlFor="high-impact"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      High Impact
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="needs-attention" />
                    <label
                      htmlFor="needs-attention"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Needs Attention
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="productivity" />
                    <label
                      htmlFor="productivity"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Productivity Boost
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{params.name}</h1>
                <p className="text-muted-foreground">
                  {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedIssues.length > 0 && (
                  <>
                    <Button variant="outline" size="sm">
                      Bulk Assign
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Labels
                    </Button>
                  </>
                )}
                <Button size="sm">New Issue</Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Issues Table */}
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Labels</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead className="w-32">AI Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow
                    key={issue.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIssues.includes(issue.id)}
                        onCheckedChange={() => toggleIssueSelection(issue.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {issue.number}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/repo/${params.name}/issues/${issue.id}`}
                        className="hover:underline"
                      >
                        {issue.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {issue.labels.slice(0, 2).map((label) => (
                          <Badge key={label} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                        {issue.labels.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{issue.labels.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {issue.assignee?.name || 'Unassigned'}
                    </TableCell>
                    <TableCell>
                      {issue.aiScore && (
                        <div className="flex items-center gap-1">
                          <div className="font-mono font-semibold text-primary">
                            {issue.aiScore.toFixed(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">/10</div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </AppLayout>
  );
}
