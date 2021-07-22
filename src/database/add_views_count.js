import { reactionsCounterRef } from "../database/collections";

export default async function addViewsCount(articleId) {
  const count = reactionsCounterRef.doc(articleId);
  count.get().then((doc) => {
    if (doc.exists) {
      count.update({ views: doc.data().views + 1 });
    }
  });
}
