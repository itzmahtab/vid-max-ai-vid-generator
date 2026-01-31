"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Info, Smartphone, Mail, Instagram, Youtube, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"

interface SeriesDetailsProps {
    onSchedule: (data: {
        name: string;
        duration: string;
        platforms: string[];
        publishTime: string
    }) => void
    onBack: () => void
    initialData?: {
        name: string;
        duration: string;
        platforms: string[];
        publishTime: string;
    }
}

const platforms = [
    { id: "tiktok", name: "Tiktok", icon: Smartphone },
    { id: "youtube", name: "Youtube", icon: Youtube },
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "email", name: "Email", icon: Mail },
]

export function SeriesDetails({ onSchedule, onBack, initialData }: SeriesDetailsProps) {
    const [name, setName] = useState(initialData?.name || "")
    const [duration, setDuration] = useState(initialData?.duration || "30-50")
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialData?.platforms || [])
    const [publishTime, setPublishTime] = useState(initialData?.publishTime || "")

    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        )
    }

    const isFormValid = name.trim() !== "" && selectedPlatforms.length > 0 && publishTime !== ""

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Schedule Series</h2>
                <p className="text-muted-foreground text-lg italic">Give your series a name and set the publishing schedule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Series Name */}
                    <div className="space-y-3">
                        <Label htmlFor="series-name" className="text-base font-bold text-zinc-800">Series Name</Label>
                        <Input
                            id="series-name"
                            placeholder="e.g. Daily Motivation, AI Facts"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 text-lg border-2 focus-visible:ring-primary/20"
                        />
                    </div>

                    {/* Duration Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-zinc-800">Video Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger className="h-12 text-lg border-2">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30-50">30-50 sec video</SelectItem>
                                <SelectItem value="60-70">60-70 sec video</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-3">
                        <Label htmlFor="publish-time" className="text-base font-bold text-zinc-800 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            Publish Time
                        </Label>
                        <Input
                            id="publish-time"
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                            className="h-12 text-lg border-2 focus-visible:ring-primary/20"
                        />
                        <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-primary/80 font-medium">
                                Video will generate 3-6 hours before video publish
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Platform Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-bold text-zinc-800">Select Platforms</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {platforms.map((platform) => (
                                <div
                                    key={platform.id}
                                    className={cn(
                                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                        selectedPlatforms.includes(platform.id)
                                            ? "border-primary bg-primary/5"
                                            : "border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-200"
                                    )}
                                    onClick={() => togglePlatform(platform.id)}
                                >
                                    <platform.icon className={cn(
                                        "w-5 h-5",
                                        selectedPlatforms.includes(platform.id) ? "text-primary" : "text-zinc-400"
                                    )} />
                                    <span className={cn(
                                        "font-bold",
                                        selectedPlatforms.includes(platform.id) ? "text-primary" : "text-zinc-600"
                                    )}>
                                        {platform.name}
                                    </span>
                                    <div className="ml-auto">
                                        <div className={cn(
                                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                                            selectedPlatforms.includes(platform.id) ? "bg-primary border-primary" : "border-zinc-200"
                                        )}>
                                            {selectedPlatforms.includes(platform.id) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Card */}
                    <Card className="p-6 bg-zinc-950 text-white border-0 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full" />
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Summary
                        </h3>
                        <div className="space-y-3 text-sm text-zinc-400">
                            <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="text-white font-medium">{duration} Seconds</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Platforms:</span>
                                <span className="text-white font-medium">{selectedPlatforms.length || 0} selected</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frequency:</span>
                                <span className="text-white font-medium italic">Pending AI Generation...</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <StepFooter
                onBack={onBack}
                onNext={() => onSchedule({ name, duration, platforms: selectedPlatforms, publishTime })}
                isNextDisabled={!isFormValid}
                nextLabel="Schedule & Generate"
                backLabel="Back"
            />
        </div>
    )
}

function Check({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}
