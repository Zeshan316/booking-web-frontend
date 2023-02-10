import React from "react";
import "./Loader.css";

const Loader = (): JSX.Element => {
  return (
    <>
      <div className="pencil">
        <div className="pencil__ball-point"></div>
        <div className="pencil__cap"></div>
        <div className="pencil__cap-base"></div>
        <div className="pencil__middle"></div>
        <div className="pencil__eraser"></div>
      </div>
      <div className="line"></div>
      <h2 className="text-center">Page Loading...</h2>
    </>
  );
};

export default Loader;
