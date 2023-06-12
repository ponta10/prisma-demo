import { Inter } from "next/font/google";
import usePost from "@/hooks/usePost";
import { Posts } from "@prisma/client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: posts } = usePost();
  return (
    <Grid container spacing={4} padding={4}>
      {posts?.map((item: Posts) => (
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom >{item?.title}</Typography>
              <Typography variant="body2">{item?.body}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
