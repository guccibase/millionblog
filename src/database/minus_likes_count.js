import { reactionsCounterRef } from "../database/collections";

export default async function minusLikesCount(articleId) {
  const count = reactionsCounterRef.doc(articleId);
  count.get().then((doc) => {
    if (doc.exists && doc.data().likes) {
      count.update({ likes: doc.data().likes - 1 });
    }
  });
}
