import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainArticle.module.scss";
import { Parallax } from "react-parallax";

const MainArticle = ({ article }) => {
  const url = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className={styles.root}>
      <Parallax
        bgImage={url + article.image.url}
        strength={500}
        className={styles.container}
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <Link to={`/articles/${article.slug}`} className={styles.root}>
          <button>Read more</button>
        </Link>
      </Parallax>
    </div>
  );
};

export default MainArticle;
