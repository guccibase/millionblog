import { reactionsCounterRef } from "../database/collections";

export default async function addCommentsCount(articleId) {
  const count = reactionsCounterRef.doc(articleId);
  count.get().then((doc) => {
    if (doc.exists) {
      count.update({ comments: doc.data().comments + 1 });
      return doc.data().comments;
    }
  });
}
