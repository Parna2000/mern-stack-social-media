import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Post from "../components/Post";

const createPost = (element) => {
  return (
    <Post
      key={element._id}
      id={element._id}
      firstName={element.firstName}
      lastName={element.lastName}
      content={element.content}
      timestamp={element.timeStamp}
    />
  );
};

const PostList = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/post/getall",
          { withCredentials: true }
        );
        setPostList(data.posts);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPosts();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-space-between py-2">
        <h1>POSTS</h1>
      </div>
      <div className="container">
        {postList && postList.length > 0 ? (
          postList.map(createPost)
        ) : (
          <h2>No Posts Found!</h2>
        )}
      </div>
    </div>
  );
};

export default PostList;
