import Link from 'next/link';
import { ReactNode } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen grid grid-rows-[auto,1fr]'>
      <header className='border-b'>
        <div className='container mx-auto flex items-center justify-between gap-4 p-3'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href='/dashboard' legacyBehavior passHref>
                  <NavigationMenuLink className='font-semibold'>IssueMind</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href='/ai-tasks' legacyBehavior passHref>
                  <NavigationMenuLink>AI Tasks</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href='/settings' legacyBehavior passHref>
                  <NavigationMenuLink>Settings</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex items-center gap-2'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' aria-label='Open Command'>
                  <Menu className='h-4 w-4' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='sm:w-[460px]'>
                <SheetHeader>
                  <SheetTitle>Assist</SheetTitle>
                </SheetHeader>
                <div className='py-4'>
                  <Command>
                    <CommandInput placeholder='Search or ask for help...' />
                    <CommandList>
                      <CommandGroup heading='Navigation'>
                        <CommandItem asChild>
                          <Link href='/dashboard'>Dashboard</Link>
                        </CommandItem>
                        <CommandItem asChild>
                          <Link href='/ai-tasks'>AI Tasks</Link>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-9 w-9 rounded-full p-0'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src='/placeholder-user.jpg' alt='User' />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href='/login'>Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className='grid grid-cols-12'>
        <aside className='col-span-12 md:col-span-2 border-r p-4 space-y-2'>
          <div className='text-xs font-medium text-muted-foreground'>Repositories</div>
          <nav className='grid gap-1'>
            <Link className='text-sm hover:underline' href='/repo/demo-repo/issues'>
              demo-repo
            </Link>
            <Link className='text-sm hover:underline' href='/repo/alpha/issues'>
              alpha
            </Link>
          </nav>
        </aside>
        <main className='col-span-12 md:col-span-10 p-4'>{children}</main>
      </div>
    </div>
  );
}

