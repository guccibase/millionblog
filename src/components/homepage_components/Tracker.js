import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

function Tracker() {
    const [tracker, setTracker] = useState(0.0);

    useEffect(() => {
        async function updatePrice() {
            const data = await CoinGeckoClient.simple.price({
                ids: ["million"],
                vs_currencies: ["usd"]
            });
            setTracker(data.data.million.usd);
        }
        async function getDogecoinPrice() {
            const data = await CoinGeckoClient.simple.price({
                ids: ["million"],
                vs_currencies: ["usd"]
            });
            setTracker(data.data.million.usd);
        }
        getDogecoinPrice();
        setInterval(() => updatePrice(), 10000);
    }, []);

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Subtitle className="text-center">
                    Live tracker
                </Card.Subtitle>
                <h3 className="text-center tracker">
                    ${Number.parseFloat(tracker).toFixed(2)}
                </h3>
                <Card.Text className="text-center high">
                    Creator: Ex-Google, Ex-Facebook TechLead
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Tracker;
