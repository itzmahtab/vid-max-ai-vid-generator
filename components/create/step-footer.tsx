"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepFooterProps {
    onBack?: () => void
    onNext?: () => void
    isNextDisabled?: boolean
    nextLabel?: string
    backLabel?: string
    className?: string
}

export function StepFooter({
    onBack,
    onNext,
    isNextDisabled = false,
    nextLabel = "Continue",
    backLabel = "Back",
    className,
}: StepFooterProps) {
    return (
        <div className={cn("flex w-full items-center justify-between border-t pt-6 mt-8", className)}>
            {/* Back Button */}
            <div className="flex-1">
                {onBack && (
                    <Button variant="ghost" size="lg" onClick={onBack} className="gap-2 pl-0 hover:pl-2 transition-all">
                        <ChevronLeft className="h-4 w-4" />
                        {backLabel}
                    </Button>
                )}
            </div>

            {/* Next Button */}
            <div className="flex-1 flex justify-end">
                {onNext && (
                    <Button
                        size="lg"
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className="px-8 text-lg gap-2"
                    >
                        {nextLabel}
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}
