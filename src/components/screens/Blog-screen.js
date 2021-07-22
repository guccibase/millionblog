import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleBodyFull from "../article_components/Article_body_full";
import getArticle from "../../database/get_article";
function BlogScreen() {
  let { id } = useParams();

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    markdown: "",
    authorId: "",
    createdAt: "",
    sanitizedHtml: "",
    read: 0,
    views: 0,
    comments: 0,
    likes: 0,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchArticle = async () => {
      const article = await getArticle(id);
      setArticleData(article);
    };

    if (isMounted) fetchArticle();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <>
      {articleData && (
        <ArticleBodyFull data={articleData} articleId={id}></ArticleBodyFull>
      )}
    </>
  );
}

export default BlogScreen;
