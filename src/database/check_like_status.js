import { likesRef } from "./collections";

export default async function isLiked(currentUserId, articleId) {
  const exists = await likesRef
    .doc(articleId)
    .collection("likers")
    .doc(currentUserId)
    .get()
    .then((doc) => {
      return doc.exists;
    })
    .catch((err) => {
      console.log("failed");
    });
  return exists;
}
