import Post from '../models/post.model.js';

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
   const newPost = new Post(req.body);
   const post = await newPost.save();
   if (!post) {
      return res.status(400).json({ message: 'Post not created' });
   }

   res.status(201).json(post);
}

export const deletePost = async (req, res) => {
   const post = await Post.findByIdAndDelete(req.params.id);
   if (!post) {
      return res.status(404).json({ message: 'Post not found' });
   }

   res.status(200).json({ message: 'Post deleted' });
}