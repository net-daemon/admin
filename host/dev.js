const express = require("express");
const app = express();
const port = 5000;

app.get("/api/apps", (req, res) =>
  res.send([
    {
      id: "global_app",
      dependencies: [],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed venenatis efficitur diam, at convallis sapien malesuada a.\nNulla vitae augue cursus, ultrices felis in, congue elit.\nVestibulum pulvinar, turpis ac vulputate ultricies, libero ex iaculis nunc, et interdum arcu orci vitae lorem.\nAliquam facilisis vitae neque ultrices malesuada.\nCurabitur rhoncus dui odio, sit amet convallis purus aliquet a.\nDonec dictum neque nec urna iaculis sagittis.\nIn iaculis lorem et lacinia fringilla.\nDonec viverra tincidunt ligula et fringilla.\nProin nec orci nec purus vulputate finibus sed et metus.\nDonec hendrerit, ipsum laoreet molestie varius, neque enim scelerisque ex, a rhoncus purus justo eu arcu.",
      isEnabled: true,
    },
    {
      id: "helper_app",
      dependencies: ["global_app"],
      description: "A nice description that describe the app goes here",
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
