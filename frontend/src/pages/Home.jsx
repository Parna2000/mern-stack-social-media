import React from "react";

const Home = () => {
  return (
    <>
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">
          MERN Social Media
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            This is a dashboard application built using the MERN stack (MongoDB,
            Express, React, Node.js). It includes user authentication and
            profile management, allowing users to sign up, log in, and manage
            their profiles. Users can participate in a community forum by
            creating posts and commenting on others' posts. A score tracker
            system rewards users with points for their activities, displayed on
            their profiles. Users can share their achievements on social media
            through integrated sharing buttons. The application features a
            responsive UI, ensuring accessibility and usability across various
            devices.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src="website-screenshot.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
