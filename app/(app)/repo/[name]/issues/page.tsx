'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type Issue = {
  id: number;
  title: string;
  status: 'open' | 'closed';
  aiTagged: boolean;
};

const MOCK_ISSUES: Issue[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Issue #${i + 1}`,
  status: i % 3 === 0 ? 'closed' : 'open',
  aiTagged: i % 4 === 0,
}));

export default function RepoIssuesPage() {
  const router = useRouter();
  const params = useParams<{ name: string }>();
  const [page, setPage] = useState(1);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyAi, setOnlyAi] = useState(false);
  const [label, setLabel] = useState<string | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_ISSUES.filter((i) => (!onlyOpen || i.status === 'open') && (!onlyAi || i.aiTagged));
  }, [onlyOpen, onlyAi]);

  const pageSize = 8;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  if (filtered.length === 0) {
    return <div className='text-sm text-muted-foreground'>No issues match your filters.</div>;
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      <aside className='col-span-12 md:col-span-3 space-y-4'>
        <div className='space-y-2'>
          <div className='text-sm font-medium'>Filters</div>
          <Select value={label} onValueChange={setLabel}>
            <SelectTrigger>
              <SelectValue placeholder='Label' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bug'>bug</SelectItem>
              <SelectItem value='enhancement'>enhancement</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex items-center gap-2'>
            <Checkbox id='only-open' checked={onlyOpen} onCheckedChange={(v) => setOnlyOpen(Boolean(v))} />
            <label htmlFor='only-open' className='text-sm'>
              Only open
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <Switch id='ai-tag' checked={onlyAi} onCheckedChange={setOnlyAi} />
            <label htmlFor='ai-tag' className='text-sm'>
              AI tags
            </label>
          </div>
        </div>
      </aside>
      <section className='col-span-12 md:col-span-9'>
        <div className='text-sm text-muted-foreground mb-2'>Repository: {params.name}</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>#{issue.id}</TableCell>
                <TableCell className='font-medium'>{issue.title}</TableCell>
                <TableCell>{issue.status === 'open' ? <Badge>open</Badge> : <Badge variant='secondary'>closed</Badge>}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost' aria-label='Row actions'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => router.push(`/repo/${params.name}/issues/${issue.id}`)}>Open</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDrawerOpen(true)}>AI summary</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='mt-4 flex justify-center'>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationLink
                  key={i}
                  href='#'
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}>
                  {i + 1}
                </PaginationLink>
              ))}
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side='right' className='sm:w-[460px]'>
          <SheetHeader>
            <SheetTitle>AI Summary</SheetTitle>
          </SheetHeader>
          <p className='text-sm text-muted-foreground mt-4'>Generated summary will appear here.</p>
        </SheetContent>
      </Sheet>
    </div>
  );
}
