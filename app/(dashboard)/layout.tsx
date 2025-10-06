"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { CommandPalette, useCommandPalette } from "@/components/command-palette"
import { mockRepositories } from "@/lib/mock-data"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { open, setOpen } = useCommandPalette()
  const [currentRepo, setCurrentRepo] = React.useState(mockRepositories[0]?.id)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <TopNavbar
            repositories={mockRepositories}
            currentRepo={currentRepo}
            onRepoChange={setCurrentRepo}
            onAIAssistant={() => setOpen(true)}
          />
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </div>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </SidebarProvider>
  )
}
