import { useUser } from '@clerk/clerk-react'
import PostForm from '../components/PostForm';

const Write = () => {
   const { isLoaded, isSignedIn } = useUser();

   if (!isLoaded) {
      return <div>Loading...</div>
   }

   if (isLoaded && !isSignedIn) {
      return <div>Please sign in to create a post.</div>
   }


   return (
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 px-2">
         <h1 className="text-cl font-light">Create a New Post</h1>
         <PostForm />
      </div>
   )
}

export default Write