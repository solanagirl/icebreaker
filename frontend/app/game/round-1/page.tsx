"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

// Sample tasks
const tasks = [
  {
    id: 1,
    type: "TextAnswer",
    prompt: "What's your favorite ice breaker question?",
    completed: false,
  },
  {
    id: 2,
    type: "ImageUpload",
    prompt: "Take a selfie with something blue",
    completed: false,
  },
  {
    id: 3,
    type: "SocialLink",
    prompt: "Share your favorite meme and paste the link",
    completed: false,
  },
  {
    id: 4,
    type: "TextAnswer",
    prompt: "If you could have any superpower, what would it be?",
    completed: false,
  },
]

export default function Round1Page() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(14400) // 4 hours in seconds
  const [roundProgress, setRoundProgress] = useState(0)
  const [activeTasks, setActiveTasks] = useState(tasks)

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/game/voting")
          return 0
        }
        return prev - 1
      })

      // Simulate progress
      setRoundProgress((prev) => {
        const newProgress = prev + 0.01
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => router.push("/game/voting"), 1000)
          return 100
        }
        return newProgress
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  // Format time as hh:mm:ss
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const completeTask = (taskId: number) => {
    setActiveTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }

  const completedCount = activeTasks.filter((t) => t.completed).length
  const completionPercentage = (completedCount / activeTasks.length) * 100

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-4">
        <Card className="ice-card mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl icebreaker-title frost-text">Round 1: Tasks</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <CardDescription>Complete tasks to advance to the next round</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your Progress</span>
                <span>
                  {completedCount}/{activeTasks.length} Tasks
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            {activeTasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={() => completeTask(task.id)} />
            ))}

            <Button className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={() => router.push("/game/voting")}>
              Continue to Voting
            </Button>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="ice-card">
              <CardHeader>
                <CardTitle className="text-lg">Team Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Team 1</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Team 2</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall</span>
                      <span>{Math.floor(roundProgress)}%</span>
                    </div>
                    <Progress value={roundProgress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
