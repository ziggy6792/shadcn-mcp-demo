'use client';

import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { issues, comments } from '@/lib/mocks/data';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function IssueDetailPage() {
  const params = useParams<{ name: string; id: string }>();
  const issue = issues.find((i) => i.id === params.id && i.repoName === params.name);
  const issueComments = comments.filter((c) => c.issueId === params.id);

  if (!issue) {
    return (
      <AppShell>
        <p>Issue not found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl font-semibold'>{issue.title}</h1>
          <Badge variant='outline'>#{issue.id}</Badge>
          <Badge variant='secondary'>{issue.status}</Badge>
          <div className='ml-auto flex gap-2'>
            <Button onClick={() => toast.message('Explain', { description: 'This issue affects dark mode during navigation.' })}>Explain Issue</Button>
            <Button variant='outline' onClick={() => toast.message('Summarize', { description: '2 comments; reproducible on Safari.' })}>
              Summarize Discussion
            </Button>
            <Button variant='destructive' onClick={() => toast.message('Generate Fix', { description: 'Mock fix generated and queued.' })}>
              Generate Fix
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className='prose dark:prose-invert max-w-none py-6'>
            <p>{issue.body}</p>
          </CardContent>
        </Card>
        <Tabs defaultValue='suggestions'>
          <TabsList>
            <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
            <TabsTrigger value='fix'>Fix Preview</TabsTrigger>
            <TabsTrigger value='related'>Related Issues</TabsTrigger>
          </TabsList>
          <TabsContent value='suggestions' className='space-y-2 text-sm text-muted-foreground'>
            <p>Try persisting theme before route transitions.</p>
            <p>Consider using CSS color-scheme to avoid flashes.</p>
          </TabsContent>
          <TabsContent value='fix' className='text-sm text-muted-foreground'>
            <p>Mock diff available in AI Tasks once ready.</p>
          </TabsContent>
          <TabsContent value='related' className='text-sm text-muted-foreground'>
            <p>No strongly related issues detected.</p>
          </TabsContent>
        </Tabs>
        <div>
          <h2 className='mb-2 text-sm font-medium text-muted-foreground'>Comments</h2>
          <div className='space-y-3'>
            {issueComments.map((c) => (
              <Card key={c.id}>
                <CardContent className='py-4 text-sm'>
                  <div className='mb-1 font-medium'>{c.author}</div>
                  <div className='text-muted-foreground'>{c.body}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
