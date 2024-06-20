import React from "react";

const Comments = (element) => {
  return (
    <div className="card">
      <div className="card-header">
        Commented by {element.firstName} {element.lastName} on {element.timestamp}
      </div>
      <div className="card-body">
        <p className="card-text">{element.content}</p>
      </div>
    </div>
  );
};

export default Comments;
