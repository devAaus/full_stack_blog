import { useState } from "react"
import { IoMenu } from "react-icons/io5";
import { IKImage } from 'imagekitio-react';
import Image from "./Image";

const Navbar = () => {
   const [open, setopen] = useState(false);

   return (
      <div className="w-full h-16 md:h-20 flex items-center justify-between">
         <div className="flex items-center gap-4 text-2xl font-bold">
            <Image
               src="/logo.png"
               alt="logo"
               w={100}
               h={100}
            />
         </div>

         {/* Mobile Menu */}
         <div className="md:hidden">
            <div className="cursor-pointer text-2xl" onClick={() => setopen(!open)}>
               {open ? "X" : <IoMenu />}
            </div>
            <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#e6e6ff] ${open ? "-right-0" : "-right-[100%]"} transition-all duration-300 ease-in-out`}>
               <AllLinks />
            </div>
         </div>

         {/* Desktop Menu */}
         <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <AllLinks />
         </div>
      </div>
   )
}

export default Navbar

const AllLinks = () => {
   return (
      <>
         <a href="/">Home</a>
         <a href="/">Trending</a>
         <a href="/">Most Popular</a>
         <a href="/">About</a>
         <a href="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
         </a>
      </>
   )
}