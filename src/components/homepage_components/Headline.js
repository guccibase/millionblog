import React, { useState, useEffect } from "react";
import "./headline.css";
import getHeadline from "../../database/get_greeting";

function Headline() {
    const [headline, setHeadline] = useState("");
    useEffect(() => {
        const fetctGreeting = async () => {
            const text = getHeadline();
            setHeadline(text);
        };
        fetctGreeting();
    });
    return (
        <div className="app-headline">
            <h2>{headline}</h2>
        </div>
    );
}

export default Headline;
