import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.posts.create({
        data: {
            title: 'Sample Title',
            body: 'Sample body text',
            created_at: new Date(),
        },
    });
    // 他のデータもここで挿入できます。
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
