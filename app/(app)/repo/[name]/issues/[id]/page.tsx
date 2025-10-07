'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function IssueDetailPage() {
  const params = useParams<{ name: string; id: string }>();
  const issueId = params.id;

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Issue #{issueId}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2 space-y-3'>
            <ScrollArea className='h-72 rounded border p-3'>
              <p className='text-sm'>Markdown body preview goes here. This area scrolls for long content.</p>
            </ScrollArea>
            <Separator />
          </div>
          <div>
            <Tabs defaultValue='suggestions'>
              <TabsList className='grid grid-cols-3'>
                <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
                <TabsTrigger value='fix'>Fix Preview</TabsTrigger>
                <TabsTrigger value='related'>Related</TabsTrigger>
              </TabsList>
              <TabsContent value='suggestions'>No suggestions yet.</TabsContent>
              <TabsContent value='fix'>Generate a fix to preview.</TabsContent>
              <TabsContent value='related'>Related issues will appear here.</TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className='sticky bottom-4 z-10 flex gap-2 justify-end'>
        <Button>Explain Issue</Button>
        <Button>Generate Fix</Button>
        <Button variant='secondary'>Summarize Discussion</Button>
      </div>
    </div>
  );
}

