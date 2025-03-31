import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const getPosts = async (req, res) => {
   const posts = await Post.find()
   res.status(200).json(posts);
}

export const getPostbySlug = async (req, res) => {
   const post = await Post.findOne({ slug: req.params.slug })
   if (!post) {
      return res.status(404).json({ message: 'Post not found' });
   }

   res.status(200).json(post);
}

export const createPost = async (req, res) => {
   const clertUserId = req.auth.userId;

   if (!clertUserId) {
      return res.status(401).json({ message: 'Not authenticated' });
   }

   const user = await User.findOne({ clertUserId })

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

   const newPost = new Post({
      user: user._id,
      ...req.body
   });

   const post = await newPost.save();
   if (!post) {
      return res.status(400).json({ message: 'Post not created' });
   }

   res.status(201).json(post);
}

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