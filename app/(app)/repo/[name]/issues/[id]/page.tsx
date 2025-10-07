'use client'

import { useState } from 'react'
import { ArrowLeft, MessageSquare, Sparkles, Code, FileText, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { mockIssues, mockRepositories, mockAIFix } from '@/lib/mock-data'
import { formatDate, getPriorityColor } from '@/lib/format'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

export default function IssueDetailPage({
  params
}: {
  params: { name: string; id: string }
}) {
  const router = useRouter()
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiAction, setAIAction] = useState<'explain' | 'fix' | 'summarize'>('explain')
  const [isGenerating, setIsGenerating] = useState(false)

  // Find the repository and issue
  const repo = mockRepositories.find(r => r.name === params.name)
  const issues = mockIssues[repo?.id || '1'] || []
  const issue = issues.find(i => i.number === parseInt(params.id))

  if (!issue || !repo) {
    return <div>Issue not found</div>
  }

  const handleAIAction = (action: 'explain' | 'fix' | 'summarize') => {
    setAIAction(action)
    setShowAIModal(true)
    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const getAIContent = () => {
    if (isGenerating) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      )
    }

    switch (aiAction) {
      case 'explain':
        return (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-sm">{issue.aiSummary}</p>
            <p className="text-sm mt-4">
              <strong>Root Cause:</strong> The component is rendering all rows at once,
              causing the browser to become unresponsive with large datasets.
            </p>
            <p className="text-sm mt-2">
              <strong>Recommended Solution:</strong> Implement virtualization using
              react-window or similar library to only render visible rows.
            </p>
          </div>
        )
      case 'fix':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              AI-generated fix implementing react-window virtualization:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              <code>{mockAIFix}</code>
            </pre>
            <div className="flex gap-2">
              <Button size="sm">Apply Fix</Button>
              <Button size="sm" variant="outline">Copy to Clipboard</Button>
            </div>
          </div>
        )
      case 'summarize':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Issue Summary</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Critical performance issue affecting production</li>
              <li>Occurs with datasets over 10,000 rows</li>
              <li>Browser becomes unresponsive and crashes</li>
              <li>2 users have reproduced the issue</li>
              <li>Recommended fix: implement virtualization</li>
              <li>Estimated effort: 4-6 hours</li>
            </ul>
          </div>
        )
    }
  }

  // Related issues based on AI
  const relatedIssues = issues.filter(i =>
    i.id !== issue.id &&
    i.aiTags?.some(tag => issue.aiTags?.includes(tag))
  ).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Issues
      </Button>

      {/* Issue Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{issue.title}</h1>
              <Badge variant={getPriorityColor(issue.aiPriority || 'low') as any}>
                {issue.aiPriority}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              #{issue.number} opened {formatDate(issue.createdAt)} by {issue.author.username}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
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
      </div>

      {/* AI Action Bar */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAIAction('explain')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Explain Issue
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAIAction('fix')}
              >
                <Code className="mr-2 h-4 w-4" />
                Generate Fix
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAIAction('summarize')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Summarize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {issue.body}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comments ({issue.comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{comment.author.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                </div>
              ))}
              {issue.comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-blue-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Summary</p>
                <p className="text-sm text-muted-foreground">{issue.aiSummary}</p>
              </div>
              {issue.aiTags && issue.aiTags.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Tags</p>
                  <div className="flex gap-1 flex-wrap">
                    {issue.aiTags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assignee */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Assignee</p>
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
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Status</p>
                <Badge variant={issue.state === 'open' ? 'default' : 'secondary'}>
                  {issue.state}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Related Issues */}
          {relatedIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <LinkIcon className="h-4 w-4" />
                  Related Issues
                </CardTitle>
                <CardDescription>AI-detected similar issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedIssues.map((relatedIssue) => (
                  <div
                    key={relatedIssue.id}
                    className="text-sm hover:bg-accent p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => router.push(`/repo/${params.name}/issues/${relatedIssue.number}`)}
                  >
                    <p className="font-medium">#{relatedIssue.number} {relatedIssue.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(relatedIssue.updatedAt)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* AI Modal */}
      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              AI {aiAction === 'explain' ? 'Explanation' : aiAction === 'fix' ? 'Generated Fix' : 'Summary'}
            </DialogTitle>
            <DialogDescription>
              AI-powered analysis for issue #{issue.number}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {getAIContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
