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

import { App } from "./data";
import { NetDaemonStyle } from "./style";

@customElement("netdaemon-apps")
class NetDaemonApps extends LitElement {
  @property({ attribute: false }) public apps: App[] = [];

  protected render(): TemplateResult | void {
    return html`<div class="content">
      <div class="back" @click=${this._goBack}>
        <iron-icon icon="arrow-back"></iron-icon>Go back
      </div>
      <div class="header">
        <h1>Apps</h1>
      </div>
      ${this.apps.map((app) => {
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
          </div>
          <div class="card-actions">
            <mwc-button disabled
              >${app.isEnabled ? "disable" : "enable"}</mwc-button
            >
          </div>
        </paper-card>`;
      })}
    </div>`;
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
      `,
    ];
  }
}
