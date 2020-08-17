const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const server = require("http").createServer();
const app = express();
const path = process.env.ADMINPATH || "";
const port = 1337;
const NetDaemonWS = new WebSocket("ws://127.0.0.1:5000/api/ws");

let wss = new WebSocket.Server({
  server: server,
});

app.use(`${path}/`, express.static("build"));
app.use(`${path}/favicon.png`, express.static("build/favicon.png"));

let frontendWS;

wss.on("connection", function connection(ws) {
  frontendWS = ws;
  ws.on("message", function incoming(message) {
    const _message = JSON.parse(message);
    console.log(`received message from frontend:`, _message.type);
    NetDaemonWS.send(message);
  });
});

NetDaemonWS.on("message", function incoming(message) {
  const _message = JSON.parse(message);
  console.log(`received message from NetDaemon:`, _message.type);
  frontendWS.send(message);
});

server.on("request", app);
server.listen(port, () => console.log(`Running NetDaemon Admin`));
