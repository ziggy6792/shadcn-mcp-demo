'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getIssuesByRepository, getRepositoryByName } from '@/lib/mock-data';
import { Search, Filter, SortAsc, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { Issue } from '@/lib/types';

const priorityColors = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

const priorityLabels = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function RepoIssuesPage() {
  const params = useParams();
  const repoName = params.name as string;
  const repository = getRepositoryByName(repoName);
  const allIssues = getIssuesByRepository(repoName);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('open');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredIssues = allIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.aiPriority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (!repository) {
    return (
      <div className="container py-6">
        <p>Repository not found</p>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <span>{repository.fullName}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{repository.name}</h1>
            <p className="text-muted-foreground">{repository.description}</p>
          </div>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
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
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'}
          </p>
        </div>

        <div className="space-y-2">
          {filteredIssues.map((issue) => (
            <Link key={issue.id} href={`/repo/${repoName}/issues/${issue.id}`}>
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <AlertCircle className={`h-5 w-5 ${issue.status === 'open' ? 'text-green-500' : 'text-purple-500'}`} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-base">
                        {issue.title}
                        <span className="ml-2 text-muted-foreground font-normal">
                          #{issue.number}
                        </span>
                      </h3>
                      {issue.aiPriority && (
                        <Badge
                          variant="secondary"
                          className={`${priorityColors[issue.aiPriority]} text-white flex-shrink-0`}
                        >
                          {priorityLabels[issue.aiPriority]}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <span>
                        Opened by {issue.author.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                      {issue.comments.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{issue.comments.length} comments</span>
                        </>
                      )}
                    </div>

                    {issue.labels.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {issue.labels.map((label) => (
                          <Badge
                            key={label.id}
                            variant="outline"
                            style={{
                              borderColor: label.color,
                              color: label.color,
                            }}
                          >
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {issue.aiTags && issue.aiTags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Sparkles className="h-3 w-3 text-muted-foreground" />
                        {issue.aiTags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredIssues.length === 0 && (
            <Card className="p-12">
              <div className="text-center space-y-2">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="font-semibold text-lg">No issues found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
