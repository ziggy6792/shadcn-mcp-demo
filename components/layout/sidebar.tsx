"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Issues",
    href: "/repo/react-dashboard/issues",
    icon: FileText,
    badge: "23",
  },
  {
    name: "AI Tasks",
    href: "/ai-tasks",
    icon: Sparkles,
    badge: "2",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:pt-16">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <nav className="flex flex-1 flex-col pt-6">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all relative overflow-hidden",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-primary-foreground" : ""
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "outline"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <ChevronRight className="absolute right-3 h-4 w-4 opacity-70" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </ScrollArea>

        <Separator />

        <div className="p-4 rounded-lg border bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">AI Assistant</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Get AI-powered insights for your issues
            </p>
            <Button size="sm" className="w-full mt-2">
              Ask AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
