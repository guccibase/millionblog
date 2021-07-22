import { articlesRef } from "./collections";

export default async () => {
  let articles = [];
  try {
    await articlesRef
      .where("status", "==", "live")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        //  articles = querySnapshot.map((a) => a.data());
        querySnapshot.forEach((doc) => {
          articles.push(doc);
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
        });
      });
  } catch (error) {}
  return articles;
};
