// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [data, setData] = useState({});

//   let fetchBlog = async () => {
//     try {
//       let response = await axios.get("/api/blog/singleBlog", {
//         params: {
//           id,
//         },
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchBlog();
//   }, [id]); // Include 'id' in the dependency array

//   return (
//     <div className="my-8 mx-auto max-w-2xl p-4 border border-gray-300 rounded-lg">
//       {Object.keys(data).length > 0 && (
//         <>
//           <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

//           <img
//             src={data.image}
//             alt="Blog Image"
//             className="w-full h-auto mb-8 rounded-lg"
//           />

//           <div
//             className="prose prose-lg max-w-none"
//             dangerouslySetInnerHTML={{ __html: data.content }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default SingleBlog;
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
} from "react-icons/fa";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const SingleBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  let fetchBlog = async () => {
    try {
      let response = await axios.get("/api/blog/singleBlog", {
        params: {
          id,
        },
      });
      setData(response.data);
      setEditedData(response.data); // Initialize editedData with current data
      // Check if user has already liked the blog
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
        // You may also want to send an "unlike" request to your backend here
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    setComments([...comments, newComment]);
    setNewComment("");
    await axios.post(`/api/blog/commentBlog/${id}`, { comment: newComment });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update the blog
      await axios.put(`/api/blog/updateBlog/${id}`, editedData);
      // Fetch the updated blog data
      await fetchBlog();
      setEditable(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditable(false);
    // Reset editedData to the current data
    setEditedData(data);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blog/deleteBlog/${id}`);
      // Redirect to the home page or any other page after deletion
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const shareBlog = () => {
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
      // If the Web Share API is not supported, provide a fallback behavior.
      alert("Web Share API is not supported on your device/browser.");
    }
  };

  return (
    <div className="my-8 mx-auto max-w-2xl p-4 border border-gray-300 rounded-lg">
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

          <img
            src={data.image}
            alt="Blog Image"
            className="w-full h-auto mb-8 rounded-lg"
          />

          <div className="prose prose-lg max-w-none">
            {editable ? (
              <>
                <ReactQuill
                  value={editedData.content || ""}
                  onChange={(value) =>
                    setEditedData({ ...editedData, content: value })
                  }
                  className="quill-editor"
                />
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            )}
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center text-gray-500 ${
                liked ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <FaThumbsUp className="mr-2" />
              Like ({likes})
            </button>
            <button
              onClick={() => document.getElementById("commentInput").focus()}
              className="flex items-center text-gray-500 cursor-pointer"
            >
              <FaComment className="mr-2" />
              Comment
            </button>
            <button
              onClick={shareBlog}
              className="flex items-center text-gray-500 cursor-pointer"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
          <div className="mt-4">
            <input
              id="commentInput"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border border-gray-300 p-2 w-full rounded"
            />
            <button
              onClick={handleComment}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Comment
            </button>
            <ul className="mt-4">
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
