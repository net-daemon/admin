export interface App {
  id: string;
  description?: string;
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

export const getApps = async () => {
  const result = await fetch("./api/apps");
  const apps = (await result.json()) as any;
  if (apps.errno) {
    throw new Error(apps.message);
  }
  return apps as App[];
};

export const getSettings = async () => {
  const result = await fetch("./api/settings");
  const settings = (await result.json()) as any;
  if (settings.errno) {
    throw new Error(settings.message);
  }
  return settings as Settings;
};
