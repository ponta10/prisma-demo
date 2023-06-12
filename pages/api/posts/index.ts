import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// POST /api/posts
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const post = await prisma.posts.create({
      data: {
        title,
        body,
        created_at: new Date(),
      },
    });

    return res.status(201).json(post);
  }

  if (req.method === "GET") {
    try {
      const posts = await prisma.posts.findMany({
        include: {
          comments: true,
        },
      });

      // Map through the posts to append the comment count
      const postsWithCommentCount = posts.map((post) => ({
        ...post,
        commentsCount: post.comments.length,
      }));

      return res.status(200).json(postsWithCommentCount);
    } catch (error) {
      return res.status(500).json({ error: "Unable to retrieve posts" });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
