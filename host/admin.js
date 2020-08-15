const express = require("express");
const fetch = require("node-fetch");
const app = express();
const path = process.env.ADMINPATH || "";
const port = 1337;

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
      { method: "post" }
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
      { method: "post" }
    );
    res.json({});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(port, () => console.log(`Running NetDaemon Admin`));
