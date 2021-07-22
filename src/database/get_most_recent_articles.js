import { articlesRef } from "../database/collections";

export default async () => {
  let articles = [];

  try {
    await articlesRef
      .orderBy("createdAt", "desc")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        //  articles = querySnapshot.map((a) => a.data());
        querySnapshot.forEach((doc) => {
          if (doc.data().status === "live") articles.push(doc);
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
        });
      });
  } catch (error) {}
  return articles;
};
