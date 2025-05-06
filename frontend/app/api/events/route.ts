import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        game: true, // Include related games if needed
        attendees: true, // Include attendees if needed
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Unable to fetch events" },
      { status: 500 }
    );
  }
} 