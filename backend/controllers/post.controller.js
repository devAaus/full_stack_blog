import Post from '../models/post.model.js';
import User from '../models/user.model.js';

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
   console.log(req);

   const clerkUserId = req.auth.userId;

   if (!clerkUserId) {
      return res.status(401).json({ message: 'Not authenticated' });
   }

   const user = await User.findOne({ clerkUserId })

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

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

   const clertUserId = req.auth.userId;

   if (!clertUserId) {
      return res.status(401).json({ message: 'Not authenticated' });
   }

   const user = await User.findOne({ clertUserId })

   const post = await Post.findByIdAndDelete({
      _id: req.params.id,
      user: user._id
   });

   if (!post) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
   }

   res.status(200).json({ message: 'Post deleted' });
}