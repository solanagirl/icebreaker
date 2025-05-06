"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Users } from "lucide-react"

export default function LobbyPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(240) // 4 minutes in seconds
  const [players, setPlayers] = useState(12)
  const [progress, setProgress] = useState(30)

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/game/round-1")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate players joining
    const playerTimer = setInterval(() => {
      setPlayers((prev) => {
        const newCount = prev + Math.floor(Math.random() * 2)
        if (newCount >= 30) {
          clearInterval(playerTimer)
          return 30
        }
        return newCount
      })

      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 5)
        if (newProgress >= 100) {
          clearInterval(playerTimer)
          setTimeout(() => router.push("/game/round-1"), 1000)
          return 100
        }
        return newProgress
      })
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(playerTimer)
    }
  }, [router])

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-8">
        <Card className="ice-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center icebreaker-title frost-text">Game Lobby</CardTitle>
            <CardDescription className="text-center">Waiting for players to join</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{players} Players</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Starts in {formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Game Filling</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-3">Players Joined</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: players }).map((_, i) => (
                  <Avatar key={i} className="h-10 w-10 border border-border">
                    <AvatarImage src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${i + 1}`} />
                    <AvatarFallback>P{i + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => router.push("/game/round-1")}>
              Skip Waiting
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
