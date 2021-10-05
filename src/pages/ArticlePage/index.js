import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Markdown from "markdown-to-jsx";
import { Parallax } from "react-parallax";

const ArticlePage = (props) => {
  const id = props.match.params.slug;
  const [article, setArticle] = useState(null);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(`${url}/articles?slug=${id}`);
        setArticle({ ...res.data[0] });
      } catch (error) {
        throw new Error(error);
      }
    };
    getArticle();
  }, [id, url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) return <p className={styles.root}>Loading...</p>;
  return (
    <div className={styles.root}>
      {/* <div
        className={styles.container}
        style={{
          backgroundImage: `url(${url + article.image.url}`,
        }}
      > */}
      <Parallax
        className={styles.container}
        bgImage={url + article.image.url}
        strength={500}
      >
        <h1>{article.title}</h1>
      </Parallax>
      {/* </div> */}
      <div className={styles.content}>
        <Markdown>{article.content}</Markdown>
      </div>
    </div>
  );
};

export default ArticlePage;
