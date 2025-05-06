"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/aurora-background"
import { IcebreakerLogo } from "@/components/icebreaker-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/game/lobby")
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
      <AuroraBackground />

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <IcebreakerLogo className="w-32 h-auto" />
        </div>

        <Card className="ice-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center icebreaker-title frost-text">Join the Game</CardTitle>
            <CardDescription className="text-center">Enter your email to join or create a game</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Connecting..." : "Continue"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            By continuing, you agree to the game rules
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
