import { MdDeleteOutline, MdBookmarkBorder } from "react-icons/md";

const PostMenuActions = () => {
   return (
      <div>
         <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
         <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
            <MdBookmarkBorder className="size-6" />
            <span>Save this post</span>
         </div>
         <div className="flex items-center gap-2 py-2 text-sm cursor-pointer text-destructive">
            <MdDeleteOutline className="size-6" />
            <span>Delete this post</span>
         </div>
      </div>
   )
}

export default PostMenuActions