import { articlesRef } from "./collections";
import createSlug from "../helpers/create_slug";
import purifyHTML from "../helpers/purify_html";
import time from "../helpers/get-timestamp";
export default async (article, articleId, coverImage) => {
    try {
        const slug = await createSlug(article.title, time);
        const sanitizedHtml = await purifyHTML(article.markdown);
        const editedArticleId = await articlesRef
            .doc(articleId)
            .update(
                coverImage
                    ? {
                          ...article,
                          coverImageUrl: coverImage.imageUrl,
                          coverImageId: coverImage.imageId,
                          slug,
                          sanitizedHtml
                      }
                    : {
                          ...article,
                          slug,
                          sanitizedHtml
                      }
            )
            .then((docRef) => {
                console.log("updated");
                return docRef.id;
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        console.log(editedArticleId);

        return editedArticleId;
    } catch (error) {
        console.log(error);
    }
};
