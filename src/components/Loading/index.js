import React, { useState, useEffect } from "react";
import "./Loading.scss";
const Loading = (props) => {
  const [classes, setClasses] = useState("Loading");
  useEffect(() => {
    setClasses("Loading show");
    return () => {
      setClasses("Loading fade");
    };
  }, []);
  return (
    <div className={classes}>
      <span></span>
    </div>
  );
};

export default Loading;
