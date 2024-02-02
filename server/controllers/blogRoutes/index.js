import express from "express";
import BlogModel from "../../models/BlogsModel.js";

const router = express.Router();

router.post("/create-blog", async (req, res) => {
  try {
    const { title, content, image, links } = req.body;

    if (!title || !content || !image) {
      return res
        .status(400)
        .json({ message: "Title, content, and image are required" });
    }

    const newBlog = new BlogModel({ title, content, image, links });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/singleBlog", async (req, res) => {
  try {
    let { id } = req.query;
    let find = await BlogModel.findOne({ _id: id });
    console.log(find);
    res.send(find);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
