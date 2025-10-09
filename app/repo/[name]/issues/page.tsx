'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { issues } from '@/lib/mocks/data';

export default function IssuesListPage() {
  const params = useParams<{ name: string }>();
  const router = useRouter();
  const repoIssues = issues.filter((i) => i.repoName === params.name);

  return (
    <AppShell>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl font-semibold'>Issues — {params.name}</h1>
          <Badge variant='secondary'>{repoIssues.length} open</Badge>
          <div className='ml-auto flex items-center gap-2'>
            <Input placeholder='Search issues' className='w-64' />
            <AssistDrawer />
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-16'>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead>AI Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repoIssues.map((issue) => (
                <TableRow key={issue.id} className='cursor-pointer' onClick={() => router.push(`/repo/${params.name}/issues/${issue.id}`)}>
                  <TableCell>#{issue.id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.status}</TableCell>
                  <TableCell className='space-x-1'>
                    {issue.labels.map((l) => (
                      <Badge key={l} variant='outline'>
                        {l}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.aiPriority === 'high' || issue.aiPriority === 'critical' ? 'destructive' : 'secondary'}>{issue.aiPriority}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}

function AssistDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Assist Panel</Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-[420px]'>
        <SheetHeader>
          <SheetTitle>AI Insights</SheetTitle>
        </SheetHeader>
        <div className='mt-4 space-y-3 text-sm text-muted-foreground'>
          <p>Top priorities: dark mode flicker, bulk label editing.</p>
          <p>Suggested next steps: reproduce on Safari, debounce theme switch.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
