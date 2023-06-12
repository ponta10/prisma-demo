import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";

const Posts = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, isLoading, error } = usePost(id as string);

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <div>{post?.body}</div>
  );
};

export default Posts;