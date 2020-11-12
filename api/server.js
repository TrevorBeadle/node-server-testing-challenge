const express = require("express");
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const hobbitsRouter = require("../hobbits/hobbits-router");
const cors = require("cors");

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use("/api/hobbits", hobbitsRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

// eslint-disable-next-line
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

module.exports = server;
