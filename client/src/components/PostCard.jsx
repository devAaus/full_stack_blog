import React from 'react'
import { Link } from 'react-router'
import Image from './Image'
import { FaLongArrowAltRight } from "react-icons/fa";

const PostCard = () => {
   return (
      <div className="flex flex-col xl:flex-row gap-8 mb-12 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl p-4">
         <div className="md:hidden xl:block xl:w-1/3">
            <Image
               src="/featured1.png"
               className="rounded-2xl object-cover"
               w="735"
            />
         </div>
         <div className="flex flex-col gap-4 xl:w-2/3">
            <Link to="/" className="text-4xl font-semibold">
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi rerum accusantium.
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-secondary text-sm">
               <span>Written by</span>
               <Link className="text-primary" to="/">
                  John Doe
               </Link>
               <span>on</span>
               <Link className="text-primary">
                  Web Design
               </Link>
               <span>2 days ago</span>
            </div>
            <p className='text-secondary'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eum quis ducimus illo qui iste, ipsum veritatis odit ullam distinctio.</p>
            <Link to="/" className="underline text-blue-800 text-sm inline-flex items-center group">
               Read More
               <FaLongArrowAltRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
         </div>
      </div>
   )
}

export default PostCard