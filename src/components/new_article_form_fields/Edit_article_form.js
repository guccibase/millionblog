import React, { useState, useEffect } from "react";
import NewArticleCancelBtn from "./New_article_cancel_btn";
import NewArticleDescription from "./New_article_description";
import NewArticleMarkdown from "./New_article_markdown";
import ArticleCoverImg from "../common_components/Article_cover_img";
import SubmitButton from "../common_components/Submit_button";
import NewArticleTitle from "./New_article_title";
import ValidateData from "../../helpers/validate_new_article";
import EditArticle from "../../database/edit_article";
import getArticle from "../../database/get_article";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./New_article.css";
import WordLength from "./Word_length";
import handleFireBaseUpload, {
    handleFireBaseUploadUpdate
} from "../../database/upload_image";
import Loading from "../common_components/Loading";

export default function EditArticleForm() {
    let { id } = useParams();
    let navigate = false;
    let coverImgUrlObjectImgUrl = "";
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const [imageAsFile, setImageAsFile] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState(undefined);
    const [articleData, setArticleData] = useState({
        title: "",
        description: "",
        markdown: "",
        authorId: "",
        coverImageUrl: "",
        coverImageId: "",
        sanitizedHtml: ""
    });

    useEffect(() => {
        let isMounted = true;
        const fetchArticle = async () => {
            const article = await getArticle(id);
            setArticleData({ ...article });
            if (article.coverImageUrl && article.coverImageUrl !== "")
                setImageAsUrl(article.coverImageUrl);
        };

        if (isMounted) fetchArticle();
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let coverImg = {};
            if (imageAsFile !== "") {
                console.log("new image");
                coverImg = await handleFireBaseUpload(imageAsFile);
                console.log(
                    "................................................................"
                );

                console.log(coverImg);
            }
            // if (
            //     coverImg.imageUrl !== undefined &&
            //     coverImg.imageUrl !== "" &&
            //     articleData.coverImageId
            // ) {
            //     console.log("updating image");
            //     coverImg = {
            //         imageUrl: await handleFireBaseUploadUpdate(
            //             imageAsFile,
            //             articleData.coverImageId
            //         )
            //     };
            //     setArticleData((prev) => {
            //         return {
            //             ...prev,
            //             ["coverImageUrl"]: coverImg.coverImageUrl
            //         };
            //     });

            navigate = await ValidateData(articleData);
            if (navigate) {
                if (coverImg.imageUrl) {
                    await EditArticle(articleData, id, coverImg);
                } else {
                    await EditArticle(articleData, id);
                }
                history.push("/blog/" + id);
            }
            setLoading(false);
            URL.revokeObjectURL(coverImgUrlObjectImgUrl);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleImageAsFile = (e) => {
        console.log(".......");
        const image = e.target.files[0];
        coverImgUrlObjectImgUrl = URL.createObjectURL(image);
        setImageAsFile((imageFile) => image);
        setImageAsUrl(coverImgUrlObjectImgUrl);
        console.log(imageAsUrl);
    };

    return (
        <div>
            <h1>Edit Article</h1>
            <Form onSubmit={handleSubmit}>
                <NewArticleTitle
                    setArticleData={setArticleData}
                    formValue={articleData.title}
                />
                <WordLength i={articleData.title} />

                <NewArticleDescription
                    setArticleData={setArticleData}
                    formValue={articleData.description}
                />
                <WordLength i={articleData.description} />
                <ArticleCoverImg
                    imageAsUrl={imageAsUrl}
                    handleImage={handleImageAsFile}
                />
                <NewArticleMarkdown
                    setArticleData={setArticleData}
                    formValue={articleData.markdown}
                />
                {/* <MDEditor
          value={articleData.markdown}
          onChange={(v) => {
            setArticleData((prev) => {
              return { ...prev, ["markdown"]: v };
            });
          }}
        /> */}
                <WordLength i={articleData.markdown} />

                <NewArticleCancelBtn />
                {!loading ? <SubmitButton /> : <Loading />}
            </Form>
            <div style={{ padding: "50px 0 0 0" }} />
        </div>
    );
}
