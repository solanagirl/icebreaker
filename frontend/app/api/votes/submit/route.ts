import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { VoteOptionsType } from '@/generated/prisma';

export async function POST(request: Request) {
  try {
    const { userSessionId, itemId, vote } = await request.json();

    if (userSessionId === undefined || itemId === undefined || !vote) {
      return NextResponse.json(
        { error: "userSessionId, itemId, and vote are required" },
        { status: 400 }
      );
    }

    // Validate VoteOptionsType
    if (!Object.values(VoteOptionsType).includes(vote as VoteOptionsType)) {
        return NextResponse.json({ error: "Invalid vote option" }, { status: 400 });
    }

    // Validate that the UserSession and VoteItem exist
    const userSession = await prisma.userSession.findUnique({ where: { id: userSessionId } });
    if (!userSession) {
      return NextResponse.json({ error: "User session not found" }, { status: 404 });
    }

    const voteItem = await prisma.voteItem.findUnique({ where: { id: itemId } });
    if (!voteItem) {
      return NextResponse.json({ error: "Vote item not found" }, { status: 404 });
    }

    // Additional validation could be added here:
    // - Ensure the userSession.gameId aligns with the game context of the voteItem
    //   (requires navigating relations: voteItem -> VoteContent -> ??? -> Game)
    //   Your current schema doesn't directly link VoteContent/VoteItem to a Game.
    //   This might be an important link to add for contextual voting.

    const voteSubmission = await prisma.voteSubmission.create({
      data: {
        userSessionId: userSessionId,
        itemId: itemId,
        vote: vote as VoteOptionsType, // Cast to enum type
      },
    });

    return NextResponse.json(voteSubmission, { status: 201 });
  } catch (error) {
    console.error("Error creating vote submission:", error);
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
            { error: "Vote submission failed. Already voted for this item?" },
            { status: 409 } // Conflict
          );
    }
    return NextResponse.json(
      { error: "Unable to create vote submission" },
      { status: 500 }
    );
  }
} 