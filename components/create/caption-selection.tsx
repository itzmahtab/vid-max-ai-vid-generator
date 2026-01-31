"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, Sparkles, Type } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"
import { CaptionStyles } from "@/lib/constants"

interface CaptionSelectionProps {
    onNext: (styleId: string) => void
    onBack: () => void
    initialSelected?: string
}

export function CaptionSelection({ onNext, onBack, initialSelected }: CaptionSelectionProps) {
    const [selectedStyle, setSelectedStyle] = useState<string | null>(initialSelected || null)

    const demoText = "AI Video Generation Made Simple"

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto space-y-8 pb-10">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight">Caption Style</h2>
                <p className="text-muted-foreground text-lg">Choose a visual style for your video subtitles. These are animated!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CaptionStyles.map((style) => {
                    const isSelected = selectedStyle === style.id

                    return (
                        <Card
                            key={style.id}
                            className={cn(
                                "relative overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-col h-[240px]",
                                isSelected
                                    ? "border-primary ring-2 ring-primary/20 bg-primary/5 shadow-lg scale-[1.02]"
                                    : "border-border hover:border-primary/40 bg-zinc-50/50 hover:bg-white"
                            )}
                            onClick={() => setSelectedStyle(style.id)}
                        >
                            {/* Preview Area */}
                            <div className="relative flex-1 bg-zinc-900 flex items-center justify-center overflow-hidden p-4 group">
                                {/* Simulated Background Video (dark gradient) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-60" />

                                {/* Animated Text Preview */}
                                <div className="relative z-10 text-center px-4 w-full">
                                    <AnimatedCaption
                                        text={demoText}
                                        type={style.animation}
                                        customStyle={style.style}
                                        isActive={isSelected}
                                    />
                                </div>

                                {/* Selection Overlay */}
                                {isSelected && (
                                    <div className="absolute top-3 right-3 bg-primary text-white p-1 rounded-full shadow-lg animate-in zoom-in">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] text-white/70 uppercase font-black tracking-tighter">
                                    Preview
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-4 bg-white dark:bg-zinc-950">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{style.name}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {style.description}
                                </p>
                            </div>
                        </Card>
                    )
                })}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center gap-4 max-w-3xl mx-auto w-full">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold">Remotion Ready</h4>
                    <p className="text-sm text-muted-foreground">These styles are built with reusable logic compatible with our Remotion rendering engine.</p>
                </div>
            </div>

            <StepFooter
                onBack={onBack}
                onNext={() => selectedStyle && onNext(selectedStyle)}
                isNextDisabled={!selectedStyle}
                backLabel="Back to Script"
            />

            <style jsx global>{`
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeMove {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes highlightSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pop-words {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-fade-words {
          animation: fadeMove 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    )
}

function AnimatedCaption({ text, type, customStyle, isActive }: { text: string, type: string, customStyle: any, isActive: boolean }) {
    const words = text.split(" ")
    const [activeWordIdx, setActiveWordIdx] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveWordIdx((prev) => (prev + 1) % (words.length + 2))
        }, 400)
        return () => clearInterval(interval)
    }, [words.length])

    return (
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {words.map((word, i) => {
                const isWordActive = activeWordIdx === i

                if (type === "fade") {
                    return (
                        <span
                            key={i}
                            style={customStyle}
                            className="text-xl md:text-2xl transition-all duration-300"
                        >
                            {word}
                        </span>
                    )
                }

                if (type === "pop") {
                    const { highlightColor, fillColor, ...restStyle } = customStyle
                    return (
                        <span
                            key={i}
                            style={{
                                ...restStyle,
                                animationDelay: `${i * 0.1}s`,
                                display: "inline-block"
                            }}
                            className={cn(
                                "text-xl md:text-3xl",
                                isActive ? "animate-pop-words" : ""
                            )}
                        >
                            {word}
                        </span>
                    )
                }

                if (type === "highlight") {
                    const { highlightColor, fillColor, ...restStyle } = customStyle
                    return (
                        <span
                            key={i}
                            style={{
                                ...restStyle,
                                color: isWordActive ? (highlightColor || "#FACC15") : customStyle.color,
                                transform: isWordActive ? "scale(1.1)" : "scale(1)",
                                transition: "all 0.2s ease"
                            }}
                            className="text-xl md:text-2xl"
                        >
                            {word}
                        </span>
                    )
                }

                if (type === "box") {
                    const { highlightColor, fillColor, ...restStyle } = customStyle
                    return (
                        <span
                            key={i}
                            style={{
                                ...restStyle,
                                backgroundColor: isWordActive ? customStyle.backgroundColor : "transparent",
                                color: isWordActive ? customStyle.color : "#FFFFFF",
                                borderRadius: "4px",
                                transform: isWordActive ? "rotate(-2deg)" : "rotate(0)",
                                transition: "all 0.15s ease"
                            }}
                            className="text-xl md:text-2xl px-1"
                        >
                            {word}
                        </span>
                    )
                }

                if (type === "gradient") {
                    const { highlightColor, fillColor, ...restStyle } = customStyle
                    return (
                        <span
                            key={i}
                            style={{
                                ...restStyle,
                                backgroundSize: "200% auto",
                            }}
                            className="text-xl md:text-3xl bg-clip-text animate-[textShimmer_3s_linear_infinite]"
                        >
                            {word}
                        </span>
                    )
                }

                if (type === "karaoke") {
                    const { highlightColor, fillColor, ...restStyle } = customStyle
                    return (
                        <span
                            key={i}
                            className="relative text-xl md:text-2xl overflow-hidden"
                            style={{ color: customStyle.color, fontWeight: customStyle.fontWeight }}
                        >
                            {word}
                            <span
                                className="absolute left-0 top-0 overflow-hidden transition-all duration-300 pointer-events-none"
                                style={{
                                    width: isWordActive ? "100%" : "0%",
                                    color: fillColor || "#22C55E",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {word}
                            </span>
                        </span>
                    )
                }

                const { highlightColor, fillColor, ...restStyle } = customStyle
                return <span key={i} style={restStyle}>{word}</span>
            })}
        </div>
    )
}
