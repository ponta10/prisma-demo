import useSWR, { mutate as globalMutate } from 'swr'

import fetcher from '@/lib/fetcher';
import { Posts } from '@prisma/client';
import axios from 'axios';

interface PostProps {
    data: Posts[] | undefined;
    error: any;
    isLoading: boolean;
    mutate: () => void;
    createPost: (newPost: any) => Promise<void>;
}

const usePosts = (): PostProps => {
  const { data, error, isLoading, mutate } = useSWR(`/api/posts`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const createPost = async (newPost?: any) => {
    try {
      await axios.post('/api/posts', newPost);
      globalMutate('/api/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    createPost,
  }
};

export default usePosts;