'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  SparklesIcon,
  MessageSquareIcon,
  CodeIcon,
  FileTextIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
} from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { AnimatedModal } from '@/components/ui/animated-modal';
import { Timeline } from '@/components/ui/timeline';
import { Sparkles } from '@/components/ui/sparkles';
import { Loader } from '@/components/ui/loader';
import { MovingBorder } from '@/components/ui/moving-border';
import { getIssueById, getAIFixByIssueId } from '@/lib/mock-data';
import { formatRelativeTime, formatDateTime, getPriorityColor } from '@/lib/utils/format';

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const issueId = params.id as string;
  const repoName = params.name as string;

  const issue = getIssueById('issue1'); // In real app, find by issue number
  const aiFix = getAIFixByIssueId('issue1');

  const [showFixModal, setShowFixModal] = useState(false);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('suggestions');

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Issue not found</h2>
          <p className="text-muted-foreground mb-4">
            The issue you're looking for doesn't exist.
          </p>
          <Link
            href={`/repo/${repoName}/issues`}
            className="text-primary hover:underline"
          >
            Back to issues
          </Link>
        </div>
      </div>
    );
  }

  const handleGenerateFix = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowFixModal(true);
  };

  const handleExplain = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setShowExplainModal(true);
  };

  const timelineData = [
    {
      title: 'Issue Created',
      content: (
        <div className="text-sm">
          <p className="text-muted-foreground mb-2">
            Created by <span className="font-semibold">{issue.author.name}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(issue.createdAt)}
          </p>
        </div>
      ),
    },
    ...issue.comments.map((comment, idx) => ({
      title: `Comment by ${comment.author.name}`,
      content: (
        <div className="text-sm">
          <p className="mb-2">{comment.body}</p>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(comment.createdAt)}
          </p>
        </div>
      ),
    })),
    {
      title: 'AI Analysis Complete',
      content: (
        <div className="text-sm">
          <div className="flex items-center gap-2 mb-2">
            <SparklesIcon className="h-4 w-4 text-purple-500" />
            <span className="font-semibold text-purple-500">AI Insights Generated</span>
          </div>
          <p className="text-muted-foreground">{issue.aiSummary}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Sparkles className="absolute inset-0 opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to issues
            </button>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircleIcon
                    className={`h-5 w-5 ${
                      issue.state === 'open' ? 'text-green-500' : 'text-purple-500'
                    }`}
                  />
                  <h1 className="text-2xl font-bold">{issue.title}</h1>
                  <span className="text-muted-foreground">#{issue.number}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-3 w-3" />
                    {issue.author.username}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    opened {formatRelativeTime(issue.createdAt)}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      issue.state === 'open'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }`}
                  >
                    {issue.state}
                  </span>
                </div>
              </div>
              {issue.aiPriority && (
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getPriorityColor(
                    issue.aiPriority
                  )}`}
                >
                  {issue.aiPriority} priority
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Issue Body */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={issue.author.avatar}
                    alt={issue.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{issue.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      @{issue.author.username}
                    </div>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {issue.body}
                  </pre>
                </div>
                {issue.labels.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 flex-wrap">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
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
              </div>

              {/* AI Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button onClick={handleGenerateFix} disabled={isGenerating}>
                  <MovingBorder duration={3000} className="bg-card hover:bg-accent">
                    <div className="flex items-center gap-2 px-6 py-3">
                      <SparklesIcon className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold">Generate Fix</span>
                    </div>
                  </MovingBorder>
                </button>
                <button
                  onClick={handleExplain}
                  disabled={isGenerating}
                  className="px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-semibold flex items-center gap-2"
                >
                  <FileTextIcon className="h-4 w-4" />
                  Explain Issue
                </button>
                <button
                  disabled={isGenerating}
                  className="px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-semibold flex items-center gap-2"
                >
                  <MessageSquareIcon className="h-4 w-4" />
                  Summarize Discussion
                </button>
              </div>

              {isGenerating && (
                <div className="flex items-center justify-center py-8">
                  <Loader className="h-8 w-8" />
                  <span className="ml-3 text-sm text-muted-foreground">
                    AI is analyzing...
                  </span>
                </div>
              )}

              {/* Timeline */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  Activity Timeline
                </h3>
                <Timeline data={timelineData} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Insights Panel */}
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="h-5 w-5 text-purple-500" />
                  <h3 className="font-bold text-purple-500">AI Insights</h3>
                </div>
                <p className="text-sm mb-4">{issue.aiSummary}</p>
                {issue.aiTags && issue.aiTags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-purple-500">AI Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {issue.aiTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-500 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Assignees */}
              {issue.assignees.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold mb-3">Assignees</h3>
                  <div className="space-y-2">
                    {issue.assignees.map((assignee) => (
                      <div key={assignee.id} className="flex items-center gap-2">
                        <img
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-semibold">{assignee.name}</div>
                          <div className="text-xs text-muted-foreground">
                            @{assignee.username}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Issues */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-3">Related Issues</h3>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    #340 API rate limiting not working
                  </Link>
                  <Link
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    #338 Input validation improvements
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Fix Modal */}
      {showFixModal && aiFix && (
        <AnimatedModal open={showFixModal} onOpenChange={setShowFixModal}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CodeIcon className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold">AI Generated Fix</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{aiFix.explanation}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Affected Files</h3>
                <div className="flex gap-2">
                  {aiFix.files.map((file, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-mono"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Code Changes</h3>
                <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto font-mono">
                  {aiFix.diff}
                </pre>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-semibold transition-colors">
                  Apply Fix
                </button>
                <button
                  onClick={() => setShowFixModal(false)}
                  className="flex-1 border border-border hover:bg-accent py-2 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </AnimatedModal>
      )}

      {/* Explain Modal */}
      {showExplainModal && (
        <AnimatedModal open={showExplainModal} onOpenChange={setShowExplainModal}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileTextIcon className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Issue Explanation</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Root Cause</h3>
                <p className="text-muted-foreground">
                  The issue stems from inadequate input validation in the form handler.
                  The current implementation uses a hardcoded limit of 255 characters
                  without proper error handling.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Impact</h3>
                <p className="text-muted-foreground">
                  Users entering longer text experience application crashes due to
                  unhandled exceptions. This affects approximately 15% of form
                  submissions based on usage data.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Recommended Action</h3>
                <p className="text-muted-foreground">
                  Implement proper validation with user-friendly error messages and
                  increase the character limit to a more reasonable threshold (suggested:
                  1000 characters).
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowExplainModal(false)}
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-semibold transition-colors"
            >
              Got it
            </button>
          </div>
        </AnimatedModal>
      )}
    </div>
  );
}
