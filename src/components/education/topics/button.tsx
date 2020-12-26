import * as React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/* eslint-disable react/jsx-props-no-spreading, react/button-has-type */
const Button: React.FC<Props> = ({ children, type = "button", ...props }) => (
  <button
    {...props}
    type={type}
    css={{
      background: "none",
      border: 0,
      color: "#000",
      cursor: "pointer",
      padding: 0,
    }}
  >
    <span css={{ textDecoration: "underline" }}>{children}</span>
  </button>
);
export default Button;
