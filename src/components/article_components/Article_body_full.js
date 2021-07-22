import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import AppHeader from "../homepage_components/App_header";
import Tracker from "../homepage_components/Tracker";
import AddCommentComponent from "./Add_comment_component";
import "./Article_styles.css";
import ReactionsComponent from "./Reactions_component";
import { useAuth } from "../../contexts/AuthContext";
import Comments from "./Comments";
import Like_button from "./Like_button";
import Loading from "../common_components/Loading";
import ArticleCreatedTime from "./Article_created_time";
import getUserDetails from "../../database/get_user_details";
import ArticleCoverImg from "../common_components/Article_cover_img";

function ArticleBodyFull({ data, articleId }) {
    const { currentUser } = useAuth();
    const [isAuthor, setIsAuthor] = useState(false);
    const [author, setAuthor] = useState("");

    const [currentUserId, setCurrentUserId] = useState("noid");
    const [reactions, setReactions] = useState({
        likes: 0,
        views: 0,
        comments: 0
    });

    const verifyIfAuthor = async () => {
        if (currentUser) setCurrentUserId(currentUser.uid);
        if (currentUser && currentUser.uid === data.authorId) {
            setIsAuthor(true);
        }
    };

    useEffect(() => {
        const getAuthor = async () => {
            const user = await getUserDetails(data.authorId);
            setAuthor(user);
        };

        verifyIfAuthor();
        data.sanitizedHtml
            ? (document.querySelector(".article-body").innerHTML =
                  data.sanitizedHtml)
            : console.log("loading...");
        data.authorId && getAuthor();
        setReactions({
            likes: data.likes,
            views: data.views,
            comments: data.comments
        });
        window.scrollTo(0, 0);
    }, [data.sanitizedHtml]);

    return (
        <div>
            <AppHeader />
            <Tracker></Tracker>
            <Card className="mt-4">
                {!data.title ? (
                    <Loading />
                ) : (
                    <Card.Body>
                        {data.status === "pending" && (
                            <Alert className="text-center alert-info">
                                Your article has been submitted but it is
                                pending approval. It will go live for all
                                readers once it is appoved
                            </Alert>
                        )}
                        <Card.Title>
                            <h2>{data.title}</h2>
                        </Card.Title>
                        <Card.Text className="text-muted">
                            by {author.username}
                        </Card.Text>
                        <ArticleCreatedTime createdAt={data.createdAt} />
                        <div>
                            <a href="/" className="btn btn-secondary ml-2 mr-2">
                                All articles
                            </a>
                            <Like_button
                                updateLikeCount={setReactions}
                                articleId={articleId}
                                currentUserId={currentUserId}
                            />
                            {isAuthor && (
                                <a
                                    href={"/edit/" + articleId}
                                    className="btn btn-info"
                                >
                                    Edit
                                </a>
                            )}
                        </div>
                        <Card.Text className="mt-4 card-text bold">
                            {data.description}
                        </Card.Text>
                        {data.coverImageUrl && data.coverImageUrl !== "" && (
                            <ArticleCoverImg imageAsUrl={data.coverImageUrl} />
                        )}
                        <div className="article-body"></div>
                    </Card.Body>
                )}

                <div className="m-2 ml-4 article-body-full-bottom">
                    <ReactionsComponent id="" reactionCounts={reactions} />
                </div>
            </Card>
            <AddCommentComponent
                updateCommentsCount={setReactions}
                articleId={articleId}
                currentUserId={currentUserId}
            />
            <Comments reactions={reactions} articleId={articleId} />
        </div>
    );
}

export default ArticleBodyFull;
