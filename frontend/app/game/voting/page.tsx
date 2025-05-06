"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AuroraBackground } from "@/components/aurora-background"
import { GameHeader } from "@/components/game-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThumbsDown, ThumbsUp } from "lucide-react"

// Sample vote items
const voteItems = [
  {
    id: 1,
    type: "meme",
    content: "/placeholder.svg?key=1jrqe",
    caption: "When you realize it's only Tuesday",
    author: "Player 12",
  },
  {
    id: 2,
    type: "tweet",
    content: "Hot take: Pineapple DOES belong on pizza. Fight me.",
    author: "Player 5",
  },
  {
    id: 3,
    type: "opinion",
    content: "AI will eventually replace all human jobs within 20 years.",
    author: "Player 23",
  },
  {
    id: 4,
    type: "meme",
    content: "/placeholder.svg?key=sxqnj",
    caption: "My cat when I try to work from home",
    author: "Player 8",
  },
]

export default function VotingPage() {
  const router = useRouter()
  const [currentItem, setCurrentItem] = useState(0)
  const [votes, setVotes] = useState<Record<number, "W" | "L">>({})

  const handleVote = (vote: "W" | "L") => {
    setVotes((prev) => ({ ...prev, [voteItems[currentItem].id]: vote }))

    if (currentItem < voteItems.length - 1) {
      setCurrentItem((prev) => prev + 1)
    } else {
      // All votes completed
      setTimeout(() => router.push("/game/round-2"), 500)
    }
  }

  const progress = ((currentItem + 1) / voteItems.length) * 100

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AuroraBackground />
      <GameHeader />

      <div className="w-full max-w-md z-10 mt-4">
        <Card className="ice-card mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl icebreaker-title frost-text">Voting Round</CardTitle>
            <CardDescription>Vote W or L on each submission</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {currentItem + 1}/{voteItems.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="ice-card">
          <CardContent className="pt-6">
            {voteItems[currentItem].type === "meme" ? (
              <div className="space-y-3">
                <Image
                  src={voteItems[currentItem].content || "/placeholder.svg"}
                  alt="Meme"
                  width={300}
                  height={300}
                  className="rounded-md mx-auto"
                />
                <p className="text-center">{voteItems[currentItem].caption}</p>
              </div>
            ) : (
              <div className="p-6 text-center text-lg">"{voteItems[currentItem].content}"</div>
            )}

            <div className="text-sm text-muted-foreground text-center mt-4">
              Submitted by {voteItems[currentItem].author}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={() => handleVote("L")}
            >
              <ThumbsDown className="mr-2 h-5 w-5" />L
            </Button>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={() => handleVote("W")}>
              <ThumbsUp className="mr-2 h-5 w-5" />W
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
