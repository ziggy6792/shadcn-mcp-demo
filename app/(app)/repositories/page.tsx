'use client';

import Link from 'next/link';
import {
  GithubIcon,
  StarIcon,
  GitBranchIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { CardHoverEffect } from '@/components/ui/card-hover-effect';
import { mockRepositories } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils/format';

export default function RepositoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GithubIcon className="h-8 w-8" />
            Repositories
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your connected repositories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <GitBranchIcon className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{mockRepositories.length}</span>
            </div>
            <div className="text-sm text-muted-foreground">Connected Repos</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <AlertCircleIcon className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">
                {mockRepositories.reduce((sum, repo) => sum + repo.openIssuesCount, 0)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Total Open Issues</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2Icon className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {mockRepositories.reduce(
                  (sum, repo) => sum + repo.closedIssuesCount,
                  0
                )}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Total Closed Issues</div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="space-y-4">
          {mockRepositories.map((repo) => (
            <Link
              key={repo.id}
              href={`/repo/${repo.name}/issues`}
              className="block group"
            >
              <div className="rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      <GithubIcon className="h-5 w-5" />
                      {repo.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              repo.language === 'TypeScript'
                                ? '#3178c6'
                                : repo.language === 'Python'
                                ? '#3776ab'
                                : '#ccc',
                          }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUpIcon className="h-4 w-4" />
                        <span>Updated {formatRelativeTime(repo.lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <AlertCircleIcon className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold">
                      {repo.openIssuesCount} open
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {repo.closedIssuesCount} closed
                    </span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      View Issues →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Add Repository CTA */}
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
          <GithubIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add More Repositories</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect additional GitHub repositories to track and manage more issues
          </p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition-colors">
            Connect Repository
          </button>
        </div>
      </div>
    </div>
  );
}
