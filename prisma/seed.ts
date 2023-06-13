import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('ponta1009', 10);
    await prisma.user.create({
        data: {
            name: 'ponta',
            email: 'ponta@gmail.com',
            password: hashedPassword,
        },
    });
    await prisma.posts.create({
        data: {
            title: 'Sample Title',
            body: 'Sample body text',
            created_at: new Date(),
            user: {
                connect: { id: 1 }, // 既存のユーザーに関連付ける場合
            },
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
