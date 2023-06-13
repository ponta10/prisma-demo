import { Comments, Posts } from "@prisma/client";

export interface FormData {
  title: string;
  body: string;
}

export interface PostWithComments extends Posts {
  commentsCount: number;
  comments: Comments[];
}

export interface LoginFormData {
  name?: string;
  email: string;
  password: string;
}
