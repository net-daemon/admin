import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  css,
  property,
} from "lit-element";

import "@material/mwc-button";
import "@polymer/paper-card";
import "@polymer/iron-icon";
import "@polymer/iron-icons";
import "@material/mwc-textfield";
import "@material/mwc-switch";
import "@material/mwc-formfield";

import { Settings } from "./data";
import { NetDaemonStyle } from "./style";

@customElement("netdaemon-settings")
class NetDaemonSettings extends LitElement {
  @property({ attribute: false }) public settings: Settings;

  protected render(): TemplateResult | void {
    return html`<div class="content">
      <div class="back" @click=${this._goBack}>
        <iron-icon icon="arrow-back"></iron-icon>Go back
      </div>
      <div class="header">
        <h1>Settings</h1>
      </div>
      <paper-card>
        <div class="subheader">
          <h2>Daemon Settings</h2>
        </div>
        <mwc-formfield label="Generate entities">
          <mwc-switch
            disabled
            ?checked=${this.settings.daemonSettings.generateEntities}
          ></mwc-switch>
        </mwc-formfield>
        <mwc-textfield
          disabled
          outlined
          label="Source directory"
          .value=${this.settings.daemonSettings.sourceFolder}
        ></mwc-textfield>
        <mwc-textfield
          disabled
          outlined
          label="Project directory"
          .value=${this.settings.daemonSettings.projectFolder}
        ></mwc-textfield>
        <!--<div class="card-actions">
          <mwc-button>update</mwc-button>
        </div>-->
      </paper-card>

      <paper-card>
        <div class="subheader">
          <h2>Home Assistant Settings</h2>
        </div>
        <mwc-textfield
          disabled
          outlined
          label="Host"
          .value=${this.settings.homeAssistantSettings.host}
        ></mwc-textfield>
        <mwc-textfield
          disabled
          outlined
          label="Port"
          .value=${String(this.settings.homeAssistantSettings.port)}
        ></mwc-textfield>
        <!--<mwc-textfield
          disabled
          outlined
          label="Token"
          .value=${this.settings.homeAssistantSettings.token}
          type="password"
        ></mwc-textfield>-->
        <mwc-formfield label="SSL">
          <mwc-switch
            disabled
            ?checked=${this.settings.homeAssistantSettings.ssl}
          ></mwc-switch>
        </mwc-formfield>
        <!--<div class="card-actions">
          <mwc-button>update</mwc-button>
        </div>-->
      </paper-card>
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
        mwc-textfield,
        mwc-formfield {
          width: calc(100% - 16px);
          padding: 8px;
          opacity: 0.9;
          height: 54px;
          --mdc-theme-secondary: var(--netdaemon-theme-color);
        }
      `,
    ];
  }
}
