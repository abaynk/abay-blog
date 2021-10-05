import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import instagram from "react-useanimations/lib/instagram";
import linkedin from "react-useanimations/lib/linkedin";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import youtube from "react-useanimations/lib/youtube";
import arrowUp from "react-useanimations/lib/arrowUp";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${url}/categories`);
        setCategories(res.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    getCategories();
  }, [url]);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h1>Abay Nurpeissov</h1>
            <div className={styles.links}>
              <UseAnimations animation={instagram} size={30} />
              <UseAnimations animation={facebook} size={30} />
              <UseAnimations animation={linkedin} size={30} />
              <UseAnimations animation={github} size={30} />
              <UseAnimations animation={twitter} size={30} />
              <UseAnimations animation={youtube} size={30} />
            </div>
          </div>
          <div className={styles.bottom}>© 2021 All rights reserved</div>
        </div>
        <div className={styles.right}>
          <ul className={styles.list}>
            <li className={styles.listHeading}>Pages</li>
            <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
              <li>home</li>
            </NavLink>
            <li>about</li>
          </ul>
          <ul className={styles.list}>
            <li className={styles.listHeading}>Feedback</li>
            <li>contact me</li>
            <li>subscribe</li>
          </ul>
          <ul className={styles.list}>
            <li className={styles.listHeading}>Categories</li>
            {categories.map((category, i) => (
              <NavLink
                to={`/categories/${category.slug}`}
                key={category.slug + i}
                onClick={() => window.scrollTo(0, 0)}
              >
                <li key={category.slug} className={classNames(styles.text)}>
                  {category.name}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
      <UseAnimations
        animation={arrowUp}
        size={30}
        className={styles.arrow}
        onClick={() => window.scrollTo(0, 0)}
      />
    </div>
  );
};

export default Footer;
