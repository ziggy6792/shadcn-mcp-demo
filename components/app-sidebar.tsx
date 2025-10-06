"use client"

import * as React from "react"
import { HomeIcon, InboxIcon, BrainCircuitIcon, SettingsIcon, GithubIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Issues",
    url: "/issues",
    icon: InboxIcon,
    badge: 23,
  },
  {
    title: "AI Tasks",
    url: "/ai-tasks",
    icon: BrainCircuitIcon,
    badge: 2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <GithubIcon className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">IssueMind</span>
            <span className="text-xs text-muted-foreground">AI-Powered Triage</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          Powered by Claude AI
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
