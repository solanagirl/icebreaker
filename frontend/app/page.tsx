import { AuroraBackground } from "@/components/aurora-background"
import { IcebreakerLogo } from "@/components/icebreaker-logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      <AuroraBackground />

      <div className="flex flex-col items-center justify-center space-y-8 z-10 text-center">
        <IcebreakerLogo className="w-64 h-auto mb-4" />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold icebreaker-title frost-text">ICEBREAKER</h1>
          <p className="text-lg text-muted-foreground">Break the ice. Win the game.</p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/login">Enter Game</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary">
            <Link href="/how-to-play">How To Play</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
