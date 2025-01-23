import mongoose, { Schema, Model, Document } from "mongoose";

interface IComment extends Document {
  post: mongoose.Types.ObjectId; // references Post
  author: mongoose.Types.ObjectId; // references User
  content: string;
  likesCount: number;
  dislikesCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },

  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
