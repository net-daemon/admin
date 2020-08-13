import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  css,
} from "lit-element";

import { NetDaemonStyle } from "./style";

@customElement("netdaemon-footer")
class NetDaemonFooter extends LitElement {
  protected render(): TemplateResult | void {
    return html`<div class="footer">
      This version of NetDaemon Admin is locked in read-only mode
    </div>`;
  }

  static get styles() {
    return [
      NetDaemonStyle,
      css`
        .footer {
          width: 100%;
          bottom: 0;
          height: 16px;
          position: absolute;
          text-align: center;
          padding: 12px 0;
          font-style: italic;
          font-size: 12px;
          background-color: var(--netdaemon-theme-background-color-card);
        }
      `,
    ];
  }
}
