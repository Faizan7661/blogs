import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    links: { type: [String] },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
