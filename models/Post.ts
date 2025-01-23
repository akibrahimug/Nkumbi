import mongoose, { Schema, Model, Document } from "mongoose";

interface IPost extends Document {
  author: mongoose.Types.ObjectId; // references User
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  dislikesCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the users collection
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
