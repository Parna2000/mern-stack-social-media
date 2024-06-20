import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

const User = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [content, setContent] = useState("");
  const [score, setScore] = useState(user.score);
  const [title,setTile] = useState("My current score is: "+user.score);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/post/send",
          { content },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(async (res) => {
          toast.success(res.data.message +" Refresh page to see change in score.");
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
    <div className="px-4 py-5 my-5 text-center">
      <img
        className="d-block mx-auto mb-4"
        src={user.userAvatar.url}
        alt=""
        width="220"
        height="220"
        style={{ borderRadius: "50%" }}
      />
      <h1 className="display-5 fw-bold text-body-emphasis">
        {user.firstName} {user.lastName}
      </h1>
      <div className="col-lg-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <p>
              <b>Email Id:</b> {user.email}
            </p>
            <p>
              <b>Mobile No.:</b> {user.phone}
            </p>
            <p>
              <b>Date of Birth:</b> {user.dob}
            </p>
            <p>
              <b>Gender:</b> {user.gender}
            </p>
            <p>
              <b>Score:</b> {score}
            </p>
            <p><b>Share your score</b></p>
            <div style={{display:"flex", justifyContent:"center", gap: 4}}>
                <FacebookShareButton url="https://www.facebook.com/" quote={title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url="https://twitter.com/?lang=en" title={title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url="https://in.linkedin.com/" title={title}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p>
              <b>Create a new Post:</b>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="post"
                  rows="3"
                  placeholder="Type here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
