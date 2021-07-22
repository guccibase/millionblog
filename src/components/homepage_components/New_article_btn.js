import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthAlert from "../common_components/Auth_alert";

function NewArticleBtn() {
  const { currentUser } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    }
  }, [currentUser]);

  const handleClick = () => {
    !loggedIn && setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      <Link to={loggedIn ? "/new" : ""}>
        <Button onClick={handleClick} className="new-article btn-light">
          New Article
        </Button>
      </Link>
      {showAlert && <AuthAlert />}
    </div>
  );
}

export default NewArticleBtn;
