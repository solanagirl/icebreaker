"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Check } from "lucide-react"

interface Task {
  id: number
  type: "TextAnswer" | "ImageUpload" | "SocialLink"
  prompt: string
  completed: boolean
}

interface TaskCardProps {
  task: Task
  onComplete: () => void
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onComplete()
    }, 1000)
  }

  return (
    <Card className={`ice-card ${task.completed ? "border-green-500/50" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {task.completed && <Check className="h-5 w-5 text-green-500" />}
          {task.prompt}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {task.completed ? (
          <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-center">Task completed!</div>
        ) : (
          <div className="space-y-4">
            {task.type === "TextAnswer" && (
              <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="bg-background/50"
              />
            )}

            {task.type === "ImageUpload" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-full h-40 border-2 border-dashed border-border rounded-md flex items-center justify-center bg-background/30">
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Tap to take a photo</p>
                  </div>
                </div>
              </div>
            )}

            {task.type === "SocialLink" && (
              <Input
                placeholder="Paste link here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="bg-background/50"
              />
            )}
          </div>
        )}
      </CardContent>
      {!task.completed && (
        <CardFooter>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={isSubmitting || (task.type !== "ImageUpload" && !answer)}
          >
            {isSubmitting ? "Submitting..." : "Submit Task"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
