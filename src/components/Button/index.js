import * as React from "react";
const Button = ({
  children,
  type = "button",
  color = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button type={type} className={`btn btn-${size} btn-${color}`} {...props}>
      {children}
    </button>
  );
};

function ButtonUnobtrusive({ children, type = "button", ...props }) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
export {ButtonUnobtrusive}
export default Button;
