import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; CopyRight {new Date().getFullYear()} by WorldWide Inc
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
