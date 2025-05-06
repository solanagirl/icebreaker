import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, gameId } = await request.json();

    if (!email || !gameId) {
      return NextResponse.json(
        { error: "Email and gameId are required" },
        { status: 400 }
      );
    }

    // Find or create the email record
    let emailRecord = await prisma.emailRecord.findUnique({
      where: { address: email },
    });

    if (!emailRecord) {
      emailRecord = await prisma.emailRecord.create({
        data: { address: email },
      });
    }

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Create the user session
    // Assuming default status is 'Registered' as per your schema enum
    const userSession = await prisma.userSession.create({
      data: {
        emailId: emailRecord.id,
        gameId: gameId,
        status: 'Registered', // Default status
      },
    });

    return NextResponse.json(userSession, { status: 201 });
  } catch (error) {
    console.error("Error creating user session:", error);
    // Consider more specific error handling, e.g., unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
            { error: "User is already registered for this game or another unique constraint failed." },
            { status: 409 } // Conflict
          );
    }
    return NextResponse.json(
      { error: "Unable to create user session" },
      { status: 500 }
    );
  }
} 