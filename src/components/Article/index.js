import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import Moment from "react-moment";

const ArticleCard = ({ article }) => {
  const url = process.env.REACT_APP_BACKEND_URL;
  return (
    <Link to={`/articles/${article.slug}`} className={styles.root}>
      <div className={styles.container}>
        <div className={styles.container_image}>
          <img src={url + article.image.url} alt={article.title} />
        </div>
        <div className={styles.container_text}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.description}>{article.description}</p>
          <p className={styles.category}>{article.category.name}</p>
          <p className={styles.date}>
            <Moment format="MMM Do YYYY">{article.published_at}</Moment>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
