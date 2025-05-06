"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { IcebreakerLogo } from "@/components/icebreaker-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Gift, Share2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function ResultsPage() {
  const router = useRouter()
  const [rewardClaimed, setRewardClaimed] = useState(false)

  // Trigger confetti on page load
  useEffect(() => {
    const duration = 3 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#0088cc", "#ee444d"],
      })

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#0088cc", "#ee444d"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-4">
        <div className="flex justify-center mb-6">
          <IcebreakerLogo className="w-32 h-auto" />
        </div>

        <Card className="ice-card mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center icebreaker-title frost-text">Game Complete!</CardTitle>
            <CardDescription className="text-center">Congratulations on finishing the game</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage src="/placeholder.svg?key=u3vp2" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-secondary text-white rounded-full p-1">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold">Your Score: 1,250</h3>
                <p className="text-muted-foreground">Rank: 3rd out of 30</p>
              </div>

              <div className="w-full p-4 bg-background/30 rounded-lg">
                <h4 className="font-medium mb-2">Game Stats</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Tasks Completed:</span>
                    <span>4/4</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Votes Cast:</span>
                    <span>12</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Prediction Accuracy:</span>
                    <span>85%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>PVP Battles:</span>
                    <span>Won 1, Lost 0</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {rewardClaimed ? (
              <div className="text-center text-green-500 p-2">Reward claimed successfully!</div>
            ) : (
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => setRewardClaimed(true)}>
                <Gift className="mr-2 h-5 w-5" />
                Claim Your Reward
              </Button>
            )}

            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              <Share2 className="mr-2 h-5 w-5" />
              Share Results
            </Button>
          </CardFooter>
        </Card>

        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => router.push("/")}>
          Return to Home
        </Button>
      </div>
    </main>
  )
}
