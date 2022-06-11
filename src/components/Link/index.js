import * as React from "react";
import "./Link.scss";
const Link = ({ children, ...props }) => {
  return <a {...props}>{children}</a>;
};
export default Link;
