## Installation Commands:

```bash
npx shadcn@latest add @shadcn/form @shadcn/input @shadcn/button @shadcn/label @shadcn/card @shadcn/alert @shadcn/command @shadcn/switch @shadcn/sheet @shadcn/drawer @shadcn/sidebar @shadcn/menubar @shadcn/navigation-menu @shadcn/resizable @shadcn/table @shadcn/tabs @shadcn/dropdown-menu @shadcn/badge @shadcn/separator @shadcn/skeleton @shadcn/dialog @shadcn/alert-dialog @shadcn/accordion @shadcn/progress @shadcn/select @shadcn/tooltip @shadcn/textarea @shadcn/checkbox @shadcn/radio-group @shadcn/scroll-area @shadcn/avatar @shadcn/pagination
```

Component: Form
Implementation:
Dependencies: @radix-ui/react-label, @radix-ui/react-slot, @hookform/resolvers, zod, react-hook-form
Best Example:
Input Form (zod + react-hook-form)

Component: Input
Implementation:
Best Example:

```tsx
import { Input } from '@/registry/new-york-v4/ui/input';

export default function InputDemo() {
  return <Input type='email' placeholder='Email' />;
}
```

Component: Button
Implementation:
Dependencies: @radix-ui/react-slot
Best Example:

```tsx
import { ArrowUpIcon } from 'lucide-react';
import { Button } from '@/registry/new-york-v4/ui/button';

export default function ButtonDemo() {
  return (
    <div className='flex flex-wrap items-center gap-2 md:flex-row'>
      <Button variant='outline'>Button</Button>
      <Button variant='outline' size='icon' aria-label='Submit'>
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
```

Component: Label
Implementation:
Dependencies: @radix-ui/react-label
Best Example:

```tsx
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox';
import { Label } from '@/registry/new-york-v4/ui/label';

export default function LabelDemo() {
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms' />
        <Label htmlFor='terms'>Accept terms and conditions</Label>
      </div>
    </div>
  );
}
```

Component: Card
Implementation:
Best Example:

```tsx
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';

export default function CardDemo() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button variant='link'>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                  Forgot your password?
                </a>
              </div>
              <Input id='password' type='password' required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Button type='submit' className='w-full'>
          Login
        </Button>
        <Button variant='outline' className='w-full'>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
```

Component: Alert
Implementation:
Best Example:

```tsx
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/registry/new-york-v4/ui/alert';

export default function AlertDemo() {
  return (
    <div className='grid w-full max-w-xl items-start gap-4'>
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
      </Alert>
    </div>
  );
}
```

Component: Command
Implementation:
Dependencies: cmdk
Best Example:

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/registry/new-york-v4/ui/command';

export default function CommandDemo() {
  return (
    <Command className='rounded-lg border shadow-md md:min-w-[450px]'>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem>Calendar</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

Component: Switch
Implementation:
Dependencies: @radix-ui/react-switch
Best Example:

```tsx
import { Label } from '@/registry/new-york-v4/ui/label';
import { Switch } from '@/registry/new-york-v4/ui/switch';

export default function SwitchDemo() {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  );
}
```

Component: Sheet
Implementation:
Dependencies: @radix-ui/react-dialog
Best Example:

```tsx
import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/registry/new-york-v4/ui/sheet';

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>Name</Label>
            <Input id='sheet-demo-name' defaultValue='Pedro Duarte' />
          </div>
        </div>
        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

Component: Drawer
Implementation:
Dependencies: vaul, @radix-ui/react-dialog
Best Example:

```tsx
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/new-york-v4/ui/drawer';

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

... (Similar sections included for sidebar, menubar, navigation-menu, resizable, table, tabs, dropdown-menu, badge, separator, skeleton, dialog, alert-dialog, accordion, progress, select, tooltip, textarea, checkbox, radio-group, scroll-area, avatar, pagination)
