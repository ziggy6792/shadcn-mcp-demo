import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;
  return (
    <div className='flex items-center justify-between gap-2 py-2'>
      <Button variant='outline' size='sm' disabled={!canPrev} onClick={() => onPageChange?.(page - 1)}>
        Previous
      </Button>
      <div className='text-sm text-muted-foreground'>
        Page <span className='font-medium text-foreground'>{page}</span> of {pageCount}
      </div>
      <Button variant='outline' size='sm' disabled={!canNext} onClick={() => onPageChange?.(page + 1)}>
        Next
      </Button>
    </div>
  );
}
