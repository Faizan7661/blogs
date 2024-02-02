import React from "react";
import { useState } from "react";
import axios from 'axios'
import Toast from './Toast.js'

function LoginForm() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
   };

  const showToast = (message, duration = 2000) => {
    setToast({ message });
    return new Promise((resolve) => {
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 2000);
    });
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`${name} : ${value}`)
    setLoginData({ ...loginData, [name]: value });
  };

  const postData = async () => {
    try {
      const { email , password} = loginData;
      
      const response = await axios.post(`/api/admin/signIn`, loginData);

      console.log(response.data.token);
      let token = response.data.token;
      localStorage.setItem("token", token);

      if (response.status === 200) {
        await showToast("Admin Logged in Successfully!")
        
      } else {
        await showToast("something is not right")
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        await showToast("Invalid details");
      } else {
        await showToast("Something went wrong!");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData()
  };
  return (
    <>
      <div className="bg-white-100 h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-semibold text-[royalblue] mb-6">
           Admin Login
          </h1>
          <form onSubmit={handleSubmit}>
        
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 text-left inline-block w-full"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full mt-1 p-3 rounded-md border border-gray-300"
              autoComplete="off"
              required
              value={loginData.email}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 text-left inline-block w-full"
            >
              Password
            </label>
            <input
               type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              className="w-full mt-1 p-3 rounded-md border border-gray-300 pr-12"
              autoComplete="off"
              required
              value={loginData.password}
              onChange={handleInput}
            />
            <input 
                type="checkbox" 
                onClick={togglePasswordVisibility} 
                className="absolute top-12 right-4 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-base p-3 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
          <p className="text-sm text-gray-600 mt-4">
            Does not have an account?{" "}
            <a href="/signUp" className="text-blue-500 hover:underline">
              SignUp/Register
            </a>
          </p>
        </div>
        {toast && <Toast message={toast.message} onClose={toast.onClose} />}
      </div>
    </>
  );
}

export default LoginForm;
