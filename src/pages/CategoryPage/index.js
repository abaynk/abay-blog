import axios from "axios";
import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/Article";
import styles from "./index.module.scss";

const CategoryPage = (props) => {
  const slug = props.match.params.slug;
  const [content, setContent] = useState();
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`${url}/categories?slug=${slug}`);
        setContent({ ...res.data[0] });
      } catch (error) {
        throw new Error(error);
      }
    };
    getContent();
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!content) return <p className={styles.root}>Loading...</p>;
  return (
    <div className={styles.root}>
      <h1 className={styles.name}>
        {content.name[0].toUpperCase() + content.name.slice(1)}
      </h1>
      <div className={styles.container}>
        {content.articles.map((article, i) => (
          <ArticleCard article={article} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
