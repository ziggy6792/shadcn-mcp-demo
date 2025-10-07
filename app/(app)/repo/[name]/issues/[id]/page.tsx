'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getIssueById, mockDelay } from '@/lib/mock-data';
import {
  MessageSquare,
  Clock,
  User,
  Sparkles,
  Code,
  FileText,
  GitBranch,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function IssueDetailPage() {
  const params = useParams();
  const issueId = params.id as string;
  const issue = getIssueById(issueId);

  const [activeTab, setActiveTab] = useState('suggestions');
  const [aiLoading, setAiLoading] = useState(false);
  const [showFixModal, setShowFixModal] = useState(false);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [aiGeneratedFix, setAiGeneratedFix] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  if (!issue) {
    return (
      <div className="container py-6">
        <p>Issue not found</p>
      </div>
    );
  }

  const handleGenerateFix = async () => {
    setAiLoading(true);
    toast.info('AI is generating a fix...');

    await mockDelay(2000);

    const mockFix = `--- a/components/LoginForm.tsx
+++ b/components/LoginForm.tsx
@@ -1,6 +1,7 @@
 import { useState } from 'react';
+import { validateEmail } from '@/lib/validation';

 export function LoginForm() {
   const [email, setEmail] = useState('');
+  const [error, setError] = useState('');

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
+
+    if (!validateEmail(email)) {
+      setError('Please enter a valid email address');
+      return;
+    }
+
     // Submit logic
   };`;

    setAiGeneratedFix(mockFix);
    setShowFixModal(true);
    setAiLoading(false);
    toast.success('Fix generated successfully!');
  };

  const handleExplain = async () => {
    setAiLoading(true);
    toast.info('AI is analyzing the issue...');

    await mockDelay(1500);

    const mockExplanation = `## Issue Analysis

**Root Cause:** Safari's built-in form validation behaves differently from Chrome and Firefox. The HTML5 \`pattern\` attribute and \`type="email"\` validation may not trigger native browser validation in the same way.

**Impact:** Users on Safari (approximately 20% of your user base) can submit invalid email addresses, leading to:
- Failed authentication attempts
- Poor user experience
- Increased support tickets

**Recommended Solution:**
1. Implement custom JavaScript validation that works across all browsers
2. Add polyfill for Safari-specific validation gaps
3. Provide clear, consistent error messaging
4. Consider using a robust validation library like \`validator.js\`

**Priority:** High - affects significant portion of user base and core functionality`;

    setAiExplanation(mockExplanation);
    setShowExplainModal(true);
    setAiLoading(false);
    toast.success('Analysis complete!');
  };

  const handleSummarize = async () => {
    setAiLoading(true);
    toast.info('AI is summarizing the discussion...');

    await mockDelay(1500);

    setAiLoading(false);
    toast.success('Summary generated!', {
      description: 'The discussion indicates this is a browser-specific validation bug affecting Safari users. A fix is being developed.',
    });
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span>/</span>
        <Link href={`/repo/${issue.repository}/issues`} className="hover:text-foreground">
          {issue.repository}
        </Link>
        <span>/</span>
        <span>#{issue.number}</span>
      </div>

      {/* Issue Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {issue.title}
              <span className="ml-3 text-muted-foreground font-normal">
                #{issue.number}
              </span>
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant={issue.status === 'open' ? 'default' : 'secondary'}>
                {issue.status}
              </Badge>
              <span>
                {issue.author.name} opened this issue
              </span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <MessageSquare className="h-3 w-3" />
              <span>{issue.comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Labels and Tags */}
        <div className="flex flex-wrap gap-2">
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
          {issue.aiTags?.map((tag, i) => (
            <Badge key={i} variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Body */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={issue.author.avatar} />
                  <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{issue.author.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(issue.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{issue.body}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          {issue.comments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Comments</h2>
              {issue.comments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{comment.author.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
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

          {/* AI Actions Bar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                AI Actions
              </CardTitle>
              <CardDescription>
                Let AI help you understand and solve this issue
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={handleExplain} disabled={aiLoading}>
                {aiLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Explain Issue
              </Button>
              <Button onClick={handleGenerateFix} disabled={aiLoading} variant="default">
                {aiLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Code className="mr-2 h-4 w-4" />
                )}
                Generate Fix
              </Button>
              <Button onClick={handleSummarize} disabled={aiLoading} variant="outline">
                {aiLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <MessageSquare className="mr-2 h-4 w-4" />
                )}
                Summarize Discussion
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Add form validation polyfill</p>
                        <p className="text-muted-foreground text-xs">
                          Ensure consistent validation across browsers
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Update email validation logic</p>
                        <p className="text-muted-foreground text-xs">
                          Use JavaScript validation as fallback
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Add browser-specific tests</p>
                        <p className="text-muted-foreground text-xs">
                          Prevent future Safari-specific issues
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assignees</CardTitle>
                </CardHeader>
                <CardContent>
                  {issue.assignees.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {issue.assignees.map((assignee, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{assignee[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{assignee}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No one assigned</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Related Issues</CardTitle>
                  <CardDescription className="text-xs">
                    AI-detected similar issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Link href="#" className="block group">
                      <div className="text-sm">
                        <p className="font-medium group-hover:text-primary">
                          Form validation not working on mobile Safari
                        </p>
                        <p className="text-muted-foreground text-xs">
                          #124 • 85% similar
                        </p>
                      </div>
                    </Link>
                    <Separator />
                    <Link href="#" className="block group">
                      <div className="text-sm">
                        <p className="font-medium group-hover:text-primary">
                          Email input accepts invalid formats
                        </p>
                        <p className="text-muted-foreground text-xs">
                          #98 • 72% similar
                        </p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Fix Modal */}
      <Dialog open={showFixModal} onOpenChange={setShowFixModal}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>AI Generated Fix</DialogTitle>
            <DialogDescription>
              Review the proposed changes and apply them to your codebase
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
              {aiGeneratedFix}
            </pre>
          </ScrollArea>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowFixModal(false)}>
              Close
            </Button>
            <Button onClick={() => {
              toast.success('Fix copied to clipboard!');
              navigator.clipboard.writeText(aiGeneratedFix || '');
            }}>
              <Code className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Explain Modal */}
      <Dialog open={showExplainModal} onOpenChange={setShowExplainModal}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>AI Issue Explanation</DialogTitle>
            <DialogDescription>
              Detailed analysis of the issue and recommended approach
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="prose prose-sm dark:prose-invert max-w-none p-4">
              <pre className="whitespace-pre-wrap text-sm">{aiExplanation}</pre>
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowExplainModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
