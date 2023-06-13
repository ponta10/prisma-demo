import useSWR, { mutate as globalMutate } from "swr";
import axios from "axios";
import { Posts } from "@prisma/client";
import { FormData } from "@/types";
import fetcher from "@/lib/fetcher";

interface PostProps {
  data: Posts | undefined;
  isLoading: boolean;
  error: any;
  mutate: () => void;
  deletePost: () => Promise<void>;
  updatePost: (updatePost: FormData) => Promise<void>;
}

const usePost = (id?: string): PostProps => {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/posts/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const performMutation = async (
    method: "delete" | "put",
    data?: FormData,
    errorMessage = "Error performing operation on post:"
  ) => {
    try {
      await axios({
        method,
        url: `/api/posts/${id}`,
        data,
      });
      globalMutate("/api/posts");
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  const deletePost = () => performMutation("delete");
  const updatePost = (updatePost: FormData) =>
    performMutation("put", updatePost);

  return {
    data,
    isLoading,
    error,
    mutate,
    deletePost,
    updatePost,
  };
};

export default usePost;
