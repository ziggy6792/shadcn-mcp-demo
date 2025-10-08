'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AIFixModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueTitle: string;
}

export function AIFixModal({ open, onOpenChange, issueTitle }: AIFixModalProps) {
  const [copied, setCopied] = useState(false);

  const mockDiff = `diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index 1234567..abcdefg 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -10,7 +10,8 @@ export function Button({ children, onClick, ...props }: ButtonProps) {
   return (
     <button
       onClick={onClick}
-      className="primary-button"
+      className="primary-button"
+      style={{ pointerEvents: 'auto' }}
       {...props}
     >
       {children}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mockDiff);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            AI-Generated Fix
          </DialogTitle>
          <DialogDescription>{issueTitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Suggested Fix</Badge>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied' : 'Copy Code'}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-semibold mb-2">Analysis</h4>
            <p className="text-sm text-muted-foreground">
              The issue is caused by a touch event handling conflict on iOS Safari. The button element
              is likely blocked by an overlay or parent element that prevents touch events from propagating.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Proposed Changes</h4>
            <ScrollArea className="h-[300px] rounded-lg border">
              <pre className="p-4 text-xs">
                <code className="text-sm">{mockDiff}</code>
              </pre>
            </ScrollArea>
          </div>

          <div className="rounded-lg border bg-blue-500/10 border-blue-500/20 p-4">
            <h4 className="font-semibold mb-2 text-sm">Testing Recommendations</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Test on iOS Safari 15, 16, and 17</li>
              <li>Verify touch events work on all button variants</li>
              <li>Check for any z-index conflicts with overlays</li>
              <li>Test in both portrait and landscape modes</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => {
              toast.success('Fix applied! (Demo only)');
              onOpenChange(false);
            }}>
              Apply Fix
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
