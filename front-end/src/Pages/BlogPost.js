import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [links, setLinks] = useState([]);

  const uploadFile = async (type, data) => {
    try {
      let cloudName = 'drgqcwxq6';
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      if (resourceType === 'image') {
        setImageUrl(secure_url);
      }

      return secure_url;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for better handling in the component
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const newData = new FormData();
      newData.append("file", e.target.files[0]);
      newData.append('upload_preset', 'images_preset');

      setImage(e.target.files[0]);

      const imageUrl = await uploadFile('image', newData);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.error(error);
      // Handle the error (show message, etc.)
    }
  };

  useEffect(() => {
    setImageUrl(null);
  }, []);

  const handleCreateBlog = async () => {
    try {
      if (!imageUrl) {
        alert("Please upload an image");
        return;
      }

      const formData = {
        title,
        content,
        image: imageUrl,
        links: links.map(link => link.trim()), // Trim spaces from links
      };

      await axios.post("/api/blog/create-blog", formData);

      alert("Blog created successfully");
      setTitle("");
      setContent("");
      setImage(null);
      setLinks([]);
    } catch (error) {
      console.error(error);
      alert("Error creating blog");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md mx-4 sm:mx-auto sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center justify-center mb-6">
          Create a Blog
        </h1>
        <label
          htmlFor="upload"
          className="flex items-center justify-center w-full bg-purple-700 text-white py-2 rounded cursor-pointer"
        >
          Upload Image
        </label>
        <br />
        <input
          type="file"
          id="upload"
          className="hidden"
          onChange={handleImageUpload}
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="w-full h-auto my-4"
          />
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          className="mb-4"
        />

        <input
          type="text"
          placeholder="Links (comma-separated)"
          value={links}
          onChange={(e) => setLinks(e.target.value.split(","))}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={handleCreateBlog}
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-red-700"
        >
          Create Blog
        </button>
      </div>
    </div>
  );
}

export default BlogPost;
