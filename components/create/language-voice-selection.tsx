"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Play, Pause, Globe, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"
import { Languages, DeepgramVoices, FonadalabVoices } from "@/lib/constants"

interface LanguageVoiceSelectionProps {
  onNext: (data: { language: string; voice: string; modelName: string }) => void
  onBack: () => void
  initialLanguage?: string
  initialVoice?: string
}

export function LanguageVoiceSelection({
  onNext,
  onBack,
  initialLanguage,
  initialVoice,
}: LanguageVoiceSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(initialLanguage || null)
  const [selectedVoice, setSelectedVoice] = useState<string | null>(initialVoice || null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Get current model based on selected language
  const currentLanguageData = Languages.find(l => l.language === selectedLanguage)
  const currentModel = currentLanguageData?.modelName // 'deepgram' or 'fonadalab'

  // Filter voices based on model
  const availableVoices = currentModel === "deepgram"
    ? DeepgramVoices
    : currentModel === "fonadalab"
      ? FonadalabVoices
      : []

  useEffect(() => {
    // Reset voice if language changes and previous voice is not compatible
    if (selectedLanguage && selectedVoice) {
      const isVoiceAvailable = availableVoices.some(v => v.modelName === selectedVoice)
      if (!isVoiceAvailable) {
        setSelectedVoice(null)
      }
    }
  }, [selectedLanguage, selectedVoice, availableVoices])

  const togglePreview = (previewUrl: string, voiceName: string) => {
    if (isPlaying === voiceName) {
      audioRef.current?.pause()
      setIsPlaying(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }

      // Fixed path to /voice/ to match public folder structure
      const audio = new Audio(`/voice/${previewUrl}`)

      audio.onerror = () => {
        console.log("Audio preview not found:", previewUrl)
        setIsPlaying(null)
      }

      audio.play().catch(e => console.log("Play error:", e))
      audioRef.current = audio
      setIsPlaying(voiceName)

      audio.onended = () => setIsPlaying(null)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const handleContinue = () => {
    if (selectedLanguage && selectedVoice && currentLanguageData) {
      onNext({
        language: selectedLanguage,
        voice: selectedVoice,
        modelName: currentLanguageData.modelName
      })
    }
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Language & Voice</h2>
        <p className="text-muted-foreground text-lg">Pick a language and a voice that matches your content's tone.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Language Selection Column */}
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2 text-primary/80">
            <Globe className="w-4 h-4" />
            Select Language
          </Label>
          <Select
            value={selectedLanguage || ""}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-full h-12 text-base bg-white border-2 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {Languages.map((lang) => (
                <SelectItem key={lang.modelLangCode} value={lang.language} className="cursor-pointer">
                  <span className="mr-3 text-xl">{lang.countryFlag}</span>
                  {lang.language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Info Card Column */}
        <div className="pt-2">
          {selectedLanguage && currentLanguageData ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 h-full flex flex-col justify-center animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{currentLanguageData.countryFlag}</span>
                <h3 className="text-xl font-bold text-primary">{currentLanguageData.language} selected</h3>
              </div>
              <p className="text-sm text-foreground/80">
                Using <span className="font-semibold uppercase text-primary">{currentLanguageData.modelName}</span> model for high-quality {currentLanguageData.language} generation.
              </p>
            </div>
          ) : (
            <div className="bg-muted/30 border border-dashed border-muted-foreground/20 rounded-xl p-6 h-full flex items-center justify-center text-muted-foreground text-sm">
              Select a language to see model details
            </div>
          )}
        </div>
      </div>

      {/* Voice Selection */}
      {selectedLanguage && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center justify-between border-b pb-4">
            <Label className="text-base font-medium text-foreground/80">
              Available Voices
            </Label>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border uppercase tracking-wider">
              {availableVoices.length} Voices Available
            </span>
          </div>

          {availableVoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableVoices.map((voice) => {
                const isSelected = selectedVoice === voice.modelName
                const isPreviewing = isPlaying === voice.modelName

                return (
                  <Card
                    key={voice.modelName}
                    className={cn(
                      "cursor-pointer transition-all duration-200 border relative group bg-white",
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm grayscale-0"
                        : "border-border hover:border-primary/50 grayscale-[0.2] hover:grayscale-0 hover:shadow-md"
                    )}
                    onClick={() => setSelectedVoice(voice.modelName)}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 p-1 bg-primary text-white rounded-bl-lg animate-in fade-in zoom-in duration-300">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <div className="font-bold text-lg text-zinc-950 truncate pr-2 capitalize leading-tight">
                          {voice.model === "deepgram"
                            ? voice.modelName.split("-")[2]
                            : voice.modelName}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                          <span className="text-zinc-500 lowercase">{voice.gender}</span>
                          <span className="text-zinc-400">{voice.model}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-10 w-10 rounded-full shrink-0 transition-all border",
                          isPreviewing
                            ? "bg-primary text-white border-primary hover:bg-primary/90"
                            : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePreview(voice.preview, voice.modelName)
                        }}
                      >
                        {isPreviewing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground border rounded-xl bg-muted/5 flex flex-col items-center gap-2">
              <p>No voices available for this language.</p>
            </div>
          )}
        </div>
      )}

      <StepFooter
        onBack={onBack}
        onNext={handleContinue}
        isNextDisabled={!selectedLanguage || !selectedVoice}
        backLabel="Back to Niche"
      />
    </div>
  )
}
