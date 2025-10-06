import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

function Avatar({ src, alt, className, ...props }: AvatarProps) {
  return (
    <div className={cn('inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted', className)} {...props}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className='h-full w-full object-cover' />
      ) : (
        <div className='h-full w-full' />
      )}
    </div>
  );
}

export { Avatar };
