import Upload from './Upload'
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

const PostForm = () => {
   return (
      <form className="flex flex-col gap-6 flex-1 mb-6">
         <Upload type="image">
            <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
               Add a cover image
            </button>
         </Upload>
         <input
            className="text-4xl font-semibold bg-transparent outline-none"
            type="text"
            placeholder="My Awesome Story"
            name="title"
         />
         <div className="flex items-center gap-4">
            <label htmlFor="" className="text-sm">
               Choose a category:
            </label>
            <select
               name="category"
               id=""
               className="p-2 rounded-xl bg-white shadow-md"
            >
               <option value="general">General</option>
               <option value="web-design">Web Design</option>
               <option value="development">Development</option>
               <option value="databases">Databases</option>
               <option value="seo">Search Engines</option>
               <option value="marketing">Marketing</option>
            </select>
         </div>
         <textarea
            className="p-4 rounded-xl bg-white shadow-md"
            name="desc"
            placeholder="A Short Description"
         />
         <div className="flex flex-1">
            <div className="flex flex-col gap-2 mr-2">
               <Upload type="image">
                  🌆
               </Upload>
               <Upload type="video">
                  ▶️
               </Upload>
            </div>
            <ReactQuill
               theme="snow"
               className="flex-1 rounded-xl bg-white shadow-md"
            />
         </div>
         <button
            className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
         >
            Send
         </button>
      </form>
   )
}

export default PostForm