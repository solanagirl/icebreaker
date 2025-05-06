"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

export default function Round2Page() {
  const router = useRouter()
  const [prediction, setPrediction] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    // Simulate delay before moving to next round
    setTimeout(() => router.push("/game/round-3"), 2000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-4">
        <Card className="ice-card mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl icebreaker-title frost-text">Round 2: Predictions</CardTitle>
            <CardDescription>Make predictions to earn points</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Round Progress</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="question" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="question">Question</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="question">
            <Card className="ice-card">
              <CardHeader>
                <CardTitle className="text-lg text-center">What percentage of players prefer cats over dogs?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground">Make your prediction (0-100%)</p>

                  {submitted ? (
                    <div className="text-center space-y-4">
                      <p className="text-xl font-semibold">Your prediction: {prediction}%</p>
                      <p className="text-green-500">Prediction submitted!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={prediction}
                        onChange={(e) => setPrediction(e.target.value)}
                        placeholder="Enter your prediction"
                        className="text-center text-lg"
                      />
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={handleSubmit}
                        disabled={!prediction}
                      >
                        Submit Prediction
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
            <Card className="ice-card">
              <CardHeader>
                <CardTitle className="text-lg">Your Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Group 2 (5 members)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <Avatar className="h-12 w-12 border border-primary/30">
                      <AvatarImage src="/diverse-group-avatars.png" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Avatar key={i} className="h-12 w-12 border border-border">
                        <AvatarImage src={`/diverse-group-avatars.png?height=48&width=48&query=avatar ${i + 2}`} />
                        <AvatarFallback>P{i + 2}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="pt-4 space-y-2">
                    <h3 className="text-sm font-medium">Group Standings</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Group 1</span>
                        <span>78 pts</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Group 2 (You)</span>
                        <span>65 pts</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Group 3</span>
                        <span>42 pts</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
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
