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

router.put("/updateBlog/:id", async (req, res) => {
  try {
    const { title, content, image, links } = req.body;
    const { id } = req.params;

    if (!title || !content || !image) {
      return res
        .status(400)
        .json({ message: "Title, content, and image are required" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, image, links },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/likeBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/commentBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const blog = await BlogModel.findById(id);
    blog.comments.push(comment);
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
