"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CreateSeriesStepperProps {
    currentStep: number
}

const steps = [
    { id: 1, label: "Niche" },
    { id: 2, label: "Language & Voice" },
    { id: 3, label: "Video Style" },
    { id: 4, label: "Music" },
    { id: 5, label: "Caption Style" },
    { id: 6, label: "Schedule" },
]

export function CreateSeriesStepper({ currentStep }: CreateSeriesStepperProps) {
    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between px-4 md:px-12">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted transition-all duration-300"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {/* Steps */}
                {steps.map((step) => {
                    const isCompleted = currentStep > step.id
                    const isActive = currentStep === step.id

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background font-semibold transition-all duration-300",
                                    isActive && "border-primary bg-primary text-primary-foreground scale-110 shadow-lg",
                                    isCompleted && "border-primary bg-primary text-primary-foreground",
                                    !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <Check className="h-4 w-4" /> : <span>{step.id}</span>}
                            </div>
                            <span
                                className={cn(
                                    "absolute -bottom-7 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                                    (isActive || isCompleted) ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
