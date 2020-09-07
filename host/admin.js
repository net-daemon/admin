const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const server = require("http").createServer();
const app = express();
const path = process.env.ADMINPATH || "";
const port = 1337;
let NetDaemonWS;
let frontendWS;

let wss = new WebSocket.Server({
  server: server,
});

app.use(`${path}/`, express.static("build"));
app.use(`${path}/favicon.png`, express.static("build/favicon.png"));

wss.on("connection", function connection(ws) {
  frontendWS = ws;
  ws.on("message", function incoming(message) {
    const _message = JSON.parse(message);
    console.log(`Admin GUI: received message from frontend:`, _message.type);
    if (NetDaemonWS) {
      NetDaemonWS.send(message);
    }
  });
});

function connect() {
  var ws = new WebSocket("ws://127.0.0.1:5000/api/ws");
  ws.onopen = function () {
    NetDaemonWS = ws;
    server.on("request", app);
    server.listen(port, () =>
      console.log(`Admin GUI: Running NetDaemon Admin`)
    );
  };

  ws.on("message", function incoming(message) {
    const _message = JSON.parse(message);
    console.log(`Admin GUI: received message from NetDaemon:`, _message.type);
    frontendWS.send(message);
  });

  ws.onclose = function (e) {
    console.log(
      "Admin GUI: Reconnect will be attempted in 10 seconds.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 10000);
  };

  ws.onerror = function (err) {
    console.error(
      "Admin GUI: NetDaemon API not available yet, error: ",
      err.message,
      "Closing and retrying..."
    );
    ws.close();
  };
}

connect();
