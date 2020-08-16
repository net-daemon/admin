const WebSocket = require("ws");

let apps = [
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

let settings = {
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

const wss = new WebSocket.Server({
  port: 5000,
});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const _message = JSON.parse(message);
    if (_message.type === "apps") {
      _message.data = apps;
      ws.send(JSON.stringify(_message));
    } else if (_message.type === "settings") {
      _message.data = settings;
      ws.send(JSON.stringify(_message));
    } else if (_message.type === "app") {
      apps = apps.map((app) => {
        if (app.id === _message.app) {
          app = { ...app, ..._message.data };
        }
        return app;
      });
      ws.send(JSON.stringify({ type: "apps", data: apps }));
    }
  });
});
