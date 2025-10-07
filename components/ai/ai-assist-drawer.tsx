'use client';
import * as React from 'react';

export function AiAssistDrawer() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('open-ai-assist', openHandler);
    return () => window.removeEventListener('open-ai-assist', openHandler);
  }, []);

  if (!open) return null;
  return (
    <div className='fixed inset-0 z-[150]' onClick={() => setOpen(false)}>
      <div className='absolute inset-0 bg-black/30' />
      <div className='absolute right-0 top-0 h-full w-full max-w-xl border-l bg-background p-4 shadow-xl' onClick={(e) => e.stopPropagation()}>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>AI Assist</h2>
          <button className='text-sm text-muted-foreground' onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className='space-y-3 text-sm text-muted-foreground'>
          <p>Bulk suggestions for triage:</p>
          <ul className='list-disc pl-5'>
            <li>Cluster similar issues by title</li>
            <li>Suggest priority labels</li>
            <li>Propose closing stale issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
