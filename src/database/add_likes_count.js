import { reactionsCounterRef } from "../database/collections";

export default async function addLikesCount(articleId) {
  const count = reactionsCounterRef.doc(articleId);
  count.get().then((doc) => {
    if (doc.exists) {
      count.update({ likes: doc.data().likes + 1 });
    }
  });
}
