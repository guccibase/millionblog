import { likesRef } from "../database/collections";
import AddLikesCount from "../database/add_likes_count";

export default async function submitLike(articleId, likerId) {
  const like = await likesRef
    .doc(articleId)
    .collection("likers")
    .doc(likerId)
    .set({})
    .then((doc) => {
      AddLikesCount(articleId);

      console.log("liked article");
    })
    .catch((error) => {
      console.log("failed to add like");
    });

  return like;
}
