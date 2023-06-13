import { Inter } from "next/font/google";
import usePosts from "@/hooks/usePosts";
import { Posts } from "@prisma/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormData } from "@/types";
import CommentIcon from '@mui/icons-material/Comment';

const inter = Inter({ subsets: ["latin"] });

const postSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  body: z.string().nonempty({ message: "Body is required" }),
});

export default function Home() {
  const { data: posts, createPost } = usePosts();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });
  const onSubmit = (data: FormData) => {
    createPost(data);
    reset();
  };

  return (
    <Box padding={4}>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
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
      <Grid container spacing={4} padding={4}>
        {posts?.map((item) => (
          <Grid item xs={4} key={item?.id}>
            <Card onClick={() => router.push(`/posts/${item?.id}`)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item?.title}
                </Typography>
                <Typography variant="body2" gutterBottom>{item?.body}</Typography>
                <CommentIcon />
                <Typography component="span">{item?.commentsCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
