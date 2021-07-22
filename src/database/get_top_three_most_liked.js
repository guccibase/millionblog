import { articlesRef } from "../database/collections";

export default async () => {
  let articles = [];
  console.log(
    "................................................................"
  );
  try {
    await articlesRef
      .orderBy("likes", "desc")
      .limit(5)
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
