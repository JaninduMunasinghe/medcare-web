"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Users,
  LogOut,
  Locate,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Registration",
    href: "/dashboard/registration",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings-page",
    icon: Settings,
  },
  {
    title: "Google Map",
    href: "/dashboard/map",
    icon: Locate,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "pb-12 w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
      <div className="space-y-4 py-4">
        {/* Profile Section */}
        {/*         <div className="px-4 py-6 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>
        </div> */}

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-medium tracking-tight text-muted-foreground uppercase">
            Menu
          </h2>
          <div className="space-y-1">
            <ScrollArea className="h-[300px] px-1">
              {sidebarNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start transition-all",
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-none hover:bg-accent"
                        : "hover:bg-accent/50 border-l-4 border-transparent"
                    )}
                    asChild>
                    <Link href={item.href}>
                      <span
                        className={cn(
                          "p-2 mr-3 rounded-lg",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-accent text-muted-foreground"
                        )}>
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span
                        className={cn(
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        )}>
                        {item.title}
                      </span>
                    </Link>
                  </Button>
                );
              })}
            </ScrollArea>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-3 py-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-accent/50">
            <LogOut className="mr-3 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
