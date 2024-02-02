import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginFrom";
import HomePage from "./Pages/HomePage";
import BlogPost from "./Pages/BlogPost";
import SingleBlog from "./Pages/SingleBlog"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path ="/creatingBlog" element ={<BlogPost/>}/>
        <Route path="/singleBlog/:id" element={<SingleBlog />} />


      </Routes>
    </>
  );
}

export default App;
