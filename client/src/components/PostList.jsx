import React from 'react'
import PostCard from './PostCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPosts = async () => {
   const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
   return response.data;
}

const PostList = () => {
   const { isPending, error, data } = useQuery({
      queryKey: ['posts'],
      queryFn: () => fetchPosts()
   })

   if (isPending) return 'Loading...'

   if (error) return 'An error has occurred: ' + error.message

   return (
      <div className='flex flex-col gap-12 mb-8'>
         <PostCard />
         <PostCard />
         <PostCard />
         <PostCard />
         <PostCard />
      </div>
   )
}

export default PostList