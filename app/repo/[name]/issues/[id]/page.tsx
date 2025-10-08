'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, FileCode, Link as LinkIcon } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockIssues, mockAIInsights } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function IssueDetailPage({
  params,
}: {
  params: { name: string; id: string };
}) {
  const issue = mockIssues.find((i) => i.id === params.id);
  const aiInsights = mockAIInsights.filter((i) => i.issueId === params.id);

  const [fixDialogOpen, setFixDialogOpen] = useState(false);

  if (!issue) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Issue not found</h1>
            <p className="text-muted-foreground">
              The issue you're looking for doesn't exist.
            </p>
            <Link href={`/repo/${params.name}/issues`}>
              <Button className="mt-4">Back to Issues</Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const handleGenerateFix = () => {
    toast.success('Generating AI fix...', {
      description: 'This may take a few moments',
    });
    setTimeout(() => {
      toast.success('Fix generated successfully!');
      setFixDialogOpen(true);
    }, 2000);
  };

  const handleExplainIssue = () => {
    toast.success('Analyzing issue with AI...');
    setTimeout(() => {
      toast.success('Analysis complete!');
    }, 1500);
  };

  const handleSummarize = () => {
    toast.success('Summarizing discussion...');
    setTimeout(() => {
      toast.success('Summary generated!');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-8 space-y-6">
              {/* Back Button */}
              <Link href={`/repo/${params.name}/issues`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Issues
                </Button>
              </Link>

              {/* Issue Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-mono">
                          #{issue.number}
                        </span>
                        <Badge
                          variant={
                            issue.status === 'open'
                              ? 'destructive'
                              : issue.status === 'in_progress'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {issue.status}
                        </Badge>
                        <Badge
                          variant={
                            issue.priority === 'critical' || issue.priority === 'high'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {issue.priority} priority
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{issue.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={issue.author.avatar} />
                            <AvatarFallback>
                              {issue.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{issue.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>
                          Opened on {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                        {issue.assignee && (
                          <>
                            <span>•</span>
                            <span>Assigned to {issue.assignee.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {issue.aiScore && (
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">AI Score</div>
                        <div className="text-3xl font-bold text-primary">
                          {issue.aiScore.toFixed(1)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {issue.labels.map((label) => (
                        <Badge key={label} variant="outline">
                          {label}
                        </Badge>
                      ))}
                      {issue.aiTags?.map((tag) => (
                        <Badge key={tag} className="bg-primary/10">
                          <Sparkles className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Separator />
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{issue.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {issue.comments.map((comment, index) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback>
                            {comment.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 text-sm">
                            {comment.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {issue.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No comments yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Action Bar */}
          <div className="border-t p-4 bg-background">
            <div className="flex gap-2">
              <Button onClick={handleGenerateFix}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Fix
              </Button>
              <Button variant="outline" onClick={handleExplainIssue}>
                <FileCode className="mr-2 h-4 w-4" />
                Explain Issue
              </Button>
              <Button variant="outline" onClick={handleSummarize}>
                Summarize Discussion
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Insights */}
        <div className="w-96 border-l bg-muted/10">
          <Tabs defaultValue="suggestions" className="h-full flex flex-col">
            <div className="border-b px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="suggestions" className="flex-1">
                  Suggestions
                </TabsTrigger>
                <TabsTrigger value="fix" className="flex-1">
                  Fix Preview
                </TabsTrigger>
                <TabsTrigger value="related" className="flex-1">
                  Related
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <TabsContent value="suggestions" className="mt-0">
                  {aiInsights
                    .filter((i) => i.type === 'suggestion')
                    .map((insight) => (
                      <Card key={insight.id}>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            AI Suggestion
                          </CardTitle>
                          <CardDescription>
                            Confidence: {(insight.confidence * 100).toFixed(0)}%
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          {insight.content}
                        </CardContent>
                      </Card>
                    ))}
                  {aiInsights.filter((i) => i.type === 'explanation').map((insight) => (
                    <Card key={insight.id}>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-primary" />
                          Explanation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        {insight.content}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="fix" className="mt-0">
                  {aiInsights
                    .filter((i) => i.type === 'fix')
                    .map((insight) => (
                      <Card key={insight.id}>
                        <CardHeader>
                          <CardTitle className="text-sm">Proposed Fix</CardTitle>
                          <CardDescription>
                            Confidence: {(insight.confidence * 100).toFixed(0)}%
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                            {insight.content}
                          </pre>
                          <Button className="w-full mt-4" size="sm">
                            Apply Fix
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  {aiInsights.filter((i) => i.type === 'fix').length === 0 && (
                    <Card>
                      <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                        Click "Generate Fix" to see AI-powered solutions
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="related" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Related Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {mockIssues
                        .filter(
                          (i) =>
                            i.id !== issue.id &&
                            i.labels.some((l) => issue.labels.includes(l))
                        )
                        .slice(0, 3)
                        .map((relatedIssue) => (
                          <Link
                            key={relatedIssue.id}
                            href={`/repo/${params.name}/issues/${relatedIssue.id}`}
                          >
                            <div className="p-2 rounded-lg hover:bg-muted cursor-pointer">
                              <div className="text-sm font-medium">
                                #{relatedIssue.number} {relatedIssue.title}
                              </div>
                              <div className="flex gap-1 mt-1">
                                {relatedIssue.labels.slice(0, 2).map((label) => (
                                  <Badge key={label} variant="outline" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </Link>
                        ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {/* AI Fix Dialog */}
      <Dialog open={fixDialogOpen} onOpenChange={setFixDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI-Generated Fix</DialogTitle>
            <DialogDescription>
              Review the proposed solution and apply if appropriate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {`// Proposed fix for memory leak issue
class WorkerCache {
  private cache: WeakMap<any, any> = new WeakMap();
  private maxSize: number = 1000;
  private entries: number = 0;

  set(key: any, value: any) {
    if (this.entries >= this.maxSize) {
      // Clear oldest entries
      this.cache = new WeakMap();
      this.entries = 0;
    }
    this.cache.set(key, value);
    this.entries++;
  }

  get(key: any) {
    return this.cache.get(key);
  }
}`}
            </pre>
            <div className="flex gap-2">
              <Button onClick={() => {
                toast.success('Fix applied to branch');
                setFixDialogOpen(false);
              }}>
                Apply Fix
              </Button>
              <Button variant="outline" onClick={() => setFixDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
