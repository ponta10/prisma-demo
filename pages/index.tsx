import { Inter } from "next/font/google";
import usePosts from "@/hooks/usePosts";
import { Posts } from "@prisma/client";
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: posts, createPost } = usePosts();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    createPost(data);
    reset();
  }
  return (
    <Box padding={4}>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField label="タイトル" {...register('title')} />
        <TextField label="本文" {...register('body')} />
        <Button type="submit">送信</Button>
      </Stack>
      <Grid container spacing={4} padding={4}>
        {posts?.map((item: Posts) => (
          <Grid item xs={4}>
            <Card onClick={() => router.push(`/posts/${item?.id}`)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item?.title}
                </Typography>
                <Typography variant="body2">{item?.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
