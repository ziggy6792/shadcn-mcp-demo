'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/mocks/api';
import { store } from '@/lib/store';
import { Issue } from '@/lib/mocks/data';
import { Search, Filter, AlertCircle, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function IssuesPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    const user = store.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    store.setCurrentRepo(name);
    loadIssues();
  }, [name, router]);

  const loadIssues = async () => {
    setIsLoading(true);
    const data = await api.getIssues(name);
    setIssues(data);
    setIsLoading(false);
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLabel = filterLabel === 'all' || issue.labels.includes(filterLabel);
    const matchesPriority = filterPriority === 'all' || issue.aiPriority === filterPriority;
    return matchesSearch && matchesLabel && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const allLabels = Array.from(new Set(issues.flatMap((issue) => issue.labels)));

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Issues
          </h1>
          <p className="text-muted-foreground">
            Manage and triage issues with AI-powered insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterLabel} onValueChange={setFilterLabel}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Labels</SelectItem>
              {allLabels.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <AlertCircle className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by priority" />
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

        <div className="space-y-3">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No issues found matching your filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map((issue) => (
              <Card
                key={issue.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => router.push(`/repo/${name}/issues/${issue.number}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">#{issue.number}</span>
                        <h3 className="text-lg font-semibold">{issue.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {issue.body}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getPriorityColor(issue.aiPriority)}>
                          {issue.aiPriority.toUpperCase()}
                        </Badge>
                        {issue.labels.map((label) => (
                          <Badge key={label} variant="outline">
                            {label}
                          </Badge>
                        ))}
                        {issue.aiTags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            AI: {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{issue.author}</span>
                        </div>
                        {issue.assignee && (
                          <div className="flex items-center gap-1">
                            <span>assigned to {issue.assignee}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            updated {formatDistanceToNow(new Date(issue.updatedAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredIssues.length > 0 && (
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
