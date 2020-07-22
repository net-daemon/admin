import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  property,
  css,
} from "lit-element";
import "./apps";
import "./settings";
import "./entry";
import "./footer";

import { App, Settings, getApps, getSettings } from "./data";
import { NetDaemonStyle } from "./style";

@customElement("netdaemon-main")
class NetDaemonMain extends LitElement {
  @property() public page = "";
  @property({ attribute: false }) public apps: App[] = [];
  @property({ attribute: false }) public settings: Settings;
  @property() public error?: any;

  public async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("set-page", (ev) => this._setPage(ev as CustomEvent));
    this.page = window.location.hash.replace("#", "") || "";
    try {
      this.apps = await getApps();
    } catch (err) {
      this.error = err;
    }
    try {
      this.settings = await getSettings();
    } catch (err) {
      this.error = err;
    }
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
          ? html`<netdaemon-apps .apps=${this.apps}></netdaemon-apps>`
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
          height: 100%;
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
