import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  css,
  property,
} from "lit-element";
import "./apps";
import "./settings";
import "./entry";
import "./footer";
import { App, Settings, requestApps, requestSettings } from "./data";
import { NetDaemonStyle } from "./style";

@customElement("netdaemon-main")
class NetDaemonMain extends LitElement {
  @property() public page = "";
  @property({ attribute: false }) public webSocket!: WebSocket;
  @property({ attribute: false }) public apps: App[] = [];
  @property({ attribute: false }) public settings: Settings;
  @property() public error?: any;

  public async connectedCallback() {
    super.connectedCallback();

    this.webSocket = new WebSocket(
      `${window.location.protocol === "https:" ? "wss" : "ws"}://${
        window.location.host
      }${window.location.pathname}`
    );

    this.addEventListener("set-page", (ev) => this._setPage(ev as CustomEvent));

    this.page = window.location.hash.replace("#", "") || "";
    this.webSocket.onopen = () => {
      requestApps(this.webSocket);
      requestSettings(this.webSocket);
    };
    this.webSocket.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      if (message.type === "apps") {
        this.apps = message.data;
      } else if (message.type === "settings") {
        this.settings = message.data;
      }
      this.requestUpdate();
    };
  }

  protected render(): TemplateResult | void {
    return html`<div class="maincontent">
        ${this.page === ""
          ? html` <netdaemon-entry
              .error=${this.error}
              .settings=${this.settings}
              .apps=${this.apps}
            ></netdaemon-entry>`
          : this.page === "apps"
          ? html`<netdaemon-apps
              .apps=${this.apps}
              .webSocket=${this.webSocket}
            ></netdaemon-apps>`
          : this.page === "settings"
          ? html`<netdaemon-settings
              .settings=${this.settings}
            ></netdaemon-settings>`
          : ""}
      </div>
      <netdaemon-footer></netdaemon-footer>`;
  }

  static get styles() {
    return [
      NetDaemonStyle,
      css`
        .maincontent {
          width: 100%;
          overflow-y: auto;
          height: calc(100vh - 40px);
          color: var(--primary-text-color);
          background-color: var(--netdaemon-theme-background-color);
        }
      `,
    ];
  }

  private _setPage(ev: CustomEvent) {
    const page = ev.detail.page;
    window.location.hash = `#${page}`;
    this.page = page || "";
  }
}
