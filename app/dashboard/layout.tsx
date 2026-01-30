import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Desktop Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1 transition-all duration-300 md:ml-64">
                <DashboardHeader />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
