const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const server = require("http").createServer();
const app = express();
const path = process.env.ADMINPATH || "";
const port = 1337;
const NetDaemonWS = new WebSocket("ws://127.0.0.1:5000");

let wss = new WebSocket.Server({
  server: server,
});

app.use(`${path}/`, express.static("build"));
app.use(`${path}/favicon.png`, express.static("build/favicon.png"));

app.get(`${path}/api/apps`, async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/apps");
    const json = await response.json();
    res.send(json);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get(`${path}/api/settings`, async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/settings");
    const json = await response.json();
    res.send(json);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post(`${path}/api/app/state/:app/disable`, async (req, res) => {
  try {
    await fetch(
      `http://127.0.0.1:5000/api/app/state/${req.params.app}/disable`,
      { method: "post", data: {} }
    );
    res.json({});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post(`${path}/api/app/state/:app/enable`, async (req, res) => {
  try {
    await fetch(
      `http://127.0.0.1:5000/api/app/state/${req.params.app}/enable`,
      { method: "post", data: {} }
    );
    res.json({});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

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
