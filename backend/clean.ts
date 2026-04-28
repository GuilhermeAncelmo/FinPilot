import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function clean() {
  await prisma.transaction.deleteMany({});
  console.log('Database cleared');
}
clean().finally(() => prisma.$disconnect());
