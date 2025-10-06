import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';

export default function Page({ params }: { params: { name: string } }) {
  const repo = params.name;
  return (
    <div className='grid gap-4 md:grid-cols-[16rem_1fr]'>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Assignee</label>
            <Select defaultValue='all'>
              <option value='all'>All</option>
              <option>Alice</option>
              <option>Bob</option>
            </Select>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Labels</label>
            <Select defaultValue='any'>
              <option value='any'>Any</option>
              <option>bug</option>
              <option>enhancement</option>
            </Select>
          </div>
          <Separator />
          <div className='flex items-center gap-2 text-sm'>
            <Checkbox id='open' defaultChecked /> <label htmlFor='open'>Open</label>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Checkbox id='ai' /> <label htmlFor='ai'>AI Suggested</label>
          </div>
        </CardContent>
      </Card>
      <div className='space-y-3'>
        <div className='flex items-center justify-between gap-2'>
          <Input placeholder={`Search in ${repo}…`} className='max-w-sm' />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Issues in {repo}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((id) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Link href={`/repo/${repo}/issues/${id}`} className='underline-offset-4 hover:underline'>
                        Issue #{id}
                      </Link>
                    </TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>—</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination page={1} pageCount={5} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
