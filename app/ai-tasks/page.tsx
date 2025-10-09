import { AppShell } from '@/components/layout/AppShell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { aiTasks } from '@/lib/mocks/data';

export default function AiTasksPage() {
  return (
    <AppShell>
      <div className='space-y-4'>
        <h1 className='text-xl font-semibold'>AI Tasks</h1>
        <div className='rounded-md border overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === 'failed' ? 'destructive' : t.status === 'completed' ? 'default' : 'secondary'}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>{t.resultSummary ?? '—'}</TableCell>
                  <TableCell className='text-muted-foreground text-sm'>{new Date(t.createdAt).toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
