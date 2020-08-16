export interface App {
  id: string;
  description?: string;
  nextScheduledEvent?: string;
  lastErrorMessage?: string;
  dependencies: string[];
  isEnabled: boolean;
}

interface DaemonSettings {
  generateEntities: boolean;
  sourceFolder: string;
  projectFolder: string;
}
interface HomeAssistantSettings {
  host: string;
  port: number;
  ssl: boolean;
  token: string;
}

export interface Settings {
  daemonSettings: DaemonSettings;
  homeAssistantSettings: HomeAssistantSettings;
}

export const requestApps = (webSocket: WebSocket) => {
  webSocket.send(JSON.stringify({ type: "apps", data: {} }));
};

export const requestSettings = (webSocket: WebSocket) => {
  webSocket.send(JSON.stringify({ type: "settings", data: {} }));
};

export const appSettings = (webSocket: WebSocket, app: string, data: any) => {
  webSocket.send(JSON.stringify({ type: "app", app, data }));
};
