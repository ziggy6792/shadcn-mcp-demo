"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Sparkles,
  Code,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { SparklesText } from "@/components/ui/sparkles-text";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { mockIssues, mockComments } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const priorityColors = {
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function IssueDetailPage() {
  const params = useParams();
  const issueNumber = parseInt(params.id as string);
  const repoName = params.name as string;

  const issue = mockIssues.find((i) => i.number === issueNumber);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isGeneratingFix, setIsGeneratingFix] = useState(false);

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const handleGenerateFix = async () => {
    setIsGeneratingFix(true);
    toast.loading("Generating AI fix...");

    setTimeout(() => {
      setIsGeneratingFix(false);
      toast.dismiss();
      toast.success("AI fix generated successfully!");
      setIsAiPanelOpen(true);
    }, 2000);
  };

  const handleExplainIssue = () => {
    toast.info("AI is analyzing the issue...");
    setTimeout(() => {
      toast.success("Analysis complete!");
      setIsAiPanelOpen(true);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{repoName}</span>
                  <span>/</span>
                  <span>Issues</span>
                  <span>/</span>
                  <span>#{issue.number}</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{issue.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn("text-sm", priorityColors[issue.priority])}
                  >
                    {issue.priority}
                  </Badge>
                  <Badge variant={issue.status === "open" ? "default" : "secondary"}>
                    {issue.status}
                  </Badge>
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="outline">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <BlurFade delay={0.15} inView>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={issue.author.avatar} />
                          <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold">{issue.author.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Opened {new Date(issue.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {issue.description}
                      </p>
                    </CardContent>
                  </Card>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Comments ({mockComments.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 p-4 rounded-lg border bg-card">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.avatar} />
                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                {comment.author.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </BlurFade>

                {/* AI Action Buttons */}
                <BlurFade delay={0.25} inView>
                  <div className="flex flex-wrap gap-3">
                    <ShimmerButton
                      className="gap-2"
                      onClick={handleGenerateFix}
                      disabled={isGeneratingFix}
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate Fix
                    </ShimmerButton>
                    <Button variant="outline" className="gap-2" onClick={handleExplainIssue}>
                      <FileText className="h-4 w-4" />
                      Explain Issue
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Code className="h-4 w-4" />
                      Suggest Solution
                    </Button>
                  </div>
                </BlurFade>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <BlurFade delay={0.3} inView>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Assignee</div>
                        {issue.assignee ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={issue.assignee.avatar} />
                              <AvatarFallback>{issue.assignee.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{issue.assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </div>
                      <Separator />
                      <div>
                        <div className="text-muted-foreground mb-1">Created</div>
                        <div>{new Date(issue.createdAt).toLocaleDateString()}</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-muted-foreground mb-1">Last Updated</div>
                        <div>{new Date(issue.updatedAt).toLocaleDateString()}</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-muted-foreground mb-1">Comments</div>
                        <div>{issue.comments}</div>
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>

                {issue.aiInsight && (
                  <BlurFade delay={0.35} inView>
                    <NeonGradientCard className="relative overflow-hidden">
                      <BorderBeam size={250} duration={12} delay={9} />
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          <SparklesText text="AI Insights" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Summary</div>
                          <p className="text-sm">{issue.aiInsight.summary}</p>
                        </div>
                        {issue.aiInsight.suggestedFix && (
                          <>
                            <Separator />
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Suggested Fix
                              </div>
                              <p className="text-sm">{issue.aiInsight.suggestedFix}</p>
                            </div>
                          </>
                        )}
                        <Separator />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Complexity
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {issue.aiInsight.complexity}
                          </Badge>
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={() => setIsAiPanelOpen(true)}
                        >
                          View Full Analysis
                        </Button>
                      </CardContent>
                    </NeonGradientCard>
                  </BlurFade>
                )}

                <BlurFade delay={0.4} inView>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Related Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {mockIssues
                        .filter((i) => i.number !== issue.number)
                        .slice(0, 3)
                        .map((relatedIssue) => (
                          <a
                            key={relatedIssue.id}
                            href={`/repo/${repoName}/issues/${relatedIssue.number}`}
                            className="block p-2 rounded-md hover:bg-muted transition-colors"
                          >
                            <div className="text-sm font-medium line-clamp-1">
                              #{relatedIssue.number} {relatedIssue.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {relatedIssue.labels[0]}
                            </div>
                          </a>
                        ))}
                    </CardContent>
                  </Card>
                </BlurFade>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Analysis Sheet */}
      <Sheet open={isAiPanelOpen} onOpenChange={setIsAiPanelOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <AnimatedGradientText>AI Analysis</AnimatedGradientText>
            </SheetTitle>
            <SheetDescription>
              Comprehensive AI-generated insights and recommendations
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="summary" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="fix">Fix Preview</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Issue Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {issue.aiInsight?.summary}
                  </p>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Points</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                        <span>Root cause identified in useEffect hook</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                        <span>Missing cleanup function causes memory leak</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                        <span>Simple fix with cleanup implementation</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fix" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Suggested Code Fix</CardTitle>
                  <CardDescription>
                    AI-generated solution for this issue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-muted text-sm overflow-x-auto">
                      <code>{`useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, pollingInterval);

  // Add cleanup function
  return () => {
    clearInterval(interval);
  };
}, [pollingInterval]);`}</code>
                    </pre>
                    <BorderBeam size={150} duration={8} delay={3} />
                  </div>
                  <Button className="w-full mt-4">Apply Fix</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Related Issues</CardTitle>
                  <CardDescription>
                    Similar issues detected by AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockIssues
                    .filter((i) => i.number !== issue.number)
                    .slice(0, 4)
                    .map((relatedIssue) => (
                      <div
                        key={relatedIssue.id}
                        className="p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="font-medium text-sm mb-1">
                          #{relatedIssue.number} {relatedIssue.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {relatedIssue.labels.join(", ")}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
