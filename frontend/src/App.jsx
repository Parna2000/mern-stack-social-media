import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import PostList from "./pages/PostList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import axios from "axios";
import MyPostList from "./pages/MyPostList";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  console.log(isAuthenticated);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error.response.data.message);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/mypostlist" element={<MyPostList />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};
export default App;
