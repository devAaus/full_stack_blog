import React from 'react'
import PostCard from './PostCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './Loader'

const fetchPosts = async (pageParam) => {
   const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 2 },
   })
   return response.data;
}

const PostList = () => {
   const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
   } = useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
         lastPage.hasMore ? pages.length + 1 : undefined,
   })

   // if (isFetching) return "Loading...";

   if (error) return "Something went wrong!";

   const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

   return (
      <InfiniteScroll
         dataLength={allPosts.length}
         next={fetchNextPage}
         hasMore={!!hasNextPage}
         loader={
            <div className="flex flex-col items-center justify-center w-full">
               <Loader />
            </div>
         }
         endMessage={
            <p className='font-semibold text-center'>
               All posts loaded!
            </p>
         }
      >
         {allPosts.map((post) => (
            <PostCard key={post._id} post={post} />
         ))}
      </InfiniteScroll>
   )
}

export default PostList