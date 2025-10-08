'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/mocks/api';
import { store } from '@/lib/store';
import { Issue } from '@/lib/mocks/data';
import { User, Clock, MessageSquare, Sparkles, Code, FileText, GitCompare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ name: string; id: string }>;
}) {
  const { name, id } = use(params);
  const router = useRouter();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiActionLoading, setAiActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const user = store.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    loadIssue();
  }, [name, id, router]);

  const loadIssue = async () => {
    setIsLoading(true);
    const data = await api.getIssue(name, parseInt(id));
    setIssue(data || null);
    setIsLoading(false);
  };

  const handleAIAction = async (action: 'explain' | 'fix' | 'summarize') => {
    if (!issue) return;

    setAiActionLoading(action);
    try {
      await api.createAITask(issue.id, issue.title, action);
      toast.success(`AI ${action} task created! Check the AI Tasks page.`);

      // Simulate showing result after delay
      setTimeout(() => {
        if (action === 'explain') {
          toast.info('AI Explanation ready! This issue appears to be caused by touch event handling conflicts.');
        } else if (action === 'fix') {
          toast.info('AI Fix generated! A code patch is ready for review.');
        } else {
          toast.info('AI Summary ready! The discussion centers around mobile Safari compatibility.');
        }
      }, 3000);
    } catch (error) {
      toast.error('Failed to create AI task');
    } finally {
      setAiActionLoading(null);
    }
  };

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

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!issue) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Issue not found.</p>
              <Button className="mt-4" onClick={() => router.back()}>
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>#{issue.number}</span>
                <span>•</span>
                <span className={`font-medium ${issue.state === 'open' ? 'text-green-500' : 'text-purple-500'}`}>
                  {issue.state.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">{issue.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getPriorityColor(issue.aiPriority)}>
                  {issue.aiPriority.toUpperCase()} PRIORITY
                </Badge>
                {issue.labels.map((label) => (
                  <Badge key={label} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{issue.author} opened this issue</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{issue.comments.length} comments</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{issue.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{issue.body}</pre>
                </div>
              </CardContent>
            </Card>

            {issue.comments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Comments</h2>
                {issue.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{comment.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - AI Insights */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Actions
                </CardTitle>
                <CardDescription>Get AI-powered insights and solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleAIAction('explain')}
                  disabled={aiActionLoading !== null}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {aiActionLoading === 'explain' ? 'Explaining...' : 'Explain Issue'}
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleAIAction('fix')}
                  disabled={aiActionLoading !== null}
                >
                  <Code className="h-4 w-4 mr-2" />
                  {aiActionLoading === 'fix' ? 'Generating...' : 'Generate Fix'}
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleAIAction('summarize')}
                  disabled={aiActionLoading !== null}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {aiActionLoading === 'summarize' ? 'Summarizing...' : 'Summarize Discussion'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="suggestions">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="related">Related</TabsTrigger>
                  </TabsList>
                  <TabsContent value="suggestions" className="space-y-3 mt-4">
                    <div className="rounded-lg border p-3 space-y-2">
                      <p className="text-sm font-semibold">Potential Root Cause</p>
                      <p className="text-sm text-muted-foreground">
                        Touch event propagation may be blocked by an overlay element.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3 space-y-2">
                      <p className="text-sm font-semibold">Suggested Fix</p>
                      <p className="text-sm text-muted-foreground">
                        Add <code className="px-1 py-0.5 bg-muted rounded">pointer-events: auto</code> to the button element.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3 space-y-2">
                      <p className="text-sm font-semibold">Testing Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        Test on iOS Safari versions 15, 16, and 17.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="related" className="space-y-3 mt-4">
                    <div className="rounded-lg border p-3 space-y-1 cursor-pointer hover:bg-muted/50">
                      <p className="text-sm font-semibold">#340 - Mobile input issues</p>
                      <p className="text-xs text-muted-foreground">Similar touch event problem</p>
                    </div>
                    <div className="rounded-lg border p-3 space-y-1 cursor-pointer hover:bg-muted/50">
                      <p className="text-sm font-semibold">#335 - Safari rendering bug</p>
                      <p className="text-xs text-muted-foreground">iOS-specific rendering</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {issue.aiTags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
