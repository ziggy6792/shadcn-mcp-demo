"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Timeline } from "@/components/ui/timeline"
import { RadixTabs as Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/radix-tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { IconRobot, IconBulb, IconCode, IconAlertCircle } from "@tabler/icons-react"

// Mock data
const issue = {
  number: 245,
  title: "Critical bug in authentication flow",
  status: "open",
  priority: "critical",
  labels: ["bug", "security", "authentication"],
  author: {
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    username: "john-doe",
  },
  created: "2 hours ago",
  body: `## Description

There's a critical security vulnerability in the authentication flow that allows users to bypass email verification.

## Steps to Reproduce

1. Create a new account
2. Do not verify email
3. Access protected routes directly

## Expected Behavior

Users should be redirected to email verification page.

## Actual Behavior

Users can access protected routes without verification.`,
}

const comments = [
  {
    title: "Comment by Jane Smith",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/jane.png" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Jane Smith</span>
          <span className="text-xs text-muted-foreground">1 hour ago</span>
        </div>
        <p className="text-sm text-muted-foreground">
          I can confirm this issue. It seems the middleware is not checking the email verification status properly.
        </p>
      </div>
    ),
  },
  {
    title: "Label Added",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>Added labels: <Badge variant="secondary">security</Badge></p>
      </div>
    ),
  },
  {
    title: "AI Analysis Complete",
    content: (
      <div className="text-sm text-muted-foreground">
        <p>AI has generated a potential fix for this issue</p>
        <Badge className="mt-1">Ready for Review</Badge>
      </div>
    ),
  },
]

const aiSuggestions = [
  "Add email verification check in authentication middleware",
  "Implement redirect logic for unverified users",
  "Add unit tests for email verification flow",
  "Update documentation with security best practices",
]

const relatedIssues = [
  { number: 230, title: "Email verification not working", status: "closed" },
  { number: 215, title: "Security audit findings", status: "open" },
  { number: 198, title: "Authentication middleware refactor", status: "closed" },
]

export default function IssueDetailPage() {
  const params = useParams()
  const [isGeneratingFix, setIsGeneratingFix] = useState(false)

  const handleGenerateFix = () => {
    setIsGeneratingFix(true)
    setTimeout(() => {
      setIsGeneratingFix(false)
      toast.success("AI fix generated successfully!")
    }, 2000)
  }

  const handleExplainIssue = () => {
    toast.info("Generating explanation...")
    setTimeout(() => {
      toast.success("Explanation generated!")
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container max-w-5xl space-y-6 py-8">
            {/* Issue Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline">#{issue.number}</Badge>
                <Badge variant="destructive">{issue.status}</Badge>
                <Badge>{issue.priority}</Badge>
              </div>
              <h1 className="text-3xl font-bold">{issue.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={issue.author.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>
                    <span className="font-medium text-foreground">{issue.author.name}</span> opened this issue {issue.created}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Labels */}
            <div className="flex flex-wrap gap-2">
              {issue.labels.map((label) => (
                <Badge key={label} variant="secondary">
                  {label}
                </Badge>
              ))}
            </div>

            <Separator />

            {/* Issue Body */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Issue Description</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-[400px]">
                  <pre className="whitespace-pre-wrap text-sm">{issue.body}</pre>
                </ScrollArea>
              </CardContent>
            </Card>

            <Separator />

            {/* Timeline / Comments */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Activity</h2>
              <Timeline data={comments} />
            </div>
          </div>
        </div>

        {/* Right Sidebar with Tabs */}
        <div className="w-96 border-l bg-muted/10">
          <Tabs defaultValue="suggestions" className="h-full">
            <div className="border-b px-4 py-3">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
              <TabsContent value="suggestions" className="m-0 p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <IconBulb className="h-4 w-4" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="rounded-md border p-3 text-sm hover:bg-accent"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">AI Confidence Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fix Accuracy</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[95%] rounded-full bg-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="m-0 p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <IconCode className="h-4 w-4" />
                      Fix Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md bg-muted p-4">
                      <pre className="text-xs">
{`// middleware/auth.ts
export async function authMiddleware(req) {
  const user = await getUser(req);

  // Add email verification check
+ if (!user.emailVerified) {
+   return redirect('/verify-email');
+ }

  return next();
}`}
                      </pre>
                    </div>
                    <Button className="mt-4 w-full" size="sm">
                      Apply Fix
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="m-0 p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Related Issues</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {relatedIssues.map((relatedIssue) => (
                      <div
                        key={relatedIssue.number}
                        className="rounded-md border p-3 hover:bg-accent"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            #{relatedIssue.number}
                          </span>
                          <Badge
                            variant={relatedIssue.status === "open" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {relatedIssue.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {relatedIssue.title}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <IconAlertCircle className="mr-2 h-4 w-4" />
                  Explain Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>AI Explanation</DialogTitle>
                  <DialogDescription>
                    AI-generated explanation of this issue
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[400px]">
                  <div className="space-y-4 text-sm">
                    <p>
                      This issue describes a critical security vulnerability in the authentication system.
                    </p>
                    <p>
                      <strong>Root Cause:</strong> The authentication middleware is not validating the email verification status before allowing access to protected routes.
                    </p>
                    <p>
                      <strong>Impact:</strong> Unverified users can bypass email verification and access protected resources, potentially compromising system security.
                    </p>
                    <p>
                      <strong>Recommended Fix:</strong> Add email verification check in the authentication middleware and redirect unverified users to the verification page.
                    </p>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={isGeneratingFix}>
                  <IconRobot className="mr-2 h-4 w-4" />
                  {isGeneratingFix ? "Generating..." : "Generate Fix"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>AI-Generated Fix</DialogTitle>
                  <DialogDescription>
                    Review and apply the AI-generated fix for this issue
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[500px]">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Changes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="rounded-md bg-muted p-4 text-xs">
{`// middleware/auth.ts
export async function authMiddleware(req) {
  const user = await getUser(req);

+ // Verify email before granting access
+ if (!user.emailVerified) {
+   return redirect('/verify-email');
+ }

  return next();
}

// Add test coverage
+ describe('authMiddleware', () => {
+   it('should redirect unverified users', async () => {
+     // test implementation
+   });
+ });`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleGenerateFix}>
                    Apply Fix
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleExplainIssue}>
              Summarize Discussion
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
