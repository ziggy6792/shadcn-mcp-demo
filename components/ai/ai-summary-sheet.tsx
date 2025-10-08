'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, User, Calendar } from 'lucide-react';

interface AISummarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueTitle: string;
  commentCount: number;
}

export function AISummarySheet({ open, onOpenChange, issueTitle, commentCount }: AISummarySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discussion Summary
          </SheetTitle>
          <SheetDescription>{issueTitle}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{commentCount} Comments Analyzed</Badge>
                <Badge variant="outline">AI Generated</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Generated summary based on all comments and discussion threads.
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Key Points</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>john_mobile</strong> confirmed the reproduction on iOS Safari and identified
                      it as a touch event handling issue.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>sarah_dev</strong> investigated the CSS and suggested the issue might be
                      related to z-index problems with an overlay component.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Discussion Themes</h4>
              <div className="space-y-2">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium mb-1">Touch Event Handling</p>
                  <p className="text-xs text-muted-foreground">
                    Multiple participants discussed iOS-specific touch event behavior and how it differs
                    from desktop click events.
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium mb-1">CSS Investigation</p>
                  <p className="text-xs text-muted-foreground">
                    The team examined CSS properties including z-index, pointer-events, and positioning
                    to identify potential conflicts.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Participants</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">sarah_dev</p>
                    <p className="text-xs text-muted-foreground">2 comments • Reporter</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">john_mobile</p>
                    <p className="text-xs text-muted-foreground">1 comment • Assignee</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Timeline</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">Issue opened</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">First investigation comment</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">CSS analysis completed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-green-500/10 border-green-500/20 p-4">
              <h4 className="font-semibold mb-2 text-sm">Next Steps</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Apply the suggested CSS fix (pointer-events: auto)</li>
                <li>Test on multiple iOS devices and versions</li>
                <li>Review similar components for the same issue</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
