import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { Bot, Calendar, Clapperboard, Mail, Youtube, Instagram, Share2 } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-500">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b backdrop-blur-md bg-background/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center animate-fade-in-up" href="#">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">VidMaxx</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6 animate-fade-in-up delay-100">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 drop-shadow-sm">
                  AI Short Video Generator & Scheduler
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up delay-100">
                  Automate your content creation. Generate viral short videos and auto-schedule them to YouTube, Instagram, TikTok, and Email.
                </p>
              </div>
              <div className="space-y-4 md:space-x-4 md:space-y-0 animate-fade-in-up delay-200">
                <Button size="lg" className="h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 shadow-sm hover:shadow-md transition-all">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in-up delay-100">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to go viral</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stop spending hours editing and scheduling. Let VidMaxx handle your entire video content workflow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-200">
                <CardHeader>
                  <Bot className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI Video Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Turn text prompts into engaging short-form videos with realistic voiceovers and dynamic visuals.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-200">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Auto Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Schedule content weeks in advance. Our AI determines the best posting times for maximum engagement.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-200">
                <CardHeader>
                  <Share2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Publish simultaneously to YouTube Shorts, Instagram Reels, and TikTok with platform-specific optimizations.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-300">
                <CardHeader>
                  <Youtube className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>YouTube Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Manage your channel effortlessly. Auto-generate titles, descriptions, and tags for better SEO.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-300">
                <CardHeader>
                  <Instagram className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Instagram Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Boost your Reels reach. Consistent posting ensures your audience stays engaged and growing.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl bg-card/60 backdrop-blur-sm animate-fade-in-up delay-300">
                <CardHeader>
                  <Mail className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Email Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Embed your latest videos directly into email newsletters to drive traffic and conversion.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
