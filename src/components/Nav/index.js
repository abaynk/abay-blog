import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { Link, NavLink } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import AnimateHeight from "react-animate-height";
import { ReactComponent as Logo } from "../../assets/icons/BLog.svg";
import classNames from "classnames";

const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:1337/categories" ||
          `${url}/categories`
        );
        setCategories(res.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    getCategories();
    setActive(window.location.pathname.split("/")[2]);
  }, [active]);

  return (
    <div className={styles.root}>
      <nav className={styles.container}>
        <div className={styles.container__left}>
          <Link to="/">
            <Logo className={styles.logo} onClick={() => setActive(null)} />
          </Link>
        </div>
        <div className={styles.container__right}>
          <Hamburger toggled={dropDown} toggle={setDropDown} size={20} />

          <div className={styles.categories}>
            {categories.map((category, i) => (
              <NavLink
                to={`/categories/${category.slug}`}
                key={category.slug + i}
              >
                <p
                  key={category.slug + i}
                  className={classNames(
                    styles.text,
                    active === category.slug && styles.active
                  )}
                  onClick={() => setActive(i)}
                >
                  {category.name}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <AnimateHeight
        duration={500}
        height={dropDown ? "auto" : "0"}
        className={styles.dropDown}
      >
        {categories.map((category, i) => (
          <NavLink to={`/categories/${category.slug}`} key={category.slug + i}>
            <p
              key={category.slug}
              className={classNames(
                styles.text,
                active === category.slug && styles.active
              )}
              onClick={() => {
                setActive(i);
                setDropDown(false);
              }}
            >
              {category.name}
            </p>
          </NavLink>
        ))}
      </AnimateHeight>
    </div>
  );
};

export default Nav;
