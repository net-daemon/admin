import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  css,
  property,
} from "lit-element";
import "@material/mwc-button";
import "@polymer/iron-icon";
import "@polymer/iron-icons";
import "@polymer/paper-card";

import { App, appSettings } from "./data";
import { NetDaemonStyle } from "./style";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

@customElement("netdaemon-apps")
class NetDaemonApps extends LitElement {
  @property({ attribute: false }) public apps: App[] = [];

  @property() public webSocket: WebSocket;

  protected render(): TemplateResult | void {
    return html`<div class="content">
      <div class="back" @click=${this._goBack}>
        <iron-icon icon="arrow-back"></iron-icon>Go back
      </div>
      <div class="header">
        <h1>Apps</h1>
      </div>
      ${this.apps?.map((app) => {
        return html`<paper-card
          ><div class="header">
            <h2>${app.id.toUpperCase().replace(/_/g, " ")}</h2>
          </div>
          <div class="appdetails">
            ${app.description
              ? html`<div class="description">${app.description}</div>`
              : ""}
            ${app.dependencies?.length > 0
              ? html`<div class="dpendencies">
                  Dependencies:
                  ${app.dependencies.map((dependency) => {
                    return html`<div class="dependency">
                      <div class="dot">•</div>
                      ${dependency}
                    </div>`;
                    ``;
                  })}
                </div>`
              : ""}
            ${app.nextScheduledEvent && app.isEnabled
              ? html`<div class="next" title="${app.nextScheduledEvent}">
                  Next scheduled event
                  ${this._relativeTime(app.nextScheduledEvent)}
                </div>`
              : ""}
            ${app.lastErrorMessage
              ? html`<div class="error">
                  <details
                    ><summary>Expaned to see the latest error</summary
                    >${app.lastErrorMessage}</details
                  >
                </div>`
              : ""}
          </div>
          <div class="card-actions">
            <mwc-button @click=${() => this._toggleApp(app)}
              >${app.isEnabled ? "disable" : "enable"}</mwc-button
            >
          </div>
        </paper-card>`;
      })}
    </div>`;
  }

  private _toggleApp(app: App): void {
    appSettings(this.webSocket, app.id, { isEnabled: !app.isEnabled });
    this.apps = this.apps.map((app) => {
      app.isEnabled = !app.isEnabled;
      return app;
    });
  }

  private _relativeTime(next: string): string {
    const nextEvent = new Date(next);
    return timeAgo.format(nextEvent.getTime());
  }

  private _goBack(): void {
    this.dispatchEvent(
      new CustomEvent("set-page", {
        detail: {
          page: "",
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return [
      NetDaemonStyle,
      css`
        .dpendencies {
          opacity: 0.8;
        }
        paper-card .header {
          padding-top: 0;
        }
        .dependency {
          width: 100%;
          display: flex;
          padding-left: 16px;
          align-items: center;
          line-height: 24px;
        }
        .dot {
          font-size: 32px;
          color: var(--netdaemon-theme-color);
          padding-right: 4px;
        }
        .appdetails {
          margin-top: -24px;
          padding: 0 0 8px 12px;
        }
        .description,
        .error {
          white-space: pre-line;
        }
        .error {
          margin-top: 8px;
          color: var(--error-color);
        }
        .error summary {
          cursor: pointer;
        }

        .next {
          padding: 8px 0;
        }
      `,
    ];
  }
}
