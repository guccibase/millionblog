import { latestArticleRef, articlesRef } from "./collections";

export default async () => {
  let article = {};
  console.log(",,,,,,,,,,,,,,,,,,,,");
  try {
    await latestArticleRef
      .doc("article id")
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await articlesRef
            .doc(doc.data().latest)
            .get()
            .then((doc) => {
              if (doc.exists) {
                article = { id: doc.id, data: { ...doc.data() } };
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch (error) {}
  return article;
};
