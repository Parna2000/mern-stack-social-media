import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };
  const goToRegister = () => {
    navigateTo("/register");
  };
  return (
    <nav>
      {isAuthenticated ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">My Profile</Link>
          </li>
          <li>
            <Link to="/mypostlist">My Posts</Link>
          </li>
          <li>
            <Link to="/postlist">Posts</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={goToRegister}>Register</button>
          </li>
          <li>
            <button onClick={goToLogin}>Login</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
