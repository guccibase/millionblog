import React from "react";
import "./App_title.css";
import { Image, Navbar } from "react-bootstrap";
import mm from "./../../assets/mmlogo.jpeg";
import { useHistory } from "react-router-dom";

function AppTitle() {
    const history = useHistory();

    return (
        <Navbar>
            <div className="mb-4" onClick={() => history.push("/")}>
                <h1 className="app-title">
                    <Image className="rounded-circle" src={mm}></Image> blog{" "}
                    <Navbar.Text className="greeting">
                        {"where MilLION ideas meet"}
                    </Navbar.Text>
                </h1>
            </div>
        </Navbar>
    );
}

export default AppTitle;
