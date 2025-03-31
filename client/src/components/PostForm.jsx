import Upload from './Upload'
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { MdImage, MdVideoCameraBack } from "react-icons/md";

const PostForm = () => {
   const [value, setValue] = useState('')
   const [cover, setCover] = useState("");
   const [img, setImg] = useState("");
   const [video, setVideo] = useState("");
   const [progress, setProgress] = useState(0);
   const { getToken } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
   }, [img]);

   useEffect(() => {
      video &&
         setValue(
            (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
         );
   }, [video]);

   const mutation = useMutation({
      mutationFn: async (newPost) => {
         const token = await getToken();
         return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
      },
      onSuccess: (res) => {
         toast.success("Post created successfully!")
         navigate(`/post/${res.data.slug}`)
      },
      onError: (err) => {
         toast.error(err.message)
      },
   })

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {
         img: cover.filePath || " ",
         title: formData.get('title'),
         desc: formData.get('desc'),
         category: formData.get('category'),
         content: value,
      }

      console.log(data);

      mutation.mutate(data);
   }

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
         <Upload type="image" setProgress={setProgress} setData={setCover}>
            <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white" type='button'>
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
         <div className="flex flex-1 ">
            <div className="flex flex-col gap-2 mr-2">
               <Upload type="image" setProgress={setProgress} setData={setImg}>
                  <MdImage className="size-6" />
               </Upload>
               <Upload type="video" setProgress={setProgress} setData={setVideo}>
                  <MdVideoCameraBack className="size-6" />
               </Upload>
            </div>
            <ReactQuill
               theme="snow"
               className="flex-1 rounded-xl bg-white shadow-md"
               value={value}
               onChange={setValue}
               readOnly={0 < progress && progress < 100}
            />
         </div>
         <button
            disabled={mutation.isPending || (0 < progress && progress < 100)}
            className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
         >
            {mutation.isPending ? "Loading..." : "Send"}
         </button>
         {"Progress:" + progress}
         {/* {mutation.isError && <span>{mutation.error.message}</span>} */}
      </form>
   )
}

export default PostForm