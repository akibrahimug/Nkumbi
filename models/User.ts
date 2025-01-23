import mongoose, { Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  displayName: String,
  avatarUrl: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

// If already compiled, use that model. Otherwise, create a new one.
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
