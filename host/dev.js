const express = require("express");
const app = express();
const port = 5000;

app.get("/api/apps", (req, res) =>
  res.send([
    {
      id: "global_app",
      dependencies: [],
      isEnabled: true,
    },
    {
      id: "helper_app",
      dependencies: ["global_app"],
      isEnabled: false,
    },
    {
      id: "my_app",
      dependencies: ["global_app", "helper_app"],
      isEnabled: true,
    },
  ])
);

app.get("/api/settings", (req, res) =>
  res.send({
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
  })
);

app.listen(port, () =>
  console.log(`Running Dummy NetDaemon backend at http://localhost:${port}`)
);
