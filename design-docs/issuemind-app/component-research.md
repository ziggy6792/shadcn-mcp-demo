# IssueMind App - Component Research & Implementation Guide

## Installation Command

Install all 30 required components in one command:

```bash
pnpm dlx shadcn@latest add @shadcn/accordion @shadcn/alert @shadcn/alert-dialog @shadcn/avatar @shadcn/badge @shadcn/button @shadcn/card @shadcn/checkbox @shadcn/command @shadcn/dialog @shadcn/drawer @shadcn/dropdown-menu @shadcn/form @shadcn/input @shadcn/label @shadcn/menubar @shadcn/popover @shadcn/progress @shadcn/resizable @shadcn/scroll-area @shadcn/select @shadcn/separator @shadcn/sidebar @shadcn/skeleton @shadcn/sonner @shadcn/switch @shadcn/table @shadcn/tabs @shadcn/textarea @shadcn/tooltip
```

---

## Component Details & Key Dependencies

### 1. Accordion
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-accordion`
- **Use Case**: Collapsible sections in issue details and settings
- **Key Props**: `type`, `collapsible`, `defaultValue`

---

### 2. Alert
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Error messages, warnings, connection status in settings
- **Key Props**: `variant` (default, destructive)

---

### 3. Alert Dialog
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-alert-dialog`
- **Use Case**: Delete confirmations in AI tasks page
- **Key Props**: `open`, `onOpenChange`
- **Subcomponents**: `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`

**Example Usage**:
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete Task</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### 4. Avatar
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-avatar`
- **Use Case**: User profiles in navbar, comment sections
- **Key Props**: `src`, `alt`, `fallback`

---

### 5. Badge
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-slot`
- **Use Case**: Issue status, priority tags, AI tags, labels
- **Key Props**: `variant` (default, secondary, destructive, outline)

---

### 6. Button
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-slot`
- **Use Case**: All interactive actions throughout the app
- **Key Props**: `variant` (default, destructive, outline, secondary, ghost, link), `size` (default, sm, lg, icon), `asChild`

---

### 7. Card
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Repository cards, issue containers, settings sections
- **Subcomponents**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**Example - Card with Form**:
```tsx
<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

---

### 8. Checkbox
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-checkbox`
- **Use Case**: Filter selections, row selections in data tables
- **Key Props**: `checked`, `onCheckedChange`, `disabled`

---

### 9. Command
- **Type**: UI Component
- **Dependencies**: `cmdk`
- **Use Case**: Command palette (⌘K) for quick actions
- **Subcomponents**: `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`

**Example - Command Dialog**:
```tsx
"use client"

import * as React from "react"
import { Calculator, Calendar, Settings } from "lucide-react"

export default function CommandDialogDemo() {
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
            <span>Search issues</span>
          </CommandItem>
          <CommandItem>
            <Calculator />
            <span>Jump to repo</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
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

---

### 10. Dialog
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-dialog`
- **Use Case**: AI fix modals, explain issue modals
- **Key Props**: `open`, `onOpenChange`
- **Subcomponents**: `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`

**Example**:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Explain Code</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>AI Explanation</DialogTitle>
      <DialogDescription>
        Here's what this issue is about...
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      {/* AI generated content */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### 11. Drawer
- **Type**: UI Component
- **Dependencies**: `vaul`, `@radix-ui/react-dialog`
- **Use Case**: Right-side AI suggestions, related issues drawer
- **Key Props**: `open`, `onOpenChange`, `direction`
- **Subcomponents**: `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose`

**Example**:
```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open AI Assist</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>AI Suggestions</DrawerTitle>
        <DrawerDescription>AI-powered insights for this issue</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        {/* AI suggestions content */}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

---

### 12. Dropdown Menu
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-dropdown-menu`
- **Use Case**: User menu, sort options, filter options, action menus in tables
- **Key Props**: `open`, `onOpenChange`
- **Subcomponents**: `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`

---

### 13. Form
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-label`, `@radix-ui/react-slot`, `@hookform/resolvers`, `zod`, `react-hook-form`
- **Use Case**: Login form, settings forms, search forms
- **Key Props**: Form validation with `react-hook-form` and `zod`
- **Subcomponents**: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`

**Important**: Form component provides validation using `react-hook-form` and `zod` schemas

---

### 14. Input
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Search bars, text fields, email/password inputs
- **Key Props**: `type`, `placeholder`, `disabled`, `value`, `onChange`

---

### 15. Label
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-label`
- **Use Case**: Form field labels
- **Key Props**: `htmlFor`

---

### 16. Menubar
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-menubar`
- **Use Case**: Top navigation bar
- **Key Props**: Similar to DropdownMenu but in menubar format
- **Subcomponents**: `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarShortcut`

---

### 17. Popover
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-popover`
- **Use Case**: Additional context menus, tooltips with rich content
- **Key Props**: `open`, `onOpenChange`
- **Subcomponents**: `Popover`, `PopoverTrigger`, `PopoverContent`

---

### 18. Progress
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-progress`
- **Use Case**: AI task progress indicators
- **Key Props**: `value` (0-100), `max`

---

### 19. Resizable
- **Type**: UI Component
- **Dependencies**: `react-resizable-panels`
- **Use Case**: Issue list page layout (sidebar + main area + drawer)
- **Subcomponents**: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`

**Example - Three Panel Layout**:
```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={20}>
    {/* Filters sidebar */}
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60}>
    {/* Main content area */}
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={20}>
    {/* AI suggestions drawer */}
  </ResizablePanel>
</ResizablePanelGroup>
```

---

### 20. Scroll Area
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-scroll-area`
- **Use Case**: Issue descriptions, comment sections, drawer content
- **Key Props**: `className`, `orientation`

---

### 21. Select
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-select`
- **Use Case**: Dropdowns in filters, repo picker, theme selector
- **Subcomponents**: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`

---

### 22. Separator
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-separator`
- **Use Case**: Visual dividers between sections
- **Key Props**: `orientation` (horizontal, vertical)

---

### 23. Sidebar
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-slot`, `class-variance-authority`, `lucide-react`
- **Use Case**: Main app navigation sidebar
- **Subcomponents**: `Sidebar`, `SidebarProvider`, `SidebarInset`, `SidebarTrigger`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuAction`, `SidebarRail`

**Example - Basic Sidebar**:
```tsx
import { HomeIcon, InboxIcon, SettingsIcon } from "lucide-react"

const items = [
  { title: "Dashboard", url: "/", icon: HomeIcon },
  { title: "Issues", url: "/issues", icon: InboxIcon },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

---

### 24. Skeleton
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Loading states for AI insights, repo cards, issue lists
- **Key Props**: `className` (for sizing)

**Example - Skeleton Card**:
```tsx
<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

---

### 25. Sonner
- **Type**: UI Component
- **Dependencies**: `sonner`, `next-themes`
- **Use Case**: Toast notifications for success/error feedback
- **Key Props**: Configured globally, used via `toast()` function

**Usage**:
```tsx
import { toast } from "sonner"

// Success toast
toast.success("AI fix generated successfully!")

// Error toast
toast.error("Failed to generate fix")

// Loading toast
toast.loading("Generating AI suggestions...")
```

**Note**: Requires `<Toaster />` in root layout

---

### 26. Switch
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-switch`
- **Use Case**: Theme toggle, feature toggles in settings
- **Key Props**: `checked`, `onCheckedChange`, `disabled`

---

### 27. Table
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Issue list, AI tasks list
- **Subcomponents**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

**Example - Data Table with Sorting and Filtering**:
```tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Requires: npm install @tanstack/react-table

export default function DataTableDemo() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="overflow-hidden rounded-md border">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

**Important**: For advanced data tables, install `@tanstack/react-table`

---

### 28. Tabs
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-tabs`
- **Use Case**: Settings navigation, issue detail right column (Suggestions/Fix/Dependencies)
- **Subcomponents**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

**Example**:
```tsx
<Tabs defaultValue="suggestions">
  <TabsList>
    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
    <TabsTrigger value="fix">Fix Diff</TabsTrigger>
    <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
  </TabsList>
  <TabsContent value="suggestions">
    <Card>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* AI suggestions */}
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="fix">
    {/* Fix diff content */}
  </TabsContent>
  <TabsContent value="dependencies">
    {/* Related issues */}
  </TabsContent>
</Tabs>
```

---

### 29. Textarea
- **Type**: UI Component
- **Dependencies**: None (pure CSS)
- **Use Case**: Issue comments, AI prompt inputs
- **Key Props**: `placeholder`, `disabled`, `rows`, `value`, `onChange`

---

### 30. Tooltip
- **Type**: UI Component
- **Dependencies**: `@radix-ui/react-tooltip`
- **Use Case**: Helpful hints on buttons and icons
- **Subcomponents**: `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`

**Usage**:
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional helpful info</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Additional Dependencies Required

Beyond the shadcn components, you'll need:

### 1. TanStack Table (for advanced data tables)
```bash
pnpm add @tanstack/react-table
```

### 2. Lucide React (for icons)
```bash
pnpm add lucide-react
```

### 3. React Hook Form + Zod (for form validation)
```bash
pnpm add react-hook-form @hookform/resolvers zod
```

### 4. Markdown Renderer (for issue descriptions)
```bash
pnpm add react-markdown remark-gfm
```

### 5. Syntax Highlighter (for code diffs)
```bash
pnpm add react-syntax-highlighter @types/react-syntax-highlighter
```

### 6. Next Themes (for dark mode)
```bash
pnpm add next-themes
```

---

## Implementation Priority

### Phase 1: Core Layout (Week 1)
1. **Sidebar** - Main navigation
2. **Button** - Basic interactions
3. **Card** - Content containers
4. **Avatar** - User profiles
5. **Menubar** - Top navbar
6. **Sonner** - Toast notifications

### Phase 2: Authentication & Dashboard (Week 1-2)
7. **Form** - Login validation
8. **Input** - Text fields
9. **Label** - Form labels
10. **Alert** - Error messages
11. **Skeleton** - Loading states
12. **Badge** - Status indicators
13. **Separator** - Visual dividers

### Phase 3: Issues List Page (Week 2-3)
14. **Resizable** - Layout panels
15. **Table** - Issue list with @tanstack/react-table
16. **Checkbox** - Row selection & filters
17. **Select** - Filter dropdowns
18. **Dropdown Menu** - Sort & actions
19. **Drawer** - AI assist panel
20. **Scroll Area** - Long content

### Phase 4: Issue Detail Page (Week 3-4)
21. **Tabs** - Right column navigation
22. **Dialog** - AI modals
23. **Accordion** - Collapsible sections
24. **Textarea** - Comments

### Phase 5: AI Tasks & Settings (Week 4)
25. **Progress** - Task progress
26. **Alert Dialog** - Delete confirmations
27. **Switch** - Settings toggles
28. **Popover** - Additional menus
29. **Tooltip** - Help text
30. **Command** - Command palette (⌘K)

---

## Key Patterns for IssueMind

### 1. Layout Pattern
```tsx
<SidebarProvider>
  <Sidebar>{/* Navigation */}</Sidebar>
  <SidebarInset>
    <Menubar>{/* Top navbar */}</Menubar>
    <main>{/* Page content */}</main>
  </SidebarInset>
</SidebarProvider>
```

### 2. Data Table Pattern
```tsx
// Use @tanstack/react-table for sortable, filterable tables
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox /> {/* Select all */}
      </TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Map rows */}
  </TableBody>
</Table>
```

### 3. AI Modal Pattern
```tsx
<Dialog>
  <DialogTrigger>
    <Button>Generate Fix</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>AI Generated Fix</DialogTitle>
    </DialogHeader>
    {/* Code diff display */}
    <DialogFooter>
      <Button>Apply Fix</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 4. Loading State Pattern
```tsx
{isLoading ? (
  <Skeleton className="h-[125px] w-full" />
) : (
  <Card>{/* Actual content */}</Card>
)}
```

### 5. Toast Feedback Pattern
```tsx
import { toast } from "sonner"

const handleAIAction = async () => {
  const toastId = toast.loading("Generating AI suggestions...")

  try {
    const result = await generateAISuggestions()
    toast.success("AI suggestions generated!", { id: toastId })
  } catch (error) {
    toast.error("Failed to generate suggestions", { id: toastId })
  }
}
```

---

## Next Steps

1. ✅ Install all components using the command above
2. Set up Next.js app with App Router
3. Configure `next-themes` for dark mode
4. Create global layout with Sidebar + Menubar
5. Add `<Toaster />` to root layout for Sonner
6. Add `<TooltipProvider>` wrapper if using tooltips globally
7. Build pages following the component hierarchy in requirements.md
8. Create mock API layer for GitHub data
9. Implement AI interaction patterns (loading → success/error feedback)
10. Add dark mode styling and test all components

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [TanStack Table Documentation](https://tanstack.com/table)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
