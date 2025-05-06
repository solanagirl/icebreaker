import type { PrismaClient } from '@/generated/prisma'; // Note: path adjusted relative to root

declare global {
  var prisma: PrismaClient | undefined;
} 