import { PrismaClient } from '@prisma/client';
import { users } from '../../src/mockData';
const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        score: 1000 - user.points,
      },
    });

    console.log(`User created: ${newUser.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
