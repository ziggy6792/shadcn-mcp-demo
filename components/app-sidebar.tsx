"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import {
  IconBrandGithub,
  IconDashboard,
  IconListCheck,
  IconRobot,
  IconSettings,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconDashboard className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Issues",
      href: "/repo/issues",
      icon: <IconListCheck className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "AI Tasks",
      href: "/ai-tasks",
      icon: <IconRobot className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
  ]

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold"
            >
              <IconBrandGithub className="h-7 w-7" />
              <span className={cn("whitespace-pre", !open && "hidden")}>
                IssueMind
              </span>
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link) => (
              <SidebarLink
                key={link.href}
                link={{
                  label: link.label,
                  href: link.href,
                  icon: link.icon,
                }}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
