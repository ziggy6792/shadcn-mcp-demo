'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertCircleIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  SparklesIcon,
  UserIcon,
  TagIcon,
  ArrowUpDownIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FocusCards } from '@/components/ui/focus-cards';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { mockIssues, getRepositoryById } from '@/lib/mock-data';
import { formatRelativeTime, getPriorityColor } from '@/lib/utils/format';

export default function RepoIssuesPage() {
  const params = useParams();
  const repoName = params.name as string;
  const repo = getRepositoryById('repo1'); // In real app, find by name

  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<'all' | 'open' | 'closed'>('open');
  const [sortBy, setSortBy] = useState<'recent' | 'priority'>('priority');

  const filteredIssues = mockIssues
    .filter((issue) => {
      if (filterState !== 'all' && issue.state !== filterState) return false;
      if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return (
          (priorityOrder[a.aiPriority || 'low'] || 3) -
          (priorityOrder[b.aiPriority || 'low'] || 3)
        );
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{repoName}</h1>
              <p className="text-muted-foreground mt-1">{repo?.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {repo?.openIssuesCount} open
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {repo?.closedIssuesCount} closed
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Tabs
                value={filterState}
                onValueChange={(v) => setFilterState(v as any)}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
              <button
                onClick={() =>
                  setSortBy((prev) => (prev === 'priority' ? 'recent' : 'priority'))
                }
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-2"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                {sortBy === 'priority' ? 'Priority' : 'Recent'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* AI Summary Banner */}
        <div className="mb-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 flex items-start gap-3">
          <SparklesIcon className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-500 mb-1">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              {filteredIssues.filter((i) => i.aiPriority === 'critical').length}{' '}
              critical issues requiring immediate attention. AI has analyzed all issues
              and tagged them by priority.
            </p>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {filteredIssues.map((issue) => (
            <Link
              key={issue.id}
              href={`/repo/${repoName}/issues/${issue.number}`}
              className="block"
            >
              <div className="group p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircleIcon
                        className={`h-4 w-4 ${
                          issue.state === 'open'
                            ? 'text-green-500'
                            : 'text-purple-500'
                        }`}
                      />
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {issue.title}
                      </h3>
                      <span className="text-muted-foreground">#{issue.number}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {issue.aiSummary || issue.body.slice(0, 150)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />
                        {issue.author.username}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {formatRelativeTime(issue.updatedAt)}
                      </div>
                      {issue.comments.length > 0 && (
                        <span>{issue.comments.length} comments</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {issue.aiPriority && (
                      <span
                        className={`text-xs px-3 py-1 rounded-full border font-semibold ${getPriorityColor(
                          issue.aiPriority
                        )}`}
                      >
                        {issue.aiPriority}
                      </span>
                    )}
                    {issue.assignees.length > 0 && (
                      <div className="flex -space-x-2">
                        <AnimatedTooltip
                          items={issue.assignees.map((a) => ({
                            id: a.id,
                            name: a.name,
                            designation: a.username,
                            image: a.avatar,
                          }))}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {issue.labels.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <TagIcon className="h-3 w-3 text-muted-foreground" />
                    {issue.labels.map((label) => (
                      <span
                        key={label.id}
                        className="text-xs px-2 py-1 rounded border"
                        style={{
                          backgroundColor: `${label.color}20`,
                          borderColor: `${label.color}40`,
                          color: label.color,
                        }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}
                {issue.aiTags && issue.aiTags.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <SparklesIcon className="h-3 w-3 text-purple-500" />
                    {issue.aiTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-500 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-16">
            <AlertCircleIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
