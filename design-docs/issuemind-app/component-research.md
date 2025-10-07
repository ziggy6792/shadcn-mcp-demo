# IssueMind App - Component Research & Implementation Guide

## Installation Commands

### Install All UI Components (Required)
```bash
pnpm dlx shadcn@latest add @shadcn/alert @shadcn/avatar @shadcn/badge @shadcn/button @shadcn/card @shadcn/checkbox @shadcn/command @shadcn/dialog @shadcn/dropdown-menu @shadcn/form @shadcn/input @shadcn/label @shadcn/progress @shadcn/scroll-area @shadcn/select @shadcn/separator @shadcn/sheet @shadcn/skeleton @shadcn/sonner @shadcn/spinner @shadcn/switch @shadcn/table @shadcn/tabs @shadcn/textarea @shadcn/tooltip
```

### Install Pre-built Blocks (Optional)
```bash
pnpm dlx shadcn@latest add @shadcn/login-01 @shadcn/sidebar-01 @shadcn/dashboard-01
```

---

## Component Details & Examples

### 1. Alert
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Display error, warning, info, and success messages

**Best Example: alert-demo**
```tsx
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// Success Alert
<Alert>
  <CheckCircle2Icon />
  <AlertTitle>Success! Your changes have been saved</AlertTitle>
  <AlertDescription>
    This is an alert with icon, title and description.
  </AlertDescription>
</Alert>

// Error Alert
<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Unable to process your payment.</AlertTitle>
  <AlertDescription>
    Please verify your billing information and try again.
  </AlertDescription>
</Alert>
```

**Key Props:**
- `variant`: "default" | "destructive"
- Children: Icon, AlertTitle, AlertDescription

**Use Cases in IssueMind:**
- Login errors
- Form validation errors
- Settings connection status warnings
- AI task failures

---

### 2. Avatar
**Type:** registry:ui
**Dependencies:** @radix-ui/react-avatar
**Purpose:** Display user profile pictures and assignee icons

**Best Example: avatar-demo**
```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// Rounded square variant
<Avatar className="rounded-lg">
  <AvatarImage src="https://github.com/user.png" alt="@user" />
  <AvatarFallback>ER</AvatarFallback>
</Avatar>

// Avatar group (overlapping)
<div className="flex -space-x-2">
  <Avatar>
    <AvatarImage src="https://github.com/user1.png" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://github.com/user2.png" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
</div>
```

**Key Props:**
- `className`: Custom styling (rounded-lg for square, default for circle)
- `AvatarImage.src`: Image URL
- `AvatarFallback`: Text shown when image fails to load

**Use Cases in IssueMind:**
- User account menu in top nav
- Issue author display
- Assignee avatars in issue lists
- Comment authors in issue detail

---

### 3. Badge
**Type:** registry:ui
**Dependencies:** @radix-ui/react-slot
**Purpose:** Status indicators, labels, counts

**Best Example: badge-demo**
```tsx
import { Badge } from "@/components/ui/badge"

// Status badges
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// Custom colored badge
<Badge
  variant="secondary"
  className="bg-blue-500 text-white dark:bg-blue-600"
>
  Verified
</Badge>

// Count badge (circular)
<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
  8
</Badge>
```

**Key Props:**
- `variant`: "default" | "secondary" | "destructive" | "outline"
- `className`: For custom colors and styling

**Use Cases in IssueMind:**
- Issue status (open, closed, in progress)
- Issue labels (bug, feature, enhancement)
- Priority indicators (high, medium, low)
- AI urgency scores
- Repository issue counts
- Task status (pending, completed, failed)
- Connection status in settings

---

### 4. Button
**Type:** registry:ui
**Dependencies:** @radix-ui/react-slot
**Purpose:** All interactive actions

**Example:**
```tsx
import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// With icon
<Button>
  <Icon />
  Click me
</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

**Key Props:**
- `variant`: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link"
- `size`: "sm" | "default" | "lg" | "icon"
- `asChild`: Render as child element

**Use Cases in IssueMind:**
- Login submit
- OAuth buttons
- Quick actions in dashboard
- Filter buttons
- AI action triggers (Explain, Generate Fix, Summarize)
- Navigation items in sidebar
- Form submit/cancel buttons

---

### 5. Card
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Content containers

**Best Example: card-with-form**
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Form or content here */}
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

**Key Components:**
- `CardHeader`: Title and description area
- `CardTitle`: Main heading
- `CardDescription`: Subtitle/description
- `CardContent`: Main content area
- `CardFooter`: Action buttons area

**Use Cases in IssueMind:**
- Login form container
- Repository cards in dashboard
- Metrics cards
- Issue detail container
- AI suggestion cards
- Settings groups
- Related issues cards

---

### 6. Checkbox
**Type:** registry:ui
**Dependencies:** @radix-ui/react-checkbox
**Purpose:** Multi-select, filters

**Example:**
```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

**Key Props:**
- `checked`: boolean | "indeterminate"
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean

**Use Cases in IssueMind:**
- Table row selection (select all, individual rows)
- Filter checkboxes in sidebar
- AI tag filters
- Settings toggles (alternative to switch)

---

### 7. Command (Command Palette)
**Type:** registry:ui
**Dependencies:** cmdk
**Purpose:** Global search and quick actions (⌘K)

**Best Example: command-dialog**
```tsx
"use client"

import * as React from "react"
import { Calendar, Settings, User } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

**Key Components:**
- `CommandDialog`: Modal wrapper
- `CommandInput`: Search field
- `CommandList`: Results container
- `CommandGroup`: Grouped items
- `CommandItem`: Individual result
- `CommandShortcut`: Keyboard shortcut display
- `CommandSeparator`: Visual divider

**Use Cases in IssueMind:**
- Quick repository switching
- Jump to issues
- Trigger AI actions
- Navigate between pages
- Search issues globally

---

### 8. Dialog (Modal)
**Type:** registry:ui
**Dependencies:** @radix-ui/react-dialog
**Purpose:** Modals and popups

**Best Example: dialog-demo**
```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      {/* Form content */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Key Components:**
- `DialogTrigger`: Button to open modal
- `DialogContent`: Modal container
- `DialogHeader`: Title area
- `DialogTitle`: Modal title
- `DialogDescription`: Subtitle
- `DialogFooter`: Action buttons
- `DialogClose`: Close button

**Use Cases in IssueMind:**
- AI Fix modal (code diff display)
- Explain modal (issue summary)
- Task detail modal
- Confirmation dialogs

---

### 9. Dropdown Menu
**Type:** registry:ui
**Dependencies:** @radix-ui/react-dropdown-menu
**Purpose:** Contextual menus

**Best Example: dropdown-menu-demo**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="start">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Key Components:**
- `DropdownMenuTrigger`: Trigger button
- `DropdownMenuContent`: Menu container
- `DropdownMenuLabel`: Section label
- `DropdownMenuGroup`: Grouped items
- `DropdownMenuItem`: Individual menu item
- `DropdownMenuSeparator`: Visual divider
- `DropdownMenuShortcut`: Keyboard shortcut

**Use Cases in IssueMind:**
- User account menu
- Repository selector
- Sort options in issue list
- Task actions (View, Retry, Delete)
- AI assistant menu

---

### 10. Form
**Type:** registry:ui
**Dependencies:** @radix-ui/react-label, @radix-ui/react-slot, @hookform/resolvers, zod, react-hook-form
**Purpose:** Form validation and submission

**Best Example: input-form**
```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: JSON.stringify(data, null, 2),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

**Key Components:**
- `Form`: Form provider (react-hook-form)
- `FormField`: Field controller
- `FormItem`: Field container
- `FormLabel`: Field label
- `FormControl`: Input wrapper
- `FormDescription`: Help text
- `FormMessage`: Validation error message

**Use Cases in IssueMind:**
- Login form (email, password validation)
- Search inputs with validation
- Settings forms

---

### 11. Input
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Text input fields

**Example:**
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-3">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="name@example.com"
  />
</div>

// Password input
<Input type="password" placeholder="Enter password" />

// Search input
<Input type="search" placeholder="Search issues..." />
```

**Key Props:**
- `type`: "text" | "email" | "password" | "search" | etc.
- `placeholder`: Placeholder text
- `disabled`: boolean
- All standard HTML input attributes

**Use Cases in IssueMind:**
- Login email/password fields
- Global search in top nav
- Issue search/filter
- Form inputs

---

### 12. Label
**Type:** registry:ui
**Dependencies:** @radix-ui/react-label
**Purpose:** Form field labels

**Example:**
```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="grid gap-3">
  <Label htmlFor="name">Name</Label>
  <Input id="name" />
</div>
```

**Key Props:**
- `htmlFor`: Associates with input id

**Use Cases in IssueMind:**
- All form field labels
- Filter labels
- Settings labels

---

### 13. Progress
**Type:** registry:ui
**Dependencies:** @radix-ui/react-progress
**Purpose:** Progress bars and activity indicators

**Example:**
```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={60} className="w-full" />
```

**Key Props:**
- `value`: Number (0-100)
- `className`: Custom styling

**Use Cases in IssueMind:**
- Activity progress in dashboard
- Issue completion metrics
- Loading progress for AI tasks

---

### 14. Scroll Area
**Type:** registry:ui
**Dependencies:** @radix-ui/react-scroll-area
**Purpose:** Scrollable regions with custom scrollbars

**Example:**
```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-48">
  <div className="p-4">
    {/* Long content here */}
  </div>
</ScrollArea>

// Horizontal scroll
<ScrollArea className="w-96">
  <div className="flex w-max space-x-4 p-4">
    {/* Wide content */}
  </div>
</ScrollArea>
```

**Key Props:**
- `className`: Set height/width constraints
- `orientation`: "vertical" | "horizontal"

**Use Cases in IssueMind:**
- Sidebar navigation
- Repository list in dashboard
- Issue table
- Comments timeline
- AI suggestions panel
- Right drawer content

---

### 15. Select
**Type:** registry:ui
**Dependencies:** @radix-ui/react-select
**Purpose:** Dropdown selectors

**Example:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
  </SelectContent>
</Select>
```

**Key Components:**
- `SelectTrigger`: Dropdown button
- `SelectValue`: Placeholder/selected value
- `SelectContent`: Options container
- `SelectItem`: Individual option

**Use Cases in IssueMind:**
- Repository selector in top nav
- Assignee filter
- Layout density in settings
- Default repository view in settings

---

### 16. Separator
**Type:** registry:ui
**Dependencies:** @radix-ui/react-separator
**Purpose:** Visual dividers

**Example:**
```tsx
import { Separator } from "@/components/ui/separator"

<div>
  <div>Content above</div>
  <Separator className="my-4" />
  <div>Content below</div>
</div>

// Vertical separator
<div className="flex h-5 items-center space-x-4">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
</div>
```

**Key Props:**
- `orientation`: "horizontal" | "vertical"
- `className`: Custom styling

**Use Cases in IssueMind:**
- Section dividers in sidebar
- Dividers between nav items
- Separating dashboard sections
- Settings section dividers
- Card content dividers

---

### 17. Sheet (Drawer)
**Type:** registry:ui
**Dependencies:** @radix-ui/react-dialog
**Purpose:** Side drawers and panels

**Best Example: sheet-demo**
```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-6 py-4">
      {/* Content */}
    </div>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
      <SheetClose asChild>
        <Button variant="outline">Close</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Key Components:**
- `SheetTrigger`: Open button
- `SheetContent`: Drawer container
- `SheetHeader`: Title area
- `SheetTitle`: Drawer title
- `SheetDescription`: Subtitle
- `SheetFooter`: Action buttons
- `SheetClose`: Close button

**Key Props (SheetContent):**
- `side`: "top" | "right" | "bottom" | "left"

**Use Cases in IssueMind:**
- Right-side AI drawer (suggestions, diff preview, related issues)
- Related Issues drawer in issue detail
- Mobile navigation menu

---

### 18. Skeleton
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Loading placeholders

**Best Example: skeleton-demo**
```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-[200px] w-full" />
  </CardContent>
</Card>
```

**Key Props:**
- `className`: Define size and shape

**Use Cases in IssueMind:**
- Dashboard loading state (repository cards, metrics)
- Issue list loading
- AI suggestions loading
- Comment loading states
- Settings loading

---

### 19. Sonner (Toast)
**Type:** registry:ui
**Dependencies:** sonner, next-themes
**Purpose:** Toast notifications

**Best Example: sonner-demo**
```tsx
"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

// Basic toast
<Button onClick={() => toast("Event has been created")}>
  Show Toast
</Button>

// Toast with description
toast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
})

// Toast with action
toast("Event has been created", {
  description: "Sunday, December 03, 2023",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})

// Success toast
toast.success("Changes saved successfully")

// Error toast
toast.error("Failed to save changes")

// Promise toast (for async operations)
toast.promise(
  fetch("/api/data"),
  {
    loading: "Loading...",
    success: "Data loaded successfully",
    error: "Failed to load data",
  }
)
```

**Setup Required:**
Add `<Toaster />` to root layout:
```tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

**Key Functions:**
- `toast()`: Basic toast
- `toast.success()`: Success message
- `toast.error()`: Error message
- `toast.promise()`: Async operation feedback

**Use Cases in IssueMind:**
- "AI fix generated" success notification
- "Operation complete" info notification
- Error notifications for failed actions
- Form submission feedback
- GitHub connection status changes

---

### 20. Spinner
**Type:** registry:ui
**Dependencies:** class-variance-authority
**Purpose:** Loading indicators

**Best Example: spinner-demo**
```tsx
import { Spinner } from "@/components/ui/spinner"

<Spinner />

// With size variants
<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />

// In context (e.g., with button)
<Button disabled>
  <Spinner className="mr-2" />
  Loading...
</Button>

// In table cell
<TableCell>
  {status === "pending" ? <Spinner /> : <Badge>{status}</Badge>}
</TableCell>
```

**Key Props:**
- `size`: "sm" | "default" | "lg"
- `className`: Custom styling

**Use Cases in IssueMind:**
- Login button loading state
- AI task "pending" indicator in table
- Form submission loading
- Data fetching indicators
- Simulated AI processing states

---

### 21. Switch
**Type:** registry:ui
**Dependencies:** @radix-ui/react-switch
**Purpose:** Toggle controls

**Best Example: switch-demo**
```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Controlled switch
const [enabled, setEnabled] = React.useState(false)

<Switch
  id="notifications"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

**Key Props:**
- `checked`: boolean
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean

**Use Cases in IssueMind:**
- Dark mode toggle
- Auto-labeling toggle in settings
- Auto-summarization toggle in settings
- Feature flags in experimental settings

---

### 22. Table
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Data tables

**Best Example: data-table-demo** (with TanStack Table)
```tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define data type
type Issue = {
  id: string
  title: string
  status: "open" | "closed"
  priority: "high" | "medium" | "low"
}

// Define columns
const columns: ColumnDef<Issue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge>{row.getValue("status")}</Badge>
    ),
  },
]

// Component
export default function IssuesTable({ data }: { data: Issue[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

**Key Components:**
- `Table`: Table wrapper
- `TableHeader`: Header section
- `TableHead`: Header cell
- `TableBody`: Body section
- `TableRow`: Table row
- `TableCell`: Table cell
- `TableCaption`: Table caption
- `TableFooter`: Footer section

**Additional Library:**
Install TanStack Table for advanced features:
```bash
pnpm add @tanstack/react-table
```

**Use Cases in IssueMind:**
- Issues list (with sorting, filtering, selection)
- AI tasks list
- Dashboard metrics tables

---

### 23. Tabs
**Type:** registry:ui
**Dependencies:** @radix-ui/react-tabs
**Purpose:** Tabbed interfaces

**Best Example: tabs-demo**
```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      {/* Account content */}
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      {/* Password content */}
    </Card>
  </TabsContent>
</Tabs>

// Vertical tabs (for settings)
<Tabs defaultValue="general" className="flex">
  <TabsList className="flex-col h-full">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="integrations">Integrations</TabsTrigger>
    <TabsTrigger value="experimental">Experimental</TabsTrigger>
  </TabsList>
  <TabsContent value="general" className="flex-1">
    {/* General settings */}
  </TabsContent>
  {/* Other tabs */}
</Tabs>
```

**Key Components:**
- `Tabs`: Container (with defaultValue)
- `TabsList`: Tab buttons container
- `TabsTrigger`: Individual tab button
- `TabsContent`: Tab panel content

**Key Props:**
- `defaultValue`: Initial active tab
- `value`: Controlled active tab
- `onValueChange`: Tab change handler

**Use Cases in IssueMind:**
- Issues filter tabs (Open/Closed)
- Right drawer tabs (Suggestions, Fix Preview, Related Issues)
- Issue detail right column tabs
- AI tasks filter tabs (All/Pending/Completed/Failed)
- Settings page tabs (General, Integrations, Experimental)

---

### 24. Textarea
**Type:** registry:ui
**Dependencies:** None
**Purpose:** Multi-line text input

**Example:**
```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

<div className="grid gap-3">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Type your message here."
    rows={4}
  />
</div>
```

**Key Props:**
- `placeholder`: Placeholder text
- `rows`: Number of visible rows
- `disabled`: boolean
- All standard HTML textarea attributes

**Use Cases in IssueMind:**
- Comment input (if adding comments to issues)
- Issue description editing
- AI prompt input

---

### 25. Tooltip
**Type:** registry:ui
**Dependencies:** @radix-ui/react-tooltip
**Purpose:** Helpful hints and descriptions

**Example:**
```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a helpful tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Key Components:**
- `TooltipProvider`: Wrap your app or section
- `Tooltip`: Tooltip container
- `TooltipTrigger`: Element that triggers tooltip
- `TooltipContent`: Tooltip content

**Use Cases in IssueMind:**
- AI action button tooltips (Explain Issue, Generate Fix, Summarize Discussion)
- Icon button explanations
- Truncated text preview
- Feature descriptions in settings

---

## Pre-built Blocks (Optional Accelerators)

### login-01
**Type:** registry:block
**Description:** Simple login form with email/password
**Use:** Ready-made login page for `/login` route

### sidebar-01
**Type:** registry:block
**Description:** Simple sidebar with navigation grouped by section
**Use:** Main application sidebar for Dashboard, Issues, AI Tasks, Settings navigation

### dashboard-01
**Type:** registry:block
**Description:** Dashboard with sidebar, charts, and data table
**Use:** Starting point for `/dashboard` page with repository overview

---

## Implementation Strategy

### Phase 1: Core Setup
1. Install all UI components (first command)
2. Add `<Toaster />` to root layout for toast notifications
3. Set up form validation with Zod schemas

### Phase 2: Layout
1. Implement top navigation with Button, DropdownMenu, Select, Input, Avatar
2. Add sidebar using sidebar-01 block or custom with ScrollArea
3. Add command palette (⌘K) using CommandDialog
4. Integrate theme toggle with Switch

### Phase 3: Authentication
1. Use login-01 block or build custom with Card, Form, Input, Label, Button, Alert
2. Add loading states with Spinner
3. Implement toast notifications for success/error

### Phase 4: Dashboard
1. Use dashboard-01 block as starting point
2. Create repository cards with Card, Badge, Progress
3. Add loading skeletons with Skeleton
4. Implement ScrollArea for repository list

### Phase 5: Issues Pages
1. Build issues table with Table, Checkbox, Badge, Avatar
2. Add filters with Tabs, Checkbox, Select
3. Implement Sheet for right drawer with AI insights
4. Add Dialog for modals (AI fix, explain)

### Phase 6: Polish
1. Add Tooltip to action buttons
2. Implement Separator for visual hierarchy
3. Add toast notifications for all actions
4. Test all loading states with Spinner and Skeleton

---

## Key Dependencies to Install

```bash
# For data tables (optional but recommended)
pnpm add @tanstack/react-table

# For icons (used in examples)
pnpm add lucide-react
```

---

## Notes
- All components support dark mode out of the box
- Components are fully typed with TypeScript
- Radix UI primitives provide excellent accessibility
- Form validation uses Zod + react-hook-form for robust validation
- Use `className` prop for custom styling with Tailwind CSS
