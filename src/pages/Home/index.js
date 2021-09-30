import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import ArticleCard from "../../components/Article";
import MainArticle from "../../components/Article/MainArticle";
import { init } from "ityped";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(`${url}/articles`);
        return setArticles(
          res.data.sort(
            (a, b) => new Date(a.published_at) - new Date(b.published_at)
          )
        );
      } catch (error) {
        throw new Error(error);
      }
    };
    getArticles();
    const myEl = document.querySelector("#myElement");
    init(myEl, {
      showCursor: true,
      strings: ["my life", "tech", "travel", "sports", "food"],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 500,
      startDelay: 200,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!articles) return <p>Loading...</p>;
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        {articles.slice(0, 1).map((a, i) => (
          <MainArticle article={a} key={i} />
        ))}
        <h1>
          Read articles about <span id="myElement"></span>
        </h1>
      </div>
      <div className={styles.articlesContainer}>
        {articles.slice(1).map((article, i) => (
          <ArticleCard article={article} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
