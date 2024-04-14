import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPencilAlt,
  FaTrash,
  FaSave,
  FaTimes,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaArrowLeft,
} from "react-icons/fa";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get("/api/blog/singleBlog", {
        params: { id },
      });
      const { data: responseData } = response;
      setData(responseData);
      setEditedData(responseData); // Initialize editedData with current data
      setLikes(responseData.likes || 0);
      setComments(responseData.comments || []);
      setAuthorName(responseData.userName || "John Bradman");
      const userLiked = localStorage.getItem(`liked-${id}`);
      setLiked(userLiked === "true");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        setLikes(likes + 1);
        setLiked(true);
        localStorage.setItem(`liked-${id}`, "true");
        await axios.post(`/api/blog/likeBlog/${id}`);
      } else {
        setLikes(likes - 1);
        setLiked(false);
        localStorage.removeItem(`liked-${id}`);
        await axios.post(`/api/blog/removelikeBlog/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      await axios.post(`/api/blog/commentBlog/${id}`, { comment: newComment });
      setNewComment("");
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/blog/updateBlog/${id}`, editedData);
      await fetchBlog();
      setEditable(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditable(false);
    setEditedData(data);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blog/deleteBlog/${id}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const blogUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog!",
          text: "Interesting content here",
          url: blogUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported on your device/browser.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <button
        className="absolute top-3 left-3 p-3 rounded-full bg-gray-200 hover:bg-gray-300 z-50"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>

      {Object.keys(data).length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <div className="flex space-x-4">
              {editable ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  <FaPencilAlt />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <p className="text-xl mb-2">By {authorName}</p>
          <img
            src={data.image}
            alt="Blog Image"
            className="w-full h-auto mb-8 rounded-lg"
          />
          <div className="flex items-center space-x-4 pb-2 pl-1">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-500 hover:text-gray-800"
            >
              <FaThumbsUp className="mr-1" />
              Like ({likes})
            </button>
            <button
              onClick={handleShare}
              className="flex items-center text-gray-500 hover:text-gray-800"
            >
              <FaShare className="mr-1" />
              Share
            </button>
          </div>

          <div className="prose prose-lg max-w-none">
            {editable ? (
              <ReactQuill
                value={editedData.content || ""}
                onChange={(value) =>
                  setEditedData({ ...editedData, content: value })
                }
                className="quill-editor"
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            )}
          </div>

          <hr className="my-4" />

          <div className="mt-4 flex items-center">
            <input
              id="commentInput"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border border-gray-300 p-2 w-full rounded"
            />
            <button
              onClick={handleComment}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Comment
            </button>
          </div>

          <ul className="mt-4">
            {comments.map((comment, index) => (
              <div key={index}>
                <hr className="my-4" />
                <li className="mb-2">{comment}</li>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
