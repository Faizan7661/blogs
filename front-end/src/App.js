import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginFrom";
import HomePage from "./Pages/HomePage";
import BlogPost from "./Pages/BlogPost";
import SingleBlog from "./Pages/SingleBlog";
import LandingPage from "./Pages/LandingPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/creatingBlog" element={<BlogPost />} />
        <Route path="/singleBlog/:id" element={<SingleBlog />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
