"use client";

import { BarChart3, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/admin/components/shared/MobileMenu";
// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { topNavLinks } from "@/lib/admin/constants";
import { cn } from "@/lib/utils"; // Standard shadcn utils
import Image from "next/image";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      if (typeof document !== "undefined") {
        window.localStorage.clear();
        const cookies = document.cookie?.split(";") ?? [];
        for (const cookie of cookies) {
          const [name] = cookie.trim().split("=");
          if (!name) continue;
          document.cookie = `${name}=; Max-Age=0; path=/;`;
          document.cookie = `${name}=; Max-Age=0; path=/admin;`;
        }
      }
    } catch (error) {
      console.log(error)
    }

    window.location.href = "/admin";
  }

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        {/* Left Section: Logo & Mobile Trigger */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger */}
          <MobileMenu />

          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              <Image
                src="/logo.png"
                alt="Pawteller logo"
                className="h-8 w-8 rounded-full"
                width={200}
                height={40}
              />
            </div>
            <span className="text-xl font-bold tracking-tight hidden md:inline-block">
              Pawteller
            </span>
          </Link>
        </div>

        {/* Center Section: Desktop Nav (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {topNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatars/01.png" alt="@pawteller" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    PT
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@pawteller.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/account`} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/analytics`} className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={logout} className=" text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
