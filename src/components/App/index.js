import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticlePage from "../../pages/ArticlePage";
import CategoryPage from "../../pages/CategoryPage";
import Home from "../../pages/Home";
import Nav from "../Nav";
import "../../index.scss";
import Footer from "../footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app_root">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route path="/categories/:slug" component={CategoryPage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
