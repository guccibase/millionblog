import createArticle from "../database/create_new_article";

export default async (
    navigate,
    articleData,
    coverImage,
    coverImageId,
    history
) => {
    console.log("validated");
    if (navigate === true) {
        console.log("submiting");
        try {
            const id = await createArticle(
                articleData,
                coverImage,
                coverImageId
            );
            console.log(id);
            history.push("/blog/" + id);
        } catch (error) {
            console.log(error);
        }
    }
};
