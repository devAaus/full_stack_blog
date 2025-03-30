import React from 'react'
import PostCard from './PostCard'

const PostList = () => {
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