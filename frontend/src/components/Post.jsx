import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Comments from "./Comment";

const createComment = (element) => {
  return (
    <Comments
      key={element._id}
      firstName={element.firstName}
      lastName={element.lastName}
      content={element.content}
      timestamp={element.timeStamp}
    />
  );
};

const Post = (element) => {
  const { isAuthenticated, user } = useContext(Context);
  const [comments, setComments] = useState([]);
  const [target, setTarget] = useState("#" + element.id);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/comment/getbyid/${element.id}`,
          { withCredentials: true }
        );
        setComments(data.comments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchComments();
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/comment/send",
          { content, postId: element.id },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(async (res) => {
          toast.success(res.data.message);
          setContent("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container pb-4">
      <div className="card">
        <h5 className="card-header">
          Posted by {element.firstName} {element.lastName} on{" "}
          {element.timestamp}
        </h5>
        <div className="card-body">
          <p className="card-text">{element.content}</p>
        </div>
      </div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Type your comment"
          aria-label="Search"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Post
        </button>
      </form>
      <button
        className="btn btn-secondary container-fluid"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={target}
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Comments
      </button>
      <div className="collapse" id={element.id}>
        {comments && comments.length > 0 ? (
          comments.map(createComment)
        ) : (
          <h6>No Comments Found!</h6>
        )}
      </div>
    </div>
  );
};

export default Post;
