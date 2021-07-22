import { reactionsCounterRef } from "./collections";

export default async function getReactionCounts(articleId) {
  const counts = await reactionsCounterRef
    .doc(articleId)
    .get()
    .then((doc) => {
      console.log(doc.data());
      if (doc.exists) return doc.data();
    })
    .catch((err) => {
      console.log("failed to get counts");
    });
  return counts;
}
