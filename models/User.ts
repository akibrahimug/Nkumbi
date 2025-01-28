import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Make email case-insensitive
      trim: true,
    },
    password: { type: String, required: true }, // Make password required
    avatar: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

// Hash the password before saving if it's modified or new
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (!this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Avoid model overwrite errors in development
const User = models.User || model("User", UserSchema);
export default User;
