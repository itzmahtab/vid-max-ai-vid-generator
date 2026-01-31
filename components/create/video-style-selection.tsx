"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"
import { VideoStyles } from "@/lib/constants"
import Image from "next/image"

interface VideoStyleSelectionProps {
    onNext: (style: string) => void
    onBack: () => void
    initialSelected?: string
}

export function VideoStyleSelection({ onNext, onBack, initialSelected }: VideoStyleSelectionProps) {
    const [selectedStyle, setSelectedStyle] = useState<string | null>(initialSelected || null)

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 pb-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Video Style</h2>
                <p className="text-muted-foreground text-lg">Select a visual style for your AI-generated video frames.</p>
            </div>

            <div className="relative group">
                {/* Horizontal Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-2 -mx-2 snap-x snap-mandatory">
                    {VideoStyles.map((style) => {
                        const isSelected = selectedStyle === style.name

                        return (
                            <div
                                key={style.id}
                                className="flex-none snap-center"
                            >
                                <Card
                                    className={cn(
                                        "relative overflow-hidden cursor-pointer transition-all duration-300 border-4 w-[280px] aspect-[9/16]",
                                        isSelected
                                            ? "border-primary ring-4 ring-primary/20 scale-[1.02] shadow-2xl"
                                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-[1.01] hover:shadow-lg"
                                    )}
                                    onClick={() => setSelectedStyle(style.name)}
                                >
                                    <Image
                                        src={style.image}
                                        alt={style.name}
                                        fill
                                        className="object-cover"
                                        sizes="280px"
                                        priority={style.id === "style-1"}
                                    />

                                    {/* Overlay for Name and Selection */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity",
                                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    )}>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-white text-xl font-bold tracking-tight">{style.name}</span>
                                            {isSelected && (
                                                <div className="bg-primary text-white p-1.5 rounded-full shadow-lg animate-in zoom-in duration-300">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Top Badge for hovered/selected styles */}
                                    <div className={cn(
                                        "absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest transition-opacity",
                                        isSelected ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                                    )}>
                                        Premium Style
                                    </div>
                                </Card>
                            </div>
                        )
                    })}
                </div>

                {/* Info Banner */}
                {selectedStyle && (
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center gap-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                            <Wand2 className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                {selectedStyle} Style selected
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Excellent choice! The <span className="font-semibold text-foreground italic">{selectedStyle}</span> style will give your video a professional, high-end look that resonates with audiences.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <StepFooter
                onBack={onBack}
                onNext={() => selectedStyle && onNext(selectedStyle)}
                isNextDisabled={!selectedStyle}
                backLabel="Back to Voice"
            />

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    )
}
