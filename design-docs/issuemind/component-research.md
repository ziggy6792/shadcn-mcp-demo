# IssueMind - Component Research & Implementation Guide

## Installation Commands

### Install All Components at Once

```bash
pnpm dlx shadcn@latest add @aceternity/sidebar @aceternity/tabs @aceternity/timeline @aceternity/focus-cards @shadcn/form @shadcn/input @shadcn/button @shadcn/label @shadcn/card @shadcn/alert @shadcn/table @shadcn/dialog @shadcn/drawer @shadcn/sonner @shadcn/command @shadcn/dropdown-menu @shadcn/switch @shadcn/badge @shadcn/skeleton @shadcn/avatar @shadcn/separator @shadcn/select @shadcn/checkbox @shadcn/scroll-area @shadcn/navigation-menu @shadcn/textarea @shadcn/popover
```

### Install by Phase

**Phase 1 - Core Layout:**
```bash
pnpm dlx shadcn@latest add @aceternity/sidebar @shadcn/navigation-menu @shadcn/card @shadcn/button @shadcn/badge @shadcn/form @shadcn/input @shadcn/label @shadcn/dialog @shadcn/drawer
```

**Phase 2 - Data Display:**
```bash
pnpm dlx shadcn@latest add @shadcn/table @aceternity/tabs @aceternity/timeline @shadcn/skeleton @shadcn/avatar
```

**Phase 3 - Interactions:**
```bash
pnpm dlx shadcn@latest add @shadcn/command @shadcn/sonner @shadcn/dropdown-menu @shadcn/select @shadcn/checkbox @shadcn/switch
```

**Phase 4 - Enhancements:**
```bash
pnpm dlx shadcn@latest add @shadcn/scroll-area @shadcn/separator @shadcn/alert @shadcn/textarea @aceternity/focus-cards @shadcn/popover
```

---

## Component Details & Examples

### @aceternity/sidebar

**Type:** registry:ui
**Dependencies:** @tabler/icons-react, motion

**Description:** Main navigation sidebar structure for the app. Used for persistent navigation across all pages.

**Key Features:**
- Collapsible/expandable
- Icon-based navigation
- Motion animations
- Dark mode support

**Usage Context:**
- Global layout sidebar
- Filter sidebar on issues page

**Note:** No demo examples available in registry. Refer to component implementation for usage patterns.

---

### @aceternity/tabs

**Type:** registry:ui
**Dependencies:** @radix-ui/react-tabs

**Description:** Tab navigation component for organizing content into sections.

**Key Features:**
- Animated transitions
- Keyboard navigation
- Accessible (ARIA)

**Usage Context:**
- Settings page (General, Integrations, Experimental)
- Issue detail right panel (Suggestions, Fix Preview, Related Issues)
- Right drawer navigation

**Note:** No demo examples available in registry. Refer to component implementation for usage patterns.

---

### @aceternity/timeline

**Type:** registry:ui
**Dependencies:** motion

**Description:** Timeline component for displaying chronological events with animations.

**Key Features:**
- Motion animations
- Vertical layout
- Event markers

**Usage Context:**
- Dashboard: Issue trends visualization
- Issue detail: Comments and activity timeline

---

### @aceternity/focus-cards

**Type:** registry:ui
**Dependencies:** None

**Description:** Interactive card component with focus effects for showcasing content.

**Key Features:**
- Hover/focus animations
- Grid layout support
- Visual emphasis on interaction

**Usage Context:**
- Dashboard: Repository cards display
- Highlighting key repositories with metrics

---

### @shadcn/form

**Type:** registry:ui
**Dependencies:** @radix-ui/react-label, @radix-ui/react-slot, @hookform/resolvers, zod, react-hook-form

**Description:** Form validation and submission handler using react-hook-form and Zod schemas.

**Key Props:**
- Form wrapper component
- Field-level validation
- Error handling
- Schema-based validation (Zod)

**Usage Context:**
- Login page form
- Settings page forms
- Any user input requiring validation

**Best Practice Example:**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* fields */}
      </form>
    </Form>
  )
}
```

---

### @shadcn/input

**Type:** registry:ui
**Dependencies:** None

**Description:** Text input field component with styling variants.

**Key Props:**
- `type`: text, email, password, etc.
- `placeholder`: Placeholder text
- `required`: Validation
- `disabled`: Disabled state

**Usage Context:**
- Login form (email, password)
- Search fields (global search, issue search)
- Settings inputs
- Form fields throughout app

**Best Example from card-demo:**
```tsx
<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  placeholder="m@example.com"
  required
/>

<Label htmlFor="password">Password</Label>
<Input id="password" type="password" required />
```

---

### @shadcn/button

**Type:** registry:ui
**Dependencies:** @radix-ui/react-slot

**Description:** Button component with multiple variants and sizes.

**Key Props:**
- `variant`: outline, ghost, destructive, link, default
- `size`: default, sm, lg, icon
- `disabled`: Disabled state
- `asChild`: Render as child component

**Usage Context:**
- Login/Submit buttons
- Action buttons throughout app
- Icon buttons
- Quick action buttons on dashboard

**Best Example:**
```tsx
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
```

**Variants:**
- `outline`: Secondary actions
- `ghost`: Subtle actions
- `destructive`: Delete/remove actions
- `default`: Primary actions

---

### @shadcn/label

**Type:** registry:ui
**Dependencies:** @radix-ui/react-label

**Description:** Form label component with proper accessibility attributes.

**Key Props:**
- `htmlFor`: Associated input ID

**Usage Context:**
- All form fields
- Settings toggles
- Input labels

---

### @shadcn/card

**Type:** registry:ui
**Dependencies:** None

**Description:** Container component for grouping related content.

**Key Components:**
- `Card`: Main wrapper
- `CardHeader`: Top section with title
- `CardTitle`: Title text
- `CardDescription`: Subtitle/description
- `CardContent`: Main content area
- `CardFooter`: Bottom section with actions
- `CardAction`: Action button in header

**Usage Context:**
- Login page container
- Dashboard metric cards
- Issue content container
- Settings section containers
- AI result containers

**Best Example (Login Card):**
```tsx
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>
      Enter your email below to login to your account
    </CardDescription>
    <CardAction>
      <Button variant="link">Sign Up</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <form>
      {/* form fields */}
    </form>
  </CardContent>
  <CardFooter className="flex-col gap-2">
    <Button type="submit" className="w-full">Login</Button>
    <Button variant="outline" className="w-full">
      Login with Google
    </Button>
  </CardFooter>
</Card>
```

---

### @shadcn/alert

**Type:** registry:ui
**Dependencies:** None

**Description:** Alert/notification component for displaying important messages.

**Key Components:**
- `Alert`: Main container
- `AlertTitle`: Alert heading
- `AlertDescription`: Alert message

**Key Props:**
- `variant`: default, destructive

**Usage Context:**
- Login error messages
- Form validation errors
- System notifications

---

### @shadcn/table

**Type:** registry:ui
**Dependencies:** None

**Description:** Table component for displaying tabular data.

**Key Components:**
- `Table`: Main wrapper
- `TableHeader`: Header section
- `TableBody`: Body section
- `TableFooter`: Footer section
- `TableRow`: Table row
- `TableHead`: Header cell
- `TableCell`: Body cell
- `TableCaption`: Table caption

**Usage Context:**
- Issues list view
- AI tasks list
- Data display

**Best Example (Simple Table):**
```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.invoice}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell className="text-right">{item.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Advanced Example (data-table-demo):**
- Includes sorting, filtering, pagination
- Column visibility controls
- Row selection with checkboxes
- Uses @tanstack/react-table for advanced features

---

### @shadcn/dialog

**Type:** registry:ui
**Dependencies:** @radix-ui/react-dialog

**Description:** Modal dialog component for focused interactions.

**Key Components:**
- `Dialog`: Main wrapper (controls open state)
- `DialogTrigger`: Trigger button
- `DialogContent`: Modal content
- `DialogHeader`: Header section
- `DialogTitle`: Dialog title
- `DialogDescription`: Dialog description
- `DialogFooter`: Footer with actions
- `DialogClose`: Close button

**Usage Context:**
- AI Fix Modal
- Explain Modal
- Confirmation dialogs
- Command palette wrapper

**Best Example:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      {/* content */}
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

---

### @shadcn/drawer

**Type:** registry:ui
**Dependencies:** vaul, @radix-ui/react-dialog

**Description:** Side drawer component for contextual panels.

**Key Components:**
- `Drawer`: Main wrapper
- `DrawerTrigger`: Trigger button
- `DrawerContent`: Drawer content
- `DrawerHeader`: Header section
- `DrawerTitle`: Drawer title
- `DrawerDescription`: Drawer description
- `DrawerFooter`: Footer with actions
- `DrawerClose`: Close button

**Usage Context:**
- Right-side AI assist panel
- Related Issues drawer
- Filter panel (mobile)

**Best Example:**
```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        {/* content */}
      </div>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

---

### @shadcn/sonner

**Type:** registry:ui
**Dependencies:** sonner, next-themes

**Description:** Toast notification system using Sonner library.

**Key Features:**
- Multiple toast types (success, error, info, warning)
- Auto-dismiss
- Action buttons
- Stacking notifications
- Theme aware

**Usage Context:**
- "AI fix generated" notifications
- "Operation complete" messages
- Error messages
- Success confirmations

**Usage Pattern:**
```tsx
import { toast } from "sonner"

// In your component
toast.success("AI fix generated successfully!")
toast.error("Failed to generate fix")
toast.info("Processing request...")
```

---

### @shadcn/command

**Type:** registry:ui
**Dependencies:** cmdk

**Description:** Command palette component for quick navigation and actions.

**Key Components:**
- `Command`: Main wrapper
- `CommandInput`: Search input
- `CommandList`: Results list
- `CommandEmpty`: Empty state
- `CommandGroup`: Grouped items
- `CommandItem`: Individual item
- `CommandSeparator`: Visual separator
- `CommandShortcut`: Keyboard shortcut display

**Usage Context:**
- Command palette (⌘K)
- Quick search
- Repository switching
- Triggering AI actions

**Best Example:**
```tsx
<Command className="rounded-lg border shadow-md md:min-w-[450px]">
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
    </CommandGroup>
  </CommandList>
</Command>
```

---

### @shadcn/dropdown-menu

**Type:** registry:ui
**Dependencies:** @radix-ui/react-dropdown-menu

**Description:** Dropdown menu component for contextual actions.

**Key Components:**
- `DropdownMenu`: Main wrapper
- `DropdownMenuTrigger`: Trigger button
- `DropdownMenuContent`: Menu content
- `DropdownMenuItem`: Menu item
- `DropdownMenuLabel`: Section label
- `DropdownMenuSeparator`: Visual separator
- `DropdownMenuCheckboxItem`: Checkbox item
- `DropdownMenuRadioGroup`: Radio group
- `DropdownMenuRadioItem`: Radio item

**Usage Context:**
- User account menu
- Table row actions
- Filter options
- Context menus

---

### @shadcn/switch

**Type:** registry:ui
**Dependencies:** @radix-ui/react-switch

**Description:** Toggle switch component.

**Key Props:**
- `checked`: Boolean state
- `onCheckedChange`: Change handler
- `disabled`: Disabled state

**Usage Context:**
- Theme toggle (dark/light)
- Settings toggles
- Feature flags

---

### @shadcn/badge

**Type:** registry:ui
**Dependencies:** @radix-ui/react-slot

**Description:** Badge component for labels and status indicators.

**Key Props:**
- `variant`: default, secondary, destructive, outline

**Usage Context:**
- Issue labels
- AI tags
- Priority scores
- Status indicators (Pending, Completed, Failed)
- Metrics on repository cards

---

### @shadcn/skeleton

**Type:** registry:ui
**Dependencies:** None

**Description:** Loading placeholder component.

**Usage Context:**
- Dashboard loading states
- Issue list loading
- AI task loading
- Repository card placeholders

**Usage Pattern:**
```tsx
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

---

### @shadcn/avatar

**Type:** registry:ui
**Dependencies:** @radix-ui/react-avatar

**Description:** Avatar component for user profile pictures.

**Key Components:**
- `Avatar`: Main wrapper
- `AvatarImage`: Image element
- `AvatarFallback`: Fallback text/icon

**Usage Context:**
- User account menu
- Issue author display
- Comments

**Usage Pattern:**
```tsx
<Avatar>
  <AvatarImage src="https://github.com/user.png" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

---

### @shadcn/separator

**Type:** registry:ui
**Dependencies:** @radix-ui/react-separator

**Description:** Visual divider component.

**Key Props:**
- `orientation`: horizontal, vertical

**Usage Context:**
- Section dividers in sidebar
- Content separation
- Form sections
- Menu separators

---

### @shadcn/select

**Type:** registry:ui
**Dependencies:** @radix-ui/react-select

**Description:** Dropdown select component.

**Key Components:**
- `Select`: Main wrapper
- `SelectTrigger`: Trigger button
- `SelectContent`: Dropdown content
- `SelectItem`: Option item
- `SelectValue`: Selected value display
- `SelectGroup`: Grouped options
- `SelectLabel`: Group label

**Usage Context:**
- Repository selector in nav bar
- Filter dropdowns (assignee, labels)
- Settings dropdowns
- Sort controls

---

### @shadcn/checkbox

**Type:** registry:ui
**Dependencies:** @radix-ui/react-checkbox

**Description:** Checkbox component for multi-select.

**Key Props:**
- `checked`: Boolean or "indeterminate"
- `onCheckedChange`: Change handler
- `disabled`: Disabled state

**Usage Context:**
- Filter checkboxes
- Table row selection
- Multi-select issues
- Settings options

---

### @shadcn/scroll-area

**Type:** registry:ui
**Dependencies:** @radix-ui/react-scroll-area

**Description:** Custom scrollable area with styled scrollbars.

**Key Components:**
- `ScrollArea`: Main wrapper
- `ScrollBar`: Scrollbar component

**Usage Context:**
- Issue list
- Comments section
- Drawer content
- Long content areas
- Settings panels

**Usage Pattern:**
```tsx
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {/* scrollable content */}
  </div>
</ScrollArea>
```

---

### @shadcn/navigation-menu

**Type:** registry:ui
**Dependencies:** @radix-ui/react-navigation-menu

**Description:** Top navigation menu component.

**Key Components:**
- `NavigationMenu`: Main wrapper
- `NavigationMenuList`: Menu list
- `NavigationMenuItem`: Menu item
- `NavigationMenuTrigger`: Dropdown trigger
- `NavigationMenuContent`: Dropdown content
- `NavigationMenuLink`: Link item

**Usage Context:**
- Top navigation bar
- Main menu structure

---

### @shadcn/textarea

**Type:** registry:ui
**Dependencies:** None

**Description:** Multi-line text input component.

**Key Props:**
- `placeholder`: Placeholder text
- `rows`: Number of rows
- `disabled`: Disabled state

**Usage Context:**
- Comment input (optional)
- Multi-line form fields
- AI prompt inputs

---

### @shadcn/popover

**Type:** registry:ui
**Dependencies:** @radix-ui/react-popover

**Description:** Popover component for contextual overlays.

**Key Components:**
- `Popover`: Main wrapper
- `PopoverTrigger`: Trigger element
- `PopoverContent`: Popover content

**Usage Context:**
- Additional information tooltips
- Quick actions
- Contextual help

---

## Implementation Notes

### Dark Mode Priority
All components support dark mode out of the box through CSS variables. Ensure your theme configuration properly defines both light and dark variants.

### Keyboard Navigation
Components from @radix-ui include built-in keyboard navigation. Test all interactive components with:
- Tab/Shift+Tab: Focus navigation
- Enter/Space: Activation
- Escape: Close dialogs/menus
- Arrow keys: Menu/list navigation

### Responsive Design
- Use Tailwind breakpoints (sm, md, lg, xl)
- Test mobile drawer behavior
- Ensure tables are scrollable on small screens
- Command palette should work on all screen sizes

### Performance Considerations
- Lazy load @aceternity components with animations
- Use React.memo for table rows
- Virtualize long lists if needed
- Optimize skeleton loading states

### Accessibility
- Always include aria-label for icon buttons
- Ensure proper heading hierarchy
- Test with screen readers
- Maintain focus management in modals
- Use semantic HTML elements

---

## Next Steps

1. **Install components** using the installation commands above
2. **Create layout structure** with global components (Sidebar, Navigation, Toast)
3. **Build pages** following the requirements document hierarchy
4. **Implement mock data** for all API interactions
5. **Test dark mode** across all components
6. **Verify keyboard navigation** in all interactive elements
7. **Add loading states** with Skeleton components
8. **Test responsive behavior** on mobile, tablet, desktop
