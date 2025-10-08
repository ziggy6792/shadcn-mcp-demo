"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AppLayout } from "@/components/app-layout"
import { RadixTabs as Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/radix-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { IconBrandGithub, IconCheck, IconX } from "@tabler/icons-react"

const generalFormSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  theme: z.enum(["light", "dark", "system"]),
  layoutDensity: z.enum(["comfortable", "compact", "spacious"]),
  defaultRepoView: z.enum(["all", "active", "archived"]),
})

const experimentalFormSchema = z.object({
  autoLabeling: z.boolean(),
  summaryGeneration: z.boolean(),
  predictivePriority: z.boolean(),
  autoFixSuggestions: z.boolean(),
})

export default function SettingsPage() {
  const [isGitHubConnected, setIsGitHubConnected] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      displayName: "John Doe",
      email: "john@example.com",
      theme: "dark",
      layoutDensity: "comfortable",
      defaultRepoView: "all",
    },
  })

  const experimentalForm = useForm<z.infer<typeof experimentalFormSchema>>({
    resolver: zodResolver(experimentalFormSchema),
    defaultValues: {
      autoLabeling: true,
      summaryGeneration: true,
      predictivePriority: false,
      autoFixSuggestions: true,
    },
  })

  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Settings saved successfully!")
    }, 1000)
  }

  function onExperimentalSubmit(values: z.infer<typeof experimentalFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Experimental settings saved!")
    }, 1000)
  }

  function handleGitHubConnection() {
    setIsGitHubConnected(!isGitHubConnected)
    toast.success(isGitHubConnected ? "GitHub disconnected" : "GitHub connected")
  }

  return (
    <AppLayout>
      <div className="container max-w-4xl space-y-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="experimental">Experimental</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form
                    onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={generalForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is how your name will be displayed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your email address for notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <FormField
                      control={generalForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a theme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose your preferred color theme
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="layoutDensity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Layout Density</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select density" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="comfortable">Comfortable</SelectItem>
                              <SelectItem value="compact">Compact</SelectItem>
                              <SelectItem value="spacious">Spacious</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Adjust the spacing and sizing of UI elements
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="defaultRepoView"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Repository View</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select view" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">All Repositories</SelectItem>
                              <SelectItem value="active">Active Only</SelectItem>
                              <SelectItem value="archived">Archived Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose which repositories to show by default
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Integration</CardTitle>
                <CardDescription>
                  Connect your GitHub account to sync repositories and issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <IconBrandGithub className="h-8 w-8" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">
                        {isGitHubConnected
                          ? "Connected as john-doe"
                          : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isGitHubConnected ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {isGitHubConnected ? (
                        <>
                          <IconCheck className="h-3 w-3" />
                          Connected
                        </>
                      ) : (
                        <>
                          <IconX className="h-3 w-3" />
                          Disconnected
                        </>
                      )}
                    </Badge>
                    <Button
                      variant={isGitHubConnected ? "destructive" : "default"}
                      onClick={handleGitHubConnection}
                    >
                      {isGitHubConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                {isGitHubConnected && (
                  <div className="space-y-2 rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-semibold">Permissions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <IconCheck className="h-3 w-3 text-green-500" />
                        Read repository data
                      </li>
                      <li className="flex items-center gap-2">
                        <IconCheck className="h-3 w-3 text-green-500" />
                        Read and write issues
                      </li>
                      <li className="flex items-center gap-2">
                        <IconCheck className="h-3 w-3 text-green-500" />
                        Read repository metadata
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Configure API access and rate limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">API Calls (Today)</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-muted-foreground">of 5,000 limit</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rate Limit Remaining</p>
                    <p className="text-2xl font-bold">3,753</p>
                    <p className="text-xs text-muted-foreground">resets in 4h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experimental Tab */}
          <TabsContent value="experimental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Experimental Features</CardTitle>
                <CardDescription>
                  Enable or disable experimental AI-powered features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...experimentalForm}>
                  <form
                    onSubmit={experimentalForm.handleSubmit(onExperimentalSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={experimentalForm.control}
                      name="autoLabeling"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Auto Labeling</FormLabel>
                            <FormDescription>
                              Automatically label issues based on content analysis
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={experimentalForm.control}
                      name="summaryGeneration"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Summary Generation
                            </FormLabel>
                            <FormDescription>
                              Generate AI summaries for long discussions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={experimentalForm.control}
                      name="predictivePriority"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Predictive Priority
                            </FormLabel>
                            <FormDescription>
                              AI-powered priority scoring for issues
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={experimentalForm.control}
                      name="autoFixSuggestions"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Auto Fix Suggestions
                            </FormLabel>
                            <FormDescription>
                              Automatically generate fix suggestions for bugs
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Settings"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
