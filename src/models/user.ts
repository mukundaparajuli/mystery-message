import mongoose, { Schema, mongo } from "mongoose";



export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: [string];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is a necessary field!"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Please provide an expiry date for the verifycode"],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    required: true,
    // default: true,
  }
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default userModel;
