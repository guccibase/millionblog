import { articlesRef } from "../database/collections";
import addViewsCount from "../database/add_views_count";

export default async (articleId) => {
  const article = await articlesRef
    .doc(articleId)
    .get()
    .then((doc) => {
      addViewsCount(articleId);
      return doc.data();
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return article;
};
