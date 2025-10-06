import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return <div className={cn('relative overflow-auto', className)} {...props} />;
}

export { ScrollArea };
