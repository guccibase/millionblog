import React, { useState } from "react";
import NewArticleCancelBtn from "./New_article_cancel_btn";
import NewArticleDescription from "./New_article_description";
import NewArticleMarkdown from "./New_article_markdown";
import ArticleCoverImg from "../common_components/Article_cover_img";
import SubmitButton from "../common_components/Submit_button";
import NewArticleTitle from "./New_article_title";
import ValidateData from "../../helpers/validate_new_article";
import SubmitNewArticle from "../../helpers/submit_new_article";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./New_article.css";
import WordLength from "./Word_length";
import handleFireBaseUpload from "../../database/upload_image";
import Loading from "../common_components/Loading";

export default function NewArticleForm() {
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();
    const [imageAsFile, setImageAsFile] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState(undefined);
    const [articleData, setArticleData] = useState({
        title: "",
        description: "",
        markdown: "",
        coverImageUrl: "",
        authorId: currentUser.uid
    });
    let navigate = false;
    const history = useHistory();
    let coverImgUrlObjectImgUrl = "";
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let coverImg = {};
            if (imageAsFile !== "")
                coverImg = await handleFireBaseUpload(imageAsFile);
            navigate = await ValidateData(articleData);
            await SubmitNewArticle(
                navigate,
                articleData,
                coverImg.imageUrl,
                coverImg.imageId,
                history
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }

        URL.revokeObjectURL(coverImgUrlObjectImgUrl);
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
        <div class="container">
            <h1 class="mb-4">New Article</h1>
            <Form onSubmit={handleSubmit}>
                <NewArticleTitle setArticleData={setArticleData} />
                <WordLength i={articleData.title} />
                <NewArticleDescription setArticleData={setArticleData} />
                <WordLength i={articleData.description} />
                <ArticleCoverImg
                    imageAsUrl={imageAsUrl}
                    handleImage={handleImageAsFile}
                />

                <NewArticleMarkdown setArticleData={setArticleData} />
                <WordLength i={articleData.markdown} />
                <NewArticleCancelBtn />
                {!loading ? <SubmitButton /> : <Loading />}
            </Form>
        </div>
    );
}
