import React, { useState, useEffect } from "react";
import "./Loading.scss";
const Loading = (props) => {
  const [classes, setClasses] = useState("Loading");
  useEffect(() => {
    setClasses("Loading show-loading");
    return () => {
      setClasses("Loading fade-loading");
    };
  }, []);
  return (
    <div className={classes}>
      <span></span>
    </div>
  );
};

export default Loading;
