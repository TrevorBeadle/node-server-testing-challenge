const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
