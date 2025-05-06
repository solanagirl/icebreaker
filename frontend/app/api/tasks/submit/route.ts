import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// This API route assumes that the actual submission content (text, image URL, etc.)
// is handled separately or will be added to the TaskSubmission model later.
// It currently only records the act of submission.

export async function POST(request: Request) {
  try {
    const { userSessionId, taskId, taskResultId } = await request.json();

    if (userSessionId === undefined || taskId === undefined || taskResultId === undefined) {
      return NextResponse.json(
        { error: "userSessionId, taskId, and taskResultId are required" },
        { status: 400 }
      );
    }

    // Validate that the UserSession, Task, and TaskResult exist
    const userSession = await prisma.userSession.findUnique({ where: { id: userSessionId } });
    if (!userSession) {
      return NextResponse.json({ error: "User session not found" }, { status: 404 });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const taskResult = await prisma.taskResult.findUnique({ where: { id: taskResultId } });
    if (!taskResult) {
      return NextResponse.json({ error: "Task result not found" }, { status: 404 });
    }
    
    // Potentially add logic here to check if the task is part of the game 
    // associated with taskResult.gameId and if the userSession is part of that game.

    const submission = await prisma.taskSubmission.create({
      data: {
        userSessionId: userSessionId,
        taskId: taskId,
        taskResultId: taskResultId,
        // submittedAt is @default(now())
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Error creating task submission:", error);
    // Handle potential unique constraint violations if a user tries to submit multiple times
    // if that's not allowed by business logic (e.g., @@id([userSessionId, taskId, taskResultId]))
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
            { error: "Task submission failed due to a unique constraint. Already submitted?" },
            { status: 409 } // Conflict
          );
    }
    return NextResponse.json(
      { error: "Unable to create task submission" },
      { status: 500 }
    );
  }
} 