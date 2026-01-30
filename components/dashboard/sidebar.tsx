"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Clapperboard,
    LayoutGrid,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    Sparkles,
    User,
    Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { icon: LayoutGrid, label: "Series", href: "/dashboard/series" },
    { icon: Video, label: "Videos", href: "/dashboard/videos" },
    { icon: BookOpen, label: "Guides", href: "/dashboard/guides" },
    { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background hidden md:flex md:flex-col">
            {/* Sidebar Header / Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link className="flex items-center gap-2 font-bold text-xl text-primary" href="/">
                    {/* Using Icon as placeholder since logo.png is missing. Replace <Clapperboard /> with <img src="/logo.png" /> if added. */}
                    <Clapperboard className="h-7 w-7" />
                    <span>VidMaxx</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
                {/* Create Button */}
                <Button className="w-full gap-2 text-md py-6 shadow-md" size="lg">
                    <Plus className="h-5 w-5" />
                    Create New Series
                </Button>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                    isActive && "bg-primary/10 text-primary font-medium"
                                )}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-lg">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t bg-muted/20 space-y-2">
                <Link
                    href="/dashboard/upgrade"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <span className="text-base font-medium">Upgrade Plan</span>
                </Link>
                <Link
                    href="/user-profile" // Clerk generic profile or custom page
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                    <User className="h-5 w-5" />
                    <span className="text-base font-medium">Profile Settings</span>
                </Link>
            </div>
        </aside>
    )
}
