import useSWR from 'swr'

import fetcher from '@/lib/fetcher';
import { Posts } from '@prisma/client';

interface PostProps {
    data: Posts | undefined;
    error: any;
    isLoading: boolean;
    mutate: () => void;
}

const usePost = (id?: string): PostProps => {
  const { data, error, isLoading, mutate } = useSWR(`/api/posts/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default usePost;