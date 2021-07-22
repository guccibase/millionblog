import React from "react";
import "./Articles_screen.css";
import NewArticleBtn from "../homepage_components/New_article_btn";
import Articles from "../homepage_components/Articles";
import MostLikedArticles from "../homepage_components/Most_liked_articles";
import Tracker from "../homepage_components/Tracker";
import AppHeader from "../homepage_components/App_header";
import Headline from "../homepage_components/Headline";
import LatestArticle from "../homepage_components/latest_article";
import TopArticles from "../homepage_components/Top-articles";

function ArticlesScreen() {
  return (
    <div>
      <AppHeader />
      <Headline />
      <div>
        <Tracker />
      </div>
      <div>
        <NewArticleBtn />
      </div>
      <div>
        <TopArticles />
      </div>
      {/* <hr></hr> */}
      <div>
        <Articles allArticles={true} />
      </div>
    </div>
  );
}

export default ArticlesScreen;
