import mongoose from "mongoose";

//role schema
const roleSchema = mongoose.Schema(
    {
      role: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  export default mongoose.model("Role", roleSchema);
  