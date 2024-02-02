import React, { useEffect, useState } from "react";

function BlogCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog/allBlogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="relative flex flex-col sm:flex-row xl:flex-col items-start border border-gray-300 p-4 rounded-lg h-full"
          >
            <div className="order-1 sm:ml-6 xl:ml-0 flex-grow">
              <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                <span className="mb-1 block text-sm leading-6 text-indigo-500">
                  {blog.title}
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 160),
                  }}
                ></div>
              </h3>
              <a
                href={`/singleBlog/${blog._id}`}
                className="text-indigo-600 hover:underline mt-2 inline-block"
              >
                Read More
              </a>
            </div>
            <img
              src={blog.image}
              alt=""
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full h-80 object-cover"
              width={1216}
              height={640}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default BlogCard;
