import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const { comment, postId } = req.body;

  if (!comment || !postId) {
    return res.status(400).json({ error: "comment and postId are required" });
  }

  try {
    const newComment = await prisma.comments.create({
      data: {
        cooment: comment,
        postId: postId,
      },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error });
  }
}
