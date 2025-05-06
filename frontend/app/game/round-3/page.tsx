"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sword } from "lucide-react"

// Sample opponents
const opponents = [
  {
    id: 1,
    name: "Player 8",
    avatar: "/diverse-group-futuristic-avatars.png",
    score: 85,
  },
  {
    id: 2,
    name: "Player 15",
    avatar: "/placeholder.svg?key=7bhyx",
    score: 72,
  },
  {
    id: 3,
    name: "Player 3",
    avatar: "/diverse-group-futuristic-setting.png",
    score: 68,
  },
]

export default function Round3Page() {
  const router = useRouter()
  const [selectedOpponent, setSelectedOpponent] = useState<number | null>(null)
  const [battleResult, setBattleResult] = useState<"win" | "lose" | null>(null)

  const handleSelectOpponent = (id: number) => {
    setSelectedOpponent(id)
  }

  const handleBattle = () => {
    // Simulate battle result (random for demo)
    const result = Math.random() > 0.5 ? "win" : "lose"
    setBattleResult(result)

    // Navigate to results after delay
    setTimeout(() => {
      router.push("/game/results")
    }, 3000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-4">
        <Card className="ice-card mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl icebreaker-title frost-text">Round 3: PVP Elimination</CardTitle>
            <CardDescription>Challenge an opponent to advance</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Players Remaining</span>
                <span>40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {battleResult ? (
          <Card className={`ice-card ${battleResult === "win" ? "border-green-500" : "border-red-500"}`}>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {battleResult === "win" ? "Victory!" : "Defeated!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-4">
                {battleResult === "win"
                  ? "You've defeated your opponent and advanced!"
                  : "You've been eliminated from the competition."}
              </p>
              <div className="flex justify-center items-center gap-8 my-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?key=2capt" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <span className="mt-2">You</span>
                </div>

                <Sword className={`h-8 w-8 ${battleResult === "win" ? "text-green-500" : "text-red-500"}`} />

                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-muted">
                    <AvatarImage src={opponents.find((o) => o.id === selectedOpponent)?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>VS</AvatarFallback>
                  </Avatar>
                  <span className="mt-2">{opponents.find((o) => o.id === selectedOpponent)?.name}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => router.push("/game/results")}>
                Continue to Results
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="ice-card">
            <CardHeader>
              <CardTitle className="text-lg text-center">Select an Opponent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opponents.map((opponent) => (
                  <div
                    key={opponent.id}
                    className={`p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-colors ${
                      selectedOpponent === opponent.id
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-background/30 hover:bg-background/50"
                    }`}
                    onClick={() => handleSelectOpponent(opponent.id)}
                  >
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={opponent.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{opponent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{opponent.name}</div>
                      <div className="text-sm text-muted-foreground">Score: {opponent.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={handleBattle}
                disabled={selectedOpponent === null}
              >
                <Sword className="mr-2 h-5 w-5" />
                Battle Selected Opponent
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  )
}
