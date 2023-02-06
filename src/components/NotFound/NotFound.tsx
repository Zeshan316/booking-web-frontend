import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="container_">
      <span className="heading"> Page Not Found</span>
      <span className="text">4</span>
      <i className=" text far fa-question-circle fa-spin"></i>
      <h1 className=" text mt-5 ">4</h1>
      <p className="fs-5">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
