import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  property,
} from "lit-element";
import "@polymer/iron-icon";
import "@polymer/iron-icons";
import "@polymer/paper-card";
import "@polymer/paper-item";

import { App, Settings } from "./data";
import { NetDaemonStyle } from "./style";

@customElement("netdaemon-entry")
class NetDaemonEntry extends LitElement {
  @property({ attribute: false }) public apps: App[] = [];
  @property({ attribute: false }) public settings: Settings;
  @property() public error?: any;

  protected render(): TemplateResult | void {
    return html`<div class="content">
      <div class="header"><h1>NetDaemon Admin</h1></div>
      ${this.error
        ? html`<paper-card>
            <div class="subheader error">
              <h2>Error!</h2>
            </div>
            <pre>${this.error.message}</pre>
          </paper-card>`
        : html` <paper-card>
            <paper-item @tap=${() => this._changePage("apps")}>
              <iron-icon class="entryicon" icon="extension"></iron-icon>
              <paper-item-body two-line>
                <div>Apps</div>
                <div secondary>Your app status and actions</div>
              </paper-item-body>
              <iron-icon icon="chevron-right"></iron-icon>
            </paper-item>
            <paper-item @tap=${() => this._changePage("settings")}>
              <iron-icon icon="build"></iron-icon>
              <paper-item-body two-line>
                <div>Settings</div>
                <div secondary>Daemon and Home Assistant settings</div>
              </paper-item-body>
              <iron-icon icon="chevron-right"></iron-icon>
            </paper-item>
          </paper-card>`}

      <paper-card>
        <a href="https://netdaemon.xyz/" target="_blank" rel="noreferrer">
          <paper-item>
            <iron-icon icon="description"></iron-icon>
            <paper-item-body two-line>
              <div>Documentation</div>
              <div secondary>Open the documentation for NetDaemon</div>
            </paper-item-body>
            <iron-icon icon="launch"></iron-icon>
          </paper-item>
        </a>
        <a
          href="https://github.com/net-daemon"
          target="_blank"
          rel="noreferrer"
        >
          <paper-item>
            <iron-icon icon="code"></iron-icon>
            <paper-item-body two-line>
              <div>GitHub</div>
              <div secondary>Open the GitHub organization for NetDaemon</div>
            </paper-item-body>
            <iron-icon icon="launch"></iron-icon>
          </paper-item>
        </a>
      </paper-card>
    </div>`;
  }

  private _changePage(page: string): void {
    this.dispatchEvent(
      new CustomEvent("set-page", {
        detail: {
          page,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return NetDaemonStyle;
  }
}
