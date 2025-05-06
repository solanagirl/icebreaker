import { TaskSubmissionType, TaskSelection, EmailRecord, PrismaClient } from "../generated/prisma/client"
const prisma = new PrismaClient();

async function main() {
  const emailRecords = await prisma.emailRecord.createMany({
    data: [
      { address: 'alice@example.com' },
      { address: 'bob@example.com' },
      { address: 'charlie@example.com' },
    ],
    skipDuplicates: true,
  });

  // Step 2: Fetch the created emails (needed to connect via ID)
  const emails: EmailRecord[] = await prisma.emailRecord.findMany({
    where: {
      address: { in: ['alice@example.com', 'bob@example.com', 'charlie@example.com'] },
    },
  });

  // Step 2: Create Event with time range
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 1000 * 60 * 60); // +1 hour

  const event = await prisma.event.create({
    data: {
      link: 'https://example.com/game-night',
      startTime,
      endTime,
      attendees: {
        connect: emails.map((email: EmailRecord) => ({ id: email.id })),
      },
    },
  });

  // Step 3: Create Game linked to the event
  const game = await prisma.game.create({
    data: {
      eventId: event.id,
      duration: 3600, // optional, default is 3600
    },
  });

    // Step 4: Create a UserSession for each attendee
    const userSessions = await Promise.all(
      emails.map((email) =>
        prisma.userSession.create({
          data: {
            emailId: email.id,
            gameId: game.id,
            status: 'Registered', // or another value from SessionStatus enum
          },
        })
      )
    );
  
    console.log(`✅ Seeded Event ${event.id}, Game ${game.id}, and ${userSessions.length} UserSessions`);
  

  const configs = await Promise.all([
    prisma.taskConfig.create({
      data: {
        submissionType: TaskSubmissionType.TextAnswer,
      },
    }),
    prisma.taskConfig.create({
      data: {
        submissionType: TaskSubmissionType.ImageUpload,
      },
    }),
    prisma.taskConfig.create({
      data: {
        submissionType: TaskSubmissionType.SocialLink,
      },
    }),
  ]);

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        configId: configs[0].id,
        prompt: 'Write a paragraph describing your favorite book.',
      },
    }),
    prisma.task.create({
      data: {
        configId: configs[1].id,
        prompt: 'Upload a photo of something that inspires you.',
      },
    }),
    prisma.task.create({
      data: {
        configId: configs[2].id,
        prompt: 'Share a link to your favorite creator on social media.',
      },
    }),
  ]);


  // Create TaskSelection for the game
  const taskSelection = await prisma.taskSelection.create({
    data: {
      gameId: game.id,
    },
  });

  await prisma.taskSelection.update({
    where: { id: taskSelection.id },
    data: {
      task: {
        connect: tasks.map(t => ({ id: t.id })),
      },
    },
  });

  // Create TaskResult for the game
  const taskResult = await prisma.taskResult.create({
    data: {
      gameId: game.id,
    },
  });

  // Create TaskSubmissions for each user for task[0]
  await Promise.all(
    userSessions.map(session =>
      prisma.taskSubmission.create({
        data: {
          userSessionId: session.id,
          taskId: tasks[0].id, // all users submit for first task
          taskResultId: taskResult.id,
        },
      })
    )
  );

  console.log('✅ Game, task selection, and submissions seeded.');
  console.table(tasks.map(t => ({ id: t.id, prompt: t.prompt })));
  console.log('Seed complete ✅');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
