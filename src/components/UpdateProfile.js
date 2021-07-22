import React, { useRef, useState, useEffect } from "react";
import {
    Form,
    Button,
    Card,
    Alert,
    Container,
    Row,
    Image,
    Col
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import UpdateProfileDetails from "../database/edit_profile";
import getUserDetails from "../database/get_user_details";
import mm1 from "./../assets/mm1.jpg";
import mm2 from "./../assets/mm2.png";
import mm3 from "./../assets/mm3.png";
import mm4 from "./../assets/mm4.png";
import mm5 from "./../assets/mm5.png";
import mm6 from "./../assets/mm6.png";
import mm7 from "./../assets/mm7.png";
import mm8 from "./../assets/mm8.jpg";
import mm9 from "./../assets/mm9.jpg";
import mm10 from "./../assets/mm10.jpg";
import mm11 from "./../assets/mm11.jpg";
import lambo1 from "./../assets/urus.png";
import lambo2 from "./../assets/gallardo.png";
import yatch from "./../assets/yatch.png";
import bling1 from "./../assets/diamond.png";
import bling2 from "./../assets/gold.png";
import verifyUsername from "../database/verify_username";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const bioRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const avatars = [
        mm1,
        mm2,
        mm3,
        mm4,
        mm5,
        mm6,
        mm7,
        mm8,
        mm9,
        mm10,
        mm11,
        bling1,
        bling2,
        yatch,
        lambo1,
        lambo2
    ];
    const [selectedAvartar, setSelectedAvatar] = useState(<></>);
    const [avatarRef, setAvatarRef] = useState(0);
    const [userDetails, setUserDetails] = useState({
        username: "",
        bio: "",
        avatar: ""
    });
    const handleSelectAvatar = (avatar) => {
        setSelectedAvatar(
            <Image
                key="selected"
                className="justify-content-md-center mt-2 mb-2"
                src={avatar}
                roundedCircle
            />
        );
    };

    const setProfileImage = (user) => {
        switch (user.avatar) {
            case 0:
                return mm1;
            case 1:
                return mm2;
            case 2:
                return mm3;
            case 3:
                return mm4;
            case 4:
                return mm5;
            case 5:
                return mm6;
            case 6:
                return mm7;
            case 7:
                return mm8;
            case 8:
                return mm9;
            case 9:
                return mm10;
            case 10:
                return mm11;
            case 11:
                return bling1;
            case 12:
                return bling2;
            case 13:
                return yatch;
            case 14:
                return lambo1;
            case 15:
                return lambo2;
            default:
                break;
        }
    };

    useEffect(() => {
        let isMounted = true;
        const getUser = async () => {
            const user = await getUserDetails(currentUser.uid);
            if (user) {
                setUserDetails(user);
                setAvatarRef(user.avatar);
                handleSelectAvatar(setProfileImage(user));
            }
        };
        if (isMounted) getUser();

        return () => {
            isMounted = false;
        };
    }, [currentUser.uid]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        setError("");

        try {
            if (passwordRef.current.value) {
                await updatePassword(passwordRef.current.value);
            }
            const usernameExists = await verifyUsername(
                usernameRef.current.value
            );
            if (
                usernameRef.current.value !== userDetails.username &&
                usernameExists
            ) {
                console.log(usernameExists);
                setError("Username not available");
                setLoading(false);

                return;
            } else {
                setError("");
                console.log(usernameExists);
            }

            await UpdateProfileDetails(currentUser.uid, {
                username: usernameRef.current.value,
                bio: bioRef.current.value,
                avatar: avatarRef
            });
            setLoading(false);
            history.push("/profile");
        } catch (error) {
            setError("Failed to update account");
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Container className="auth-container">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                ref={usernameRef}
                                defaultValue={userDetails.username}
                                required
                            />
                        </Form.Group>
                        <Form.Group id="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                defaultValue={userDetails.bio}
                                type="text"
                                ref={bioRef}
                            />
                        </Form.Group>
                        <Form.Group id="avatar">
                            <Form.Label>Select your Lion avatar</Form.Label>
                            <Container>
                                <Row className="justify-content-md-center">
                                    {avatars.map((avatar, i) => (
                                        <Col key={i} xs={6} md={4}>
                                            <Image
                                                src={avatar}
                                                onClick={() => {
                                                    setAvatarRef(i);
                                                    console.log(avatarRef);
                                                    handleSelectAvatar(avatar);
                                                }}
                                                thumbnail
                                            />
                                        </Col>
                                    ))}
                                    {selectedAvartar}
                                </Row>
                            </Container>
                        </Form.Group>
                        <Button
                            disabled={loading}
                            className="w-100 btn-light filter-btn"
                            type="submit"
                        >
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/profile" className="cancel">
                    Cancel
                </Link>
            </div>
        </Container>
    );
}
