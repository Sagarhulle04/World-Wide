import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type, htmlType }) => {
  return (
    <button
      type={htmlType || "button"}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
