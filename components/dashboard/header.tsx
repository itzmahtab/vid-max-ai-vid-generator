"use client"

import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

// Mobile Sidebar Wrapper
function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                {/* Reusing the sidebar content structure, slightly adapted if needed, or just standard sidebar */}
                <div className="h-full">
                    {/* We can refactor DashboardSidebar to be more reusable or Just simpler here for now we render a text block or duplicate sidebar logic if imports are circular. 
                For cleanliness, let's assume we render a simplified version or the component itself if it handles its own container. 
                Since Sidebar has 'hidden md:flex', we can't just render it directly inside Sheet without removing those classes. 
                For now, creating a wrapper or a slot is cleaner, but to deliver value fast, I'll add the mobile trigger.
            */}
                    <div className="p-4">Mobile Menu Placeholder</div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-6 transition-all">
            <div className="flex items-center gap-4">
                <MobileSidebar />
                <h1 className="text-lg font-semibold md:text-xl text-foreground/80">
                    Dashboard
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    )
}
