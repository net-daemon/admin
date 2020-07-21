import { css } from "lit-element";

export const NetDaemonStyle = css`
  :host {
    --netdaemon-theme-color: #a1029e;
    --netdaemon-theme-color-error: #cf1919;
    --netdaemon-theme-background-color: #f8f8f8;
  }

  .header {
    padding: 12px;
  }

  .subheader {
    padding: 0 8px;
  }

  .back {
    position: absolute;
    top: 0;
    left: 4px;
  }

  .error {
    color: var(--netdaemon-theme-color-error);
  }

  .back iron-icon {
    --iron-icon-width: 32px;
    --iron-icon-height: 32px;
    margin-bottom: 4px;
    margin-right: -16px;
  }

  iron-icon {
    padding: 16px 16px 16px 4px;
  }

  iron-icon,
  .back {
    color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
  }

  paper-item iron-icon {
    color: var(--netdaemon-theme-color);
    opacity: 0.7;
  }

  .dpendencies,
  .header,
  .subheader {
    opacity: 0.75;
  }

  paper-item,
  .back {
    cursor: pointer;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .content {
    margin: auto;
    width: 50%;
    max-width: 600px;
    height: 100vh;
  }

  paper-card {
    width: 100%;
    margin: auto;
    margin-bottom: 16px;
    border-radius: 10px;
    opacity: 0.9;
  }

  mwc-button {
    --mdc-theme-primary: var(--netdaemon-theme-color);
  }

  pre {
    padding: 0 8px 8px;
    white-space: pre-line;
  }
`;
