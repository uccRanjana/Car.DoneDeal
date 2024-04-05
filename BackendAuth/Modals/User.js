import mongoose from "mongoose";

//users schema
const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    city: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    roles: {
      type: [mongoose.Schema.ObjectId],
      required: true,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("users", userSchema);
