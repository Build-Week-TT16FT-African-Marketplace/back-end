const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

configureRoutes(server);

server.get("/", (req, res) => {
    res.send("Welcome to the African Marketplace API 😀");
});

module.exports = server;