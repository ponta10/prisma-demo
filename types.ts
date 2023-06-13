import { Posts } from "@prisma/client";

export interface FormData {
  title: string;
  body: string;
}

export interface PostWithComments extends Posts {
  commentsCount: number;
}