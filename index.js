require("dotenv").config();

const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const axios = require("axios");
const remoteEndpoint = process.env.URL;
const responseProperty = process.env.RESPONSE_PROPERTY;

server.use("/", async (req, res) => {

    // remove first "/" character from req.url
    if (process.env.REMOVE_LEADING_SLASH)
        { req.url = req.url.slice(1); }

    await axios.get(remoteEndpoint + req.url)
        .then(response => {
            console.log(response[responseProperty]);
            res.status(200).json(response[responseProperty]);
        })
        .catch(error => {
            console.error(error);
            res.status(404).json("Not found.");
        });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("server running on port", PORT);
})