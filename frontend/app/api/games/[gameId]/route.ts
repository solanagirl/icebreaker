import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface GameContext {
  params: {
    gameId: string;
  };
}

export async function GET(request: Request, context: GameContext) {
  try {
    const { gameId } = context.params;

    if (!gameId) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: { id: Number.parseInt(gameId, 10) }, // Assuming gameId in URL is a number
      include: {
        tasks: {
          include: {
            task: {
                include: {
                    config: true // Include task config
                }
            }
          }
        }, // Include tasks selected for this game, and their full details
        playerSessions: true, // Include current player sessions
        predictionRounds: true, // Include prediction rounds
        taskResult: true, // Include task results
        config: true, // Include game configuration
      },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game details:", error);
    return NextResponse.json(
      { error: "Unable to fetch game details" },
      { status: 500 }
    );
  }
} 