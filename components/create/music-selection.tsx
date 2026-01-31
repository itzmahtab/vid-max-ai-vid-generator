"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Music2, Check, Headset } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"
import { BackgroundMusic } from "@/lib/constants"

interface MusicSelectionProps {
    onNext: (musicIds: string[]) => void
    onBack: () => void
    initialSelected?: string[]
}

export function MusicSelection({ onNext, onBack, initialSelected = [] }: MusicSelectionProps) {
    const [selectedMusic, setSelectedMusic] = useState<string[]>(initialSelected)
    const [isPlaying, setIsPlaying] = useState<string | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const togglePreview = (url: string, id: string) => {
        if (isPlaying === id) {
            audioRef.current?.pause()
            setIsPlaying(null)
        } else {
            if (audioRef.current) {
                audioRef.current.pause()
            }
            const audio = new Audio(url)
            audio.play().catch(e => console.error("Play error:", e))
            audioRef.current = audio
            setIsPlaying(id)
            audio.onended = () => setIsPlaying(null)
        }
    }

    const toggleSelect = (id: string) => {
        setSelectedMusic(prev =>
            prev.includes(id)
                ? prev.filter(m => m !== id)
                : [...prev, id]
        )
    }

    useEffect(() => {
        return () => {
            audioRef.current?.pause()
        }
    }, [])

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Background Music</h2>
                <p className="text-muted-foreground text-lg">Choose one or more tracks to set the mood for your video.</p>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Headset className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Multi-selection enabled</h3>
                    <p className="text-sm text-muted-foreground text-balance">You can select multiple tracks. We'll rotate between them during the video.</p>
                </div>
                <div className="ml-auto shrink-0">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {selectedMusic.length} Selected
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {BackgroundMusic.map((music) => {
                    const isSelected = selectedMusic.includes(music.id)
                    const isPreviewing = isPlaying === music.id

                    return (
                        <div
                            key={music.id}
                            className={cn(
                                "group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer",
                                isSelected
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-border bg-white hover:border-primary/30 hover:bg-zinc-50/50"
                            )}
                            onClick={() => toggleSelect(music.id)}
                        >
                            <div className={cn(
                                "h-12 w-12 rounded-lg flex items-center justify-center transition-colors shrink-0",
                                isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            )}>
                                {isSelected ? <Check className="w-6 h-6 animate-in zoom-in duration-300" /> : <Music2 className="w-6 h-6" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={cn(
                                    "font-bold text-base transition-colors truncate",
                                    isSelected ? "text-primary text-zinc-950" : "text-zinc-900"
                                )}>
                                    {music.name}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                    Duration: {music.duration} • MP3
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-10 w-10 rounded-full shrink-0 transition-all border",
                                    isPreviewing
                                        ? "bg-primary text-white border-primary hover:bg-primary/90"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                                )}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    togglePreview(music.url, music.id)
                                }}
                            >
                                {isPreviewing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                            </Button>
                        </div>
                    )
                })}
            </div>

            <StepFooter
                onBack={onBack}
                onNext={() => onNext(selectedMusic)}
                isNextDisabled={selectedMusic.length === 0}
                backLabel="Back to Voice"
            />
        </div>
    )
}
