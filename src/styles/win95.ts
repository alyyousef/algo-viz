export const win95Styles = `
:root {
  --win95-bg: #C0C0C0;
  --win95-border-dark: #404040;
  --win95-border-mid: #808080;
  --win95-border-light: #fff;
  --win95-accent: #000080;
  --win95-text: #000;
}

.win95-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #d2d2d2 0%, #c0c0c0 45%, #bcbcbc 100%);
  color: var(--win95-text);
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 12px;
  line-height: 1.35;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: var(--win95-text);
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus,
.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: var(--win95-border-light) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-light);
  background: var(--win95-bg);
  box-shadow: inset 0 0 0 1px #b0b0b0;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #000060 0%, #000080 60%, #0000a0 100%);
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: var(--win95-bg);
  border: 2px solid;
  border-color: var(--win95-border-light) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-light);
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: var(--win95-border-dark) var(--win95-border-light) var(--win95-border-light) var(--win95-border-dark);
}

.win95-content {
  padding: 12px;
}

.win95-content > .win95-fieldset:last-of-type {
  margin-bottom: 18px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 8px;
  border: 2px solid;
  border-color: var(--win95-border-light) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-light);
  background: linear-gradient(180deg, #cfcfcf 0%, #bfbfbf 100%);
}

.win95-header-row .win95-subheading {
  font-size: 13px;
}

.win95-header-row .win95-text {
  max-width: 720px;
}

.win95-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px 2px;
  background: var(--win95-bg);
  border: 2px solid;
  border-color: var(--win95-border-light) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-light);
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
  letter-spacing: 0.2px;
  color: var(--win95-text);
  text-decoration: none;
}

.win95-button:active {
  border-color: var(--win95-border-dark) var(--win95-border-light) var(--win95-border-light) var(--win95-border-dark);
}

.win95-fieldset {
  border: 2px solid;
  border-color: var(--win95-border-mid) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-mid);
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 0;
  background: var(--win95-bg);
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
  color: #000060;
}

.win95-grid {
  display: grid;
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
}

.win95-panel {
  border: 2px solid;
  border-color: var(--win95-border-mid) var(--win95-border-light) var(--win95-border-light) var(--win95-border-mid);
  background: var(--win95-bg);
  padding: 8px;
  border-radius: 0;
  box-shadow: inset 0 0 0 1px #cfcfcf;
}

.win95-panel--raised {
  border-color: var(--win95-border-light) var(--win95-border-dark) var(--win95-border-dark) var(--win95-border-light);
  background: linear-gradient(180deg, #cfcfcf 0%, #bfbfbf 100%);
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
  color: #000060;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-hero {
  margin-bottom: 10px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid var(--win95-border-mid);
  padding: 6px 6px 4px;
  text-align: left;
  vertical-align: top;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #d6d6d6;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: var(--win95-border-dark) var(--win95-border-light) var(--win95-border-light) var(--win95-border-dark);
  overflow-x: auto;
  border-radius: 0;
}

.win95-math,
.win95-mono {
  font-family: 'Courier New', monospace;
  font-size: 11px;
}

.win95-note {
  font-size: 11px;
  font-style: italic;
  margin-top: 4px;
}
`
