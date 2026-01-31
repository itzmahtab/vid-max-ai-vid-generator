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
import { ChevronLeft } from "lucide-react"

export default function CreateSeriesPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        niche: "",
        language: "",
        voice: "",
        modelName: "",
        videoStyle: "",
        bgMusic: [] as string[],
        captionStyle: "",
        script: "",
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

    const handleScriptSelect = (script: string) => {
        setFormData((prev) => ({ ...prev, script }))
        setCurrentStep(7)
    }

    const handleSchedule = (data: { name: string; duration: string; platforms: string[]; publishTime: string }) => {
        setFormData((prev) => ({
            ...prev,
            seriesDetails: data
        }))
        console.log("Scheduling Series:", { ...formData, seriesDetails: data })
        // Submit to API here
        alert("Series Scheduled Successfully!")
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
            <div className="mb-10">
                <CreateSeriesStepper currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    Step {currentStep} of 7
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

                {/* Placeholder for AI Script (Step 6) */}
                {currentStep === 6 && (
                    <div className="text-center py-20 flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold">AI Script Step Coming Soon</h2>
                        <p className="text-muted-foreground">This is where the AI will generate your content script.</p>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button onClick={() => setCurrentStep(7)}>Continue to Schedule</Button>
                        </div>
                    </div>
                )}

                {currentStep === 7 && (
                    <SeriesDetails
                        onSchedule={handleSchedule}
                        onBack={handleBack}
                        initialData={formData.seriesDetails}
                    />
                )}

                {/* Placeholder for future steps (if any) */}
                {currentStep > 7 && (
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
