import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_JWT_SECRET });

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
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
        userId: Number(token.sub)
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
