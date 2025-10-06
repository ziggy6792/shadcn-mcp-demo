import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

function Progress({ value = 0, className, ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)} {...props}>
      <div className='h-full w-full flex-1' />
      <div className='absolute left-0 top-0 h-full bg-primary transition-all' style={{ width: `${clamped}%` }} />
    </div>
  );
}

export { Progress };
