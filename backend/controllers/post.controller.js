import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// get user by clerk user id
const getUser = async (req) => {
   const clerkUserId = req.auth.userId;

   if (!clerkUserId) {
      return res.status(401).json({ message: 'Not authenticated' });
   }

   const user = await User.findOne({ clerkUserId })

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

   return user;
}

// get all posts
export const getPosts = async (req, res) => {
   const posts = await Post.find()
   res.status(200).json(posts);
}

// get a post
export const getPostbySlug = async (req, res) => {
   const post = await Post.findOne({ slug: req.params.slug })
   if (!post) {
      return res.status(404).json({ message: 'Post not found' });
   }

   res.status(200).json(post);
}

// create post
export const createPost = async (req, res) => {
   const user = await getUser(req);

   let slug = req.body.title.trim().replace(/\s+/g, '-').toLowerCase();
   let existingPost = await Post.findOne({ slug });

   if (existingPost) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;

      // Keep incrementing counter until a unique slug is found
      while (await Post.findOne({ slug: newSlug })) {
         counter++;
         newSlug = `${slug}-${counter}`;
      }
      slug = newSlug;
   }


   const post = await new Post({
      user: user._id,
      slug,
      ...req.body,
   }).save();
   res.status(201).json(post);
}

// delete post
export const deletePost = async (req, res) => {
   const user = await getUser(req);

   const post = await Post.findByIdAndDelete({
      _id: req.params.id,
      user: user._id
   });

   if (!post) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
   }

   res.status(200).json({ message: 'Post deleted' });
}


const imagekit = new ImageKit({
   urlEndpoint: process.env.IK_URL_ENDPOINT,
   publicKey: process.env.IK_PUBLIC_KEY,
   privateKey: process.env.IK_PRIVATE_KEY
});

// upload auth
export const uploadAuth = async (req, res) => {
   const result = imagekit.getAuthenticationParameters();
   res.send(result);
}