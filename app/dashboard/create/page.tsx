"use client"

import { useState } from "react"
import { CreateSeriesStepper } from "@/components/create/create-series-stepper"
import { LanguageVoiceSelection } from "@/components/create/language-voice-selection"
import { NicheSelection } from "@/components/create/niche-selection"
import { MusicSelection } from "@/components/create/music-selection"
import { VideoStyleSelection } from "@/components/create/video-style-selection"
import { CaptionSelection } from "@/components/create/caption-selection"
import { SeriesDetails } from "@/components/create/series-details"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function CreateSeriesPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        niche: "",
        language: "",
        voice: "",
        modelName: "",
        videoStyle: "",
        bgMusic: [] as string[],
        captionStyle: "",
        media: "",
        seriesDetails: {
            name: "",
            duration: "30-50",
            platforms: [] as string[],
            publishTime: ""
        }
    })

    const handleNicheSelect = (niche: string) => {
        setFormData((prev) => ({ ...prev, niche }))
        setCurrentStep(2)
    }

    const handleLanguageVoiceSelect = (data: { language: string; voice: string; modelName: string }) => {
        setFormData((prev) => ({
            ...prev,
            language: data.language,
            voice: data.voice,
            modelName: data.modelName
        }))
        setCurrentStep(3)
    }

    const handleVideoStyleSelect = (videoStyle: string) => {
        setFormData((prev) => ({ ...prev, videoStyle }))
        setCurrentStep(4)
    }

    const handleMusicSelect = (bgMusic: string[]) => {
        setFormData((prev) => ({ ...prev, bgMusic }))
        setCurrentStep(5)
    }

    const handleCaptionStyleSelect = (captionStyle: string) => {
        setFormData((prev) => ({ ...prev, captionStyle }))
        setCurrentStep(6)
    }

    const handleSchedule = async (data: { name: string; duration: string; platforms: string[]; publishTime: string }) => {
        setLoading(true)
        try {
            const finalData = {
                ...formData,
                seriesDetails: data
            }

            const response = await fetch('/api/series', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalData)
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error || 'Failed to schedule series')
            }

            toast.success("Series Scheduled Successfully!")
            router.push('/dashboard')
        } catch (error: any) {
            console.error("Scheduling Error:", error)
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(1, prev - 1))
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Header / Back Button */}
            <div className="flex items-center gap-4 mb-6">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Stepper */}
            <div className={cn("mb-10", loading && "opacity-50 pointer-events-none")}>
                <CreateSeriesStepper currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <div className={cn("flex-1 space-y-4", loading && "opacity-50 pointer-events-none relative")}>
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 rounded-xl">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="font-bold text-lg">Scheduling your series...</p>
                        </div>
                    </div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    Step {currentStep} of 6
                </div>
                {currentStep === 1 && (
                    <NicheSelection
                        onNext={handleNicheSelect}
                        initialValue={formData.niche}
                    />
                )}

                {currentStep === 2 && (
                    <LanguageVoiceSelection
                        onNext={handleLanguageVoiceSelect}
                        onBack={handleBack}
                        initialLanguage={formData.language}
                        initialVoice={formData.voice}
                    />
                )}

                {currentStep === 3 && (
                    <VideoStyleSelection
                        onNext={handleVideoStyleSelect}
                        onBack={handleBack}
                        initialSelected={formData.videoStyle}
                    />
                )}

                {currentStep === 4 && (
                    <MusicSelection
                        onNext={handleMusicSelect}
                        onBack={handleBack}
                        initialSelected={formData.bgMusic}
                    />
                )}

                {currentStep === 5 && (
                    <CaptionSelection
                        onNext={handleCaptionStyleSelect}
                        onBack={handleBack}
                        initialSelected={formData.captionStyle}
                    />
                )}

                {currentStep === 6 && (
                    <SeriesDetails
                        onSchedule={handleSchedule}
                        onBack={handleBack}
                        initialData={formData.seriesDetails}
                    />
                )}

                {/* Placeholder for future steps (if any) */}
                {currentStep > 6 && (
                    <div className="text-center py-20 flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold text-primary">All Steps Completed!</h2>
                        <div className="bg-muted p-6 rounded-lg text-left max-w-md w-full space-y-2">
                            <p><strong>Series Name:</strong> {formData.seriesDetails.name}</p>
                            <p><strong>Platforms:</strong> {formData.seriesDetails.platforms.join(", ")}</p>
                            <p><strong>Publish Time:</strong> {formData.seriesDetails.publishTime}</p>
                        </div>
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
