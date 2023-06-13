import usePost from "@/hooks/usePost";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormData } from "@/types";

const postSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  body: z.string().nonempty({ message: "Body is required" }),
});

const commentSchema = z.object({
  comment: z.string().nonempty({ message: "Comment is required" }),
});

interface Comment {
  comment: string;
}

const Posts = () => {
  const router = useRouter();
  const { id } = router.query;
  const [edit, setEdit] = useState<boolean>(false);

  const {
    data: post,
    isLoading,
    error,
    deletePost,
    updatePost,
    createComment,
  } = usePost(id as string);

  const handleDelete = () => {
    deletePost();
    router.push("/");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });

  const {
    register: commentRegister,
    handleSubmit: commentSubmit,
    formState: { errors: commentErrors },
    reset
  } = useForm<Comment>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: FormData) => {
    updatePost(data);
    router.push("/");
  };

  const onSubmitComment = (data: any) => {
    createComment({...data, postId: Number(id)});
    reset();
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <Box padding={4}>
      <Typography variant="h4">{post?.title}</Typography>
      <Typography component="body">{post?.body}</Typography>
      {post?.comments.map((item) => (
        <Typography sx={{ boxShadow: 2, my: 2, p: 2 }} key={item.id}>
          {item.cooment}
        </Typography>
      ))}
      <DeleteIcon onClick={handleDelete} sx={{ cursor: "pointer" }} />
      <EditIcon
        onClick={() => {
          setEdit(true);
          setValue("title", post?.title as string);
          setValue("body", post?.body as string);
        }}
      />
      <Stack
        component="form"
        onSubmit={commentSubmit(onSubmitComment)}
        spacing={2}
        padding={2}
      >
        <TextField
          label="タイトル"
          {...commentRegister("comment")}
          error={Boolean(commentErrors.comment)}
          helperText={commentErrors.comment?.message as string}
        />
        <Button type="submit">送信</Button>
      </Stack>
      {edit && (
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          padding={2}
        >
          <TextField
            label="タイトル"
            {...register("title")}
            error={Boolean(errors.title)}
            helperText={errors.title?.message as string}
          />
          <TextField
            label="本文"
            {...register("body")}
            error={Boolean(errors.body)}
            helperText={errors.body?.message as string}
          />
          <Button type="submit">送信</Button>
        </Stack>
      )}
    </Box>
  );
};

export default Posts;
