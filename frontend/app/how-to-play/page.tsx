import { AuroraBackground } from "@/components/aurora-background"
import { IcebreakerLogo } from "@/components/icebreaker-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Award, Sword } from "lucide-react"

export default function HowToPlayPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />

      <div className="w-full max-w-md z-10 mt-4">
        <div className="flex justify-center mb-6">
          <IcebreakerLogo className="w-32 h-auto" />
        </div>

        <Card className="ice-card mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center icebreaker-title frost-text">How To Play</CardTitle>
            <CardDescription className="text-center">ICEBREAKER Game Rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Round 1: Tasks (4 hours)</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete rotating tasks like taking selfies, captioning memes, or answering prompts. You must
                    complete tasks to advance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-secondary/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Voting Round</h3>
                  <p className="text-sm text-muted-foreground">
                    Vote W or L on other players' submissions. Players who didn't complete tasks or vote will be
                    eliminated.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Round 2: Predictions</h3>
                  <p className="text-sm text-muted-foreground">
                    Make predictions about group behavior. The most accurate predictions earn points, while the least
                    accurate are eliminated.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-secondary/20 p-2 rounded-full">
                  <Sword className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Round 3: PVP Elimination</h3>
                  <p className="text-sm text-muted-foreground">
                    Challenge other players to direct competitions. Winners advance to claim rewards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Players who complete the game can claim rewards based on their performance. Higher ranks receive better
                rewards.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  )
}
