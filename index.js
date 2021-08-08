require("dotenv").config();

const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/", (req, res) => {
    res.status(200).send("Server running");
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("server running on port", PORT);
})