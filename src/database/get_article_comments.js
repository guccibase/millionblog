import { commentsRef } from "../database/collections";

export default async (articleId) => {
  let comments = [];
  try {
    await commentsRef
      .doc(articleId)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          comments.push(doc);
        });
      });
  } catch (error) {
    console.log("failed");
  }
  return comments;
};
