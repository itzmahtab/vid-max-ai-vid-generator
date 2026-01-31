"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Wand2, FileText, Copy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"
import { toast } from "sonner"

interface ContentScriptProps {
    onNext: (script: string) => void
    onBack: () => void
    initialValue?: string
}

export function ContentScript({ onNext, onBack, initialValue = "" }: ContentScriptProps) {
    const [script, setScript] = useState(initialValue)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateAI = () => {
        setIsGenerating(true)
        // Simulated AI Generation
        setTimeout(() => {
            setScript("Success is not final, failure is not fatal: it is the courage to continue that counts. Your time is limited, so don't waste it living someone else's life. Believe you can and you're halfway there. The only way to do great work is to love what you do.")
            setIsGenerating(false)
            toast.success("AI Script generated!")
        }, 1500)
    }

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">AI Video Script</h2>
                    <p className="text-muted-foreground text-lg">Review and edit your video script or generate a new one with AI.</p>
                </div>
                <Button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="shrink-0 gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg"
                >
                    {isGenerating ? (
                        <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}
                    {isGenerating ? "Generating..." : "Generate with AI"}
                </Button>
            </div>

            <Card className="relative p-1 border-2 group focus-within:border-primary/50 transition-all overflow-hidden bg-white">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 gap-1.5"
                        onClick={() => {
                            navigator.clipboard.writeText(script)
                            toast.success("Copied to clipboard")
                        }}
                    >
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                    </Button>
                </div>

                <div className="absolute left-6 top-6 pointer-events-none opacity-20">
                    <FileText className="w-12 h-12 text-zinc-950" />
                </div>

                <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Write your script here or use the AI generator..."
                    className="min-h-[300px] text-lg leading-relaxed border-0 focus-visible:ring-0 p-8 pt-12 resize-none bg-transparent text-zinc-800"
                />

                <div className="p-4 bg-zinc-50 border-t flex justify-between items-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <Wand2 className="w-3.5 h-3.5 text-primary" />
                        AI Enhanced Editor
                    </div>
                    <div>{script.length} Characters</div>
                </div>
            </Card>

            <StepFooter
                onBack={onBack}
                onNext={() => onNext(script)}
                isNextDisabled={script.trim().length < 10}
                backLabel="Back to Captions"
            />
        </div>
    )
}
