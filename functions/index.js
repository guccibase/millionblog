const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onReactionOnArticles = functions.firestore
  .document("/reactions counter/{articleId}")
  .onUpdate(async (snapshot, context) => {
    const articleId = context.params.articleId;
    const data = snapshot.after.data();

    const articleDoc = await admin
      .firestore()
      .collection("articles")
      .doc(articleId)
      .get();
    if (articleDoc.exists) {
      articleDoc.ref.update({
        likes: data.likes,
        views: data.views,
        comments: data.comments,
      });
    }
  });

exports.onCreateNewArticle = functions.firestore
  .document("/articles/{articleId}")
  .onCreate(async (snapshot, context) => {
    const articleId = context.params.articleId;
    const data = { likes: 0, views: 0, comments: 0 };

    await admin
      .firestore()
      .collection("reactions counter")
      .doc(articleId)
      .set(data);
  });

exports.onUpdateArticle = functions.firestore
  .document("/articles/{articleId}")
  .onUpdate(async (snapshot, context) => {
    const articleId = context.params.articleId;
    const adata = snapshot.after.data();
    const bdata = snapshot.before.data();
    if (bdata.status === "pending" && adata.status === "live") {
      await admin
        .firestore()
        .collection("latest article")
        .doc("article id")
        .set({ latest: articleId });
    }
  });
