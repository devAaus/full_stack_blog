import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      required: true,
      unique: true,
   },
   desc: {
      type: String,
   },
   category: {
      type: String,
      default: 'general'
   },
   content: {
      type: String,
      required: true,
   },
   img: {
      type: String,
   },
   isFeatured: {
      type: Boolean,
      default: false,
   },
   views: {
      type: Number,
      default: 0,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);