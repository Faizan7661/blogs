import React from "react";

function Header() {
  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 w-full">
        <div className="flex flex-wrap items-center justify-between px-4 mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bloggers.com
            </span>
          </a>
          <div className="hidden sm:inline-block mx-auto w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white w-full"
            />
          </div>
          <div className="flex items-center lg:order-2">
            <a
              href="/login"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 ml-4 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Login
            </a>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="true"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... */}
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... */}
              </svg>
            </button>
          </div>
          <div className="ml-auto">
            {/* Existing menu items */}
            <div
              className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ml-[-8px]">
                <li>
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    All blogs
                  </a>
                </li>
                <li>
                  <a
                    href="/creatingBlog"
                    className="block py-2 pl-3 pr-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
