## Installation Commands:

```bash
npx shadcn@latest add @shadcn/form @shadcn/input @shadcn/textarea @shadcn/select @shadcn/checkbox @shadcn/radio-group @shadcn/switch @shadcn/button @shadcn/label @shadcn/card @shadcn/alert @shadcn/alert-dialog @shadcn/dialog @shadcn/sheet @shadcn/tabs @shadcn/table @shadcn/pagination @shadcn/progress @shadcn/skeleton @shadcn/command @shadcn/dropdown-menu @shadcn/navigation-menu @shadcn/avatar @shadcn/badge @shadcn/scroll-area @shadcn/separator
```

Component: Form
Implementation:
Dependencies: @radix-ui/react-label, @radix-ui/react-slot, @hookform/resolvers, zod, react-hook-form
Best Example:
No specific demo found. Use form + zod resolver patterns.
Key Props: onSubmit, control, name, rules

Component: Input
Implementation:
Single file ui component
Best Example:

```tsx
import { Input } from '@/registry/new-york-v4/ui/input';

export default function InputDemo() {
  return <Input type='email' placeholder='Email' />;
}
```

Key Props: type, placeholder, required, value, onChange

Component: Textarea
Implementation:
Single file ui component
Best Example:

```tsx
import { Textarea } from '@/registry/new-york-v4/ui/textarea';

export default function TextareaDemo() {
  return <Textarea placeholder='Type your message here.' />;
}
```

Key Props: placeholder, rows, value, onChange

Component: Select
Implementation:
Depends on @radix-ui/react-select
Best Example:

```tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

Key Props: value, onValueChange, disabled

Component: Checkbox
Implementation:
Depends on @radix-ui/react-checkbox
Best Example:

```tsx
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox';
import { Label } from '@/registry/new-york-v4/ui/label';

export default function CheckboxDemo() {
  return (
    <div className='flex items-center gap-3'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  );
}
```

Key Props: checked, defaultChecked, onCheckedChange, disabled

Component: Radio Group
Implementation:
Depends on @radix-ui/react-radio-group
Best Example:

```tsx
import { Label } from '@/registry/new-york-v4/ui/label';
import { RadioGroup, RadioGroupItem } from '@/registry/new-york-v4/ui/radio-group';

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue='comfortable'>
      <div className='flex items-center gap-3'>
        <RadioGroupItem value='default' id='r1' />
        <Label htmlFor='r1'>Default</Label>
      </div>
    </RadioGroup>
  );
}
```

Key Props: value, onValueChange

Component: Switch
Implementation:
Depends on @radix-ui/react-switch
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

Key Props: checked, onCheckedChange, disabled

Component: Button
Implementation:
Single file, depends on @radix-ui/react-slot
Best Example:

```tsx
import { Button } from '@/registry/new-york-v4/ui/button';

export default function ButtonDemo() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline'>Button</Button>
      <Button size='icon' aria-label='Submit' />
    </div>
  );
}
```

Key Props: variant, size, disabled, asChild

Component: Label
Implementation:
Depends on @radix-ui/react-label
Best Example:

```tsx
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox';
import { Label } from '@/registry/new-york-v4/ui/label';

export default function LabelDemo() {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  );
}
```

Key Props: htmlFor

Component: Card
Implementation:
Single file ui component
Best Example:

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

export default function CardDemo() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login</CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooter>...</CardFooter>
    </Card>
  );
}
```

Key Props: asChild, className

Component: Alert
Implementation:
Single file ui component
Best Example:

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/registry/new-york-v4/ui/alert';

export default function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Changes saved.</AlertDescription>
    </Alert>
  );
}
```

Key Props: variant

Component: Alert Dialog
Implementation:
Depends on @radix-ui/react-alert-dialog
Best Example:

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/new-york-v4/ui/alert-dialog';
```

Key Props: open, onOpenChange

Component: Dialog
Implementation:
Depends on @radix-ui/react-dialog
Best Example:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/registry/new-york-v4/ui/dialog';
```

Key Props: open, onOpenChange

Component: Sheet
Implementation:
Depends on @radix-ui/react-dialog
Best Example:

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/registry/new-york-v4/ui/sheet';
```

Key Props: open, onOpenChange, side

Component: Tabs
Implementation:
Depends on @radix-ui/react-tabs
Best Example:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
```

Key Props: value, defaultValue, onValueChange

Component: Table
Implementation:
Single file ui component
Best Example:

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/registry/new-york-v4/ui/table';
```

Key Props: children (slots)

Component: Pagination
Implementation:
Single file ui component
Best Example:

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/registry/new-york-v4/ui/pagination';
```

Key Props: hrefs, isActive

Component: Progress
Implementation:
Depends on @radix-ui/react-progress
Best Example:

```tsx
import { Progress } from '@/registry/new-york-v4/ui/progress';
```

Key Props: value, max

Component: Skeleton
Implementation:
Single file ui component
Best Example:

```tsx
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';
```

Key Props: className (dimensions)

Component: Command
Implementation:
Depends on cmdk
Best Example:

```tsx
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/registry/new-york-v4/ui/command';
```

Key Props: value, onValueChange

Component: Dropdown Menu
Implementation:
Depends on @radix-ui/react-dropdown-menu
Best Example:

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/registry/new-york-v4/ui/dropdown-menu';
```

Key Props: open, onOpenChange, align

Component: Navigation Menu
Implementation:
Depends on @radix-ui/react-navigation-menu
Best Example:

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/registry/new-york-v4/ui/navigation-menu';
```

Key Props: viewport, orientation

Component: Avatar
Implementation:
Depends on @radix-ui/react-avatar
Best Example:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
```

Key Props: src, alt

Component: Badge
Implementation:
Depends on @radix-ui/react-slot
Best Example:

```tsx
import { Badge } from '@/registry/new-york-v4/ui/badge';
```

Key Props: variant

Component: Scroll Area
Implementation:
Depends on @radix-ui/react-scroll-area
Best Example:

```tsx
import { ScrollArea } from '@/registry/new-york-v4/ui/scroll-area';
```

Key Props: className (size)

Component: Separator
Implementation:
Depends on @radix-ui/react-separator
Best Example:

```tsx
import { Separator } from '@/registry/new-york-v4/ui/separator';
```

Key Props: orientation, decorative
