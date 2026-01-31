import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Ghost, Lightbulb, BookOpen, BrainCircuit, History, Trophy, Film, Tv, Smile, Car, Dumbbell, Medal, TrendingUp, Music } from "lucide-react"
import { cn } from "@/lib/utils"
import { StepFooter } from "@/components/create/step-footer"

interface NicheSelectionProps {
    onNext: (niche: string) => void
    initialValue?: string
}

const availableNiches = [
    {
        id: "scary-stories",
        label: "Scary Stories",
        description: "Spine-chilling tales and urban legends.",
        icon: Ghost,
        color: "text-purple-500",
    },
    {
        id: "motivational",
        label: "Motivational",
        description: "Inspiring quotes and life advice.",
        icon: Sparkles,
        color: "text-amber-500",
    },
    {
        id: "bedtime-stories",
        label: "Bedtime Stories",
        description: "Soothing stories for better sleep.",
        icon: BookOpen,
        color: "text-blue-400",
    },
    {
        id: "fun-facts",
        label: "Fun Facts",
        description: "Interesting and surprising trivia.",
        icon: Lightbulb,
        color: "text-yellow-500",
    },
    {
        id: "history",
        label: "History",
        description: "Fascinating historical events and figures.",
        icon: History,
        color: "text-red-500",
    },
    {
        id: "philosophy",
        label: "Philosophy",
        description: "Deep questions and thought experiments.",
        icon: BrainCircuit,
        color: "text-emerald-500",
    },
    {
        id: "success-stories",
        label: "Success Stories",
        description: "Biographies of successful people.",
        icon: Trophy,
        color: "text-green-500",
    },
    {
        id: "sports",
        label: "Sports",
        description: "Highlights, stats, and sports commentary.",
        icon: Medal,
        color: "text-orange-500",
    },
    {
        id: "movies",
        label: "Movies",
        description: "Film reviews, facts, and behind-the-scenes.",
        icon: Film,
        color: "text-cyan-500",
    },
    {
        id: "anime",
        label: "Anime",
        description: "Anime recaps, theories, and moments.",
        icon: Tv,
        color: "text-pink-500",
    },
    {
        id: "meme",
        label: "Meme",
        description: "Funny compilations and internet culture.",
        icon: Smile,
        color: "text-yellow-400",
    },
    {
        id: "f1",
        label: "F1 Racing",
        description: "Formula 1 news, facts, and history.",
        icon: Car,
        color: "text-red-600",
    },
    {
        id: "fitness",
        label: "Fitness",
        description: "Workouts, health tips, and motivation.",
        icon: Dumbbell,
        color: "text-blue-600",
    },
    {
        id: "trendings",
        label: "Trendings",
        description: "Viral videos and latest trends.",
        icon: TrendingUp,
        color: "text-rose-500",
    },
    {
        id: "music",
        label: "Music (No-copy-rights)",
        description: "Copyright-free music visualizations.",
        icon: Music,
        color: "text-indigo-500",
    },
]

export function NicheSelection({ onNext, initialValue }: NicheSelectionProps) {
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
    const [customNiche, setCustomNiche] = useState("")
    const [activeTab, setActiveTab] = useState("available")

    // Initialize state based on initialValue
    useEffect(() => {
        if (initialValue) {
            const isAvailable = availableNiches.some(n => n.label === initialValue)
            if (isAvailable) {
                setSelectedNiche(initialValue)
                setActiveTab("available")
            } else {
                setCustomNiche(initialValue)
                setActiveTab("custom")
            }
        }
    }, [initialValue])

    const handleContinue = () => {
        if (activeTab === "available" && selectedNiche) {
            onNext(selectedNiche)
        } else if (activeTab === "custom" && customNiche.trim()) {
            onNext(customNiche)
        }
    }

    const isContinueDisabled =
        (activeTab === "available" && !selectedNiche) ||
        (activeTab === "custom" && !customNiche.trim())

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Choose Your Niche</h2>
                <p className="text-muted-foreground">Select a popular niche or create your own custom topic.</p>
            </div>

            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-6">
                    <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                        <TabsTrigger value="available">Available Niche</TabsTrigger>
                        <TabsTrigger value="custom">Custom Niche</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="available" className="space-y-4">
                    <ScrollArea className="h-[450px] w-full rounded-md border p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableNiches.map((niche) => {
                                const Icon = niche.icon
                                const isSelected = selectedNiche === niche.label

                                return (
                                    <Card
                                        key={niche.id}
                                        className={cn(
                                            "cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md border-2",
                                            isSelected ? "border-primary bg-primary/5" : "border-transparent bg-card"
                                        )}
                                        onClick={() => setSelectedNiche(niche.label)}
                                    >
                                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                            <div className={cn("p-2 rounded-lg bg-muted", niche.color)}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-lg">{niche.label}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription>{niche.description}</CardDescription>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="custom">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Custom Niche</CardTitle>
                            <CardDescription>
                                Enter a specific topic or niche you want to generate videos about.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="custom-niche">Niche Description</Label>
                                <Input
                                    id="custom-niche"
                                    placeholder="e.g., Quantum Physics for Kids, 90s Pop Culture, Vegan Recipes..."
                                    value={customNiche}
                                    onChange={(e) => setCustomNiche(e.target.value)}
                                    className="h-12 text-lg"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <StepFooter
                onNext={handleContinue}
                isNextDisabled={isContinueDisabled}
            // No back button on first step
            />
        </div>
    )
}
