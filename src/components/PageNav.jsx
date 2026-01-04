import React from "react";
import styles from "./PageNav.module.css";
import { Link, NavLink } from "react-router-dom";
import Homepage from "../Pages/HomePage";
import Pricing from "../Pages/Pricing";
import Product from "../Pages/Product";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
