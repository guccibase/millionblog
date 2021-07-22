import { commentsRef } from "../database/collections";
import time from "../helpers/get-timestamp";
import addCommentsCount from "../database/add_comments_count";

export default async function submitComment(articleId, commenterId, comment) {
  const addedComment = await commentsRef
    .doc(articleId)
    .collection("comments")
    .add({
      createdAt: time,
      comment: comment,
      authorId: commenterId,
    })
    .then((doc) => {
      console.log("comment added");
      addCommentsCount(articleId);
      //   return doc.get().then((doc) => doc.data());
    })
    .catch((error) => {
      console.log("failed to add comment");
    });

  return comment;
}
