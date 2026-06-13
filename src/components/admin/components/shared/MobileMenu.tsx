"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { topNavLinks, sideNavLinks } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const pathname = usePathname();

  // Helper to render a list of links
  const renderLinks = (links: typeof topNavLinks) => (
    <div className="flex flex-col space-y-3">
      {links.map((link) => (
        <SheetClose key={link.href} asChild>
          <Link
            href={link.href} aria-describedby={link.name}
            className={cn(
              "text-lg font-medium px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        </SheetClose>
      ))}
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-full max-w-xs gap-0 p-0 sm:max-w-sm">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-xl">Menu</span>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>




        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Top Nav Group */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground px-2 uppercase tracking-wider">
              Main
            </h4>
            {renderLinks(topNavLinks)}
          </div>

          <div className="h-px bg-border" />

          {/* Side Nav Group */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground px-2 uppercase tracking-wider">
              Management
            </h4>
            {renderLinks(sideNavLinks)}
          </div>
        </div>

        <div className="p-4 border-t bg-muted/50">
          <p className="text-xs text-center text-muted-foreground">
            © 2024 Pawteller CMS
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}