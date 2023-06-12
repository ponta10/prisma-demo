import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          comments: true, // Include the comments related to this post
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: "Unable to retrieve post" });
    }
  } else if (req.method === "PUT") {
    const { title, body } = req.body;

    try {
      const updatedPost = await prisma.posts.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          body,
        },
      });

      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({ error: "Unable to update post" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.posts.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Unable to delete post" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
