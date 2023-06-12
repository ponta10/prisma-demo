import { Inter } from "next/font/google";
import usePost from "@/hooks/usePost";
import { Posts } from "@prisma/client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: posts } = usePost();
  return (
    <Grid container spacing={4}>
      {posts?.map((item: Posts) => (
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>{item?.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
