import { likesRef } from "../database/collections";
import minusLikesCount from "../database/minus_likes_count";

export default async function removeLike(articleId, likerId) {
  const like = await likesRef
    .doc(articleId)
    .collection("likers")
    .doc(likerId)
    .delete()
    .then((doc) => {
      minusLikesCount(articleId);
      console.log("like removed");
    })
    .catch((error) => {
      console.log("failed to delete like");
    });

  return like;
}
