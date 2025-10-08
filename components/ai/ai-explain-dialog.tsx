'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Lightbulb, AlertTriangle } from 'lucide-react';

interface AIExplainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueTitle: string;
}

export function AIExplainDialog({ open, onOpenChange, issueTitle }: AIExplainDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            AI Explanation
          </DialogTitle>
          <DialogDescription>{issueTitle}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 pr-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Issue Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a mobile-specific touch event handling issue affecting the primary button component
                    in the checkout flow. The problem occurs exclusively on iOS Safari browsers, where click
                    handlers fail to trigger when users tap the button.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Root Cause</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The button element is likely experiencing a touch event propagation issue caused by:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>An overlay element with higher z-index blocking touch events</li>
                    <li>CSS pointer-events property set to &apos;none&apos; on parent elements</li>
                    <li>Touch event handlers not properly configured for iOS</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Recommended Actions</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>
                      <strong>Immediate:</strong> Add <code className="px-1 py-0.5 bg-muted rounded text-xs">
                        pointer-events: auto
                      </code> CSS property to the button element
                    </li>
                    <li>
                      <strong>Short-term:</strong> Review z-index hierarchy in the checkout flow to identify
                      blocking overlays
                    </li>
                    <li>
                      <strong>Long-term:</strong> Implement comprehensive mobile testing for all interactive
                      elements across iOS versions 15-17
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-yellow-500/10 border-yellow-500/20 p-4">
              <h4 className="font-semibold mb-2 text-sm">Impact Assessment</h4>
              <p className="text-sm text-muted-foreground">
                This is a <strong>critical blocker</strong> for the checkout flow on mobile devices.
                Approximately 35% of users access the checkout on iOS devices, making this a high-priority
                issue affecting revenue and user experience.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
