const express = require("express");
const app = express();
const port = 5000;

const apps = [
  {
    id: "global_app",
    dependencies: [],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed venenatis efficitur diam, at convallis sapien malesuada a.\nNulla vitae augue cursus, ultrices felis in, congue elit.\nVestibulum pulvinar, turpis ac vulputate ultricies, libero ex iaculis nunc, et interdum arcu orci vitae lorem.\nAliquam facilisis vitae neque ultrices malesuada.\nCurabitur rhoncus dui odio, sit amet convallis purus aliquet a.\nDonec dictum neque nec urna iaculis sagittis.\nIn iaculis lorem et lacinia fringilla.\nDonec viverra tincidunt ligula et fringilla.\nProin nec orci nec purus vulputate finibus sed et metus.\nDonec hendrerit, ipsum laoreet molestie varius, neque enim scelerisque ex, a rhoncus purus justo eu arcu.",
    isEnabled: true,
    nextScheduledEvent: "2020-08-15T21:29:58.9616839+02:00",
    lastErrorMessage: null,
  },
  {
    id: "helper_app",
    dependencies: ["global_app"],
    description: "A nice description that describe the app goes here",
    isEnabled: false,
    nextScheduledEvent: null,
    lastErrorMessage: null,
  },
  {
    id: "my_app",
    dependencies: ["global_app", "helper_app"],
    isEnabled: true,
    nextScheduledEvent: null,
    lastErrorMessage: "Oh boy!\nYou really screwed up now!",
  },
];

const settings = {
  daemonSettings: {
    generateEntities: true,
    sourceFolder: "/workspaces/netdaemon/exampleapps",
    projectFolder: "",
  },
  homeAssistantSettings: {
    host: "192.168.1.7",
    port: 8123,
    ssl: false,
    token: "asdasdsa",
  },
};

app.get("/api/apps", (req, res) => res.send(apps));

app.get("/api/settings", (req, res) => res.send(settings));

app.post("/api/app/state/:app/disable", (req, res) => {
  apps.forEach((app) => {
    if (app.id === req.params.app) {
      app.isEnabled = false;
    }
  });
  res.json({});
});
app.post("/api/app/state/:app/enable", (req, res) => {
  apps.forEach((app) => {
    if (app.id === req.params.app) {
      app.isEnabled = true;
    }
  });
  res.json({});
});

app.listen(port, () =>
  console.log(`Running Dummy NetDaemon backend at http://localhost:${port}`)
);
