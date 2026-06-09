import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  ComboBox,
  DevicePanel,
  FormGroup,
  FormStack,
  Icon,
  ObjectList,
  ObjectListItem,
  Panel,
  StatusSummary,
  SwitchField,
  TextField,
  TopBar,
} from "../components";
import type { CardListConfig, IconName, ObjectListMarker, TopBarNavItem, TopBarStatusItem } from "../components";
import { iconMap } from "../components/Icon/iconMap";
import { darkColors, lightColors, semanticTokens } from "../styles";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
const tones = ["neutral", "success", "warning", "danger"] as const;
const themes = ["dark", "light"] as const;
const statusOptions = [
  { label: "Planned", value: "planned" },
  { label: "In progress", value: "in-progress" },
  { label: "Complete", value: "complete" },
] as const;
const flowTargetOptions = [
  { label: "Type Selects", value: "type-selects" },
  { label: "Free run auto-loop", value: "free-run-auto-loop" },
  { label: "Exit", value: "exit" },
] as const;
const resultOptions = [
  { label: "Classifier_successful", value: "classifier-successful" },
  { label: "Classifier_error", value: "classifier-error" },
  { label: "Alpha_too_low", value: "alpha-too-low" },
] as const;
const optionRows = ["Is classifier ready", "IsClassifierError", "IsAlphaTooLow"] as const;
const metadataFields = [
  { id: "subject-id", marker: "success", title: "Subject ID" },
  { id: "session-date", marker: "success", title: "Session Date" },
  { id: "device-serial", marker: "warning", subtitle: "unused", title: "Device Serial" },
  { id: "sampling-rate", marker: "success", title: "Sampling Rate" },
] as const;
const triggerFields: Array<{ id: string; marker: ObjectListMarker; title: string; subtitle?: string }> = [
  { id: "noclass", marker: "warning", title: "NoClass", subtitle: "Substatus" },
  { id: "eyesopen", marker: "danger", title: "EyesOpen", subtitle: "Substatus" },
  { id: "eyesclosed", marker: "success", title: "EyesClosed" },
  { id: "freerun", marker: "success", title: "FreeRun" },
];

const sessionFields: Array<{ id: string; marker: ObjectListMarker; title: string }> = [
  { id: "sess-alpha", marker: "success", title: "Session Alpha" },
  { id: "sess-beta", marker: "success", title: "Session Beta" },
];

const controlTriggers: Array<{ id: string; marker: ObjectListMarker; title: string }> = [
  { id: "ct-1", marker: "success", title: "TargetTrigger" },
  { id: "ct-2", marker: "success", title: "NonTargetTrigger" },
];

const controlSignals: Array<{ id: string; marker: ObjectListMarker; title: string; subtitle?: string }> = [
  { id: "cs-1", marker: "success", title: "Alpha Power" },
  { id: "cs-2", marker: "success", title: "Beta Power" },
  { id: "cs-3", marker: "warning", title: "Theta Power", subtitle: "unmapped" },
];

const topBarNavItems: TopBarNavItem[] = [
  { id: "design", label: "Design", iconName: "Design" },
  { id: "process", label: "Process", iconName: "Proccess" },
  { id: "analyze", label: "Analyze", iconName: "Analyze" },
  { id: "deploy", label: "Deploy", iconName: "Deploy" },
];

const topBarStatusItems: TopBarStatusItem[] = [
  { iconName: "Amplifier", ariaLabel: "Amplifier", badge: "success" },
  { iconName: "Cloud", ariaLabel: "Cloud sync", badge: "warning" },
  { iconName: "Runner", ariaLabel: "Runner", badge: "danger" },
  { iconName: "MCP", ariaLabel: "MCP", badge: "success" },
];

export function Workbench() {
  const [theme, setTheme] = useState<(typeof themes)[number]>("dark");
  const [activeNav, setActiveNav] = useState("design");
  const activeColors = theme === "dark" ? darkColors : lightColors;

  return (
    <main className="workbench-shell" data-theme={theme}>
      <div className="workbench-topbar">
        <TopBar
          activeNavId={activeNav}
          fileName="Relaxation Alpha Study"
          fileStatus="success"
          navItems={topBarNavItems}
          onNavChange={setActiveNav}
          onUserClick={() => undefined}
          statusItems={topBarStatusItems}
          userInitials="MP"
        />
      </div>
      <aside className="workbench-sidebar" aria-label="Component navigation">
        <div>
          <p className="workbench-kicker">React workbench</p>
          <h1>Demo UI Components</h1>
        </div>
        <div className="workbench-theme-control" aria-label="Theme">
          {themes.map((themeOption) => (
            <button
              aria-pressed={theme === themeOption}
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              type="button"
            >
              {themeOption}
            </button>
          ))}
        </div>
        <nav>
          <a href="/studio.html" className="workbench-nav-app-link" target="_blank" rel="noreferrer">
            <Icon name="Design" size={12} />
            Open Studio page ↗
          </a>
          <a href="#buttons">Buttons</a>
          <a href="#badges">Badges</a>
          <a href="#forms">Forms</a>
          <a href="#device-panel">Device Panel</a>
          <a href="#cards">Cards</a>
          <a href="#icons">Icons</a>
          <a href="#tokens">Tokens</a>
        </nav>
      </aside>

      <section className="workbench-content">
        <Panel
          actions={<Badge tone="success">ready</Badge>}
          icon={<span aria-hidden="true">#</span>}
          id="buttons"
          title="Buttons"
        >
          <p className="workbench-section-label">Variants</p>
          <div className="workbench-grid">
            {variants.map((variant) => (
              <Panel className="workbench-demo" key={variant} level="l1" title={variant}>
                <div className="workbench-row">
                  {sizes.map((size) => (
                    <Button key={size} size={size} variant={variant}>
                      {size}
                    </Button>
                  ))}
                </div>
                <Button disabled variant={variant}>
                  disabled
                </Button>
              </Panel>
            ))}
          </div>
        </Panel>

        <Panel
          actions={<Badge>component</Badge>}
          icon={<span aria-hidden="true">%</span>}
          id="badges"
          title="Badges"
        >
          <p className="workbench-section-label">Status tones</p>
          <div className="workbench-row">
            {tones.map((tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ))}
          </div>
        </Panel>

        <Panel
          actions={<Badge tone="warning">draft</Badge>}
          className="workbench-forms-panel"
          icon={<span aria-hidden="true">[]</span>}
          id="forms"
          title="Forms"
        >
          <p className="workbench-section-label">Field states</p>
          <div className="workbench-form-grid">
            <Panel className="workbench-field-demo" level="l1" title="Empty input">
              <TextField
                description="Helper text lives with the field and is wired through aria-describedby."
                label="Project name"
                placeholder="Design system"
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Filled input">
              <TextField
                defaultValue="Demo UI Components"
                label="Project name"
                placeholder="Design system"
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Error input">
              <TextField
                defaultValue="du"
                error="Use at least 3 characters."
                label="Token prefix"
                placeholder="dui"
              />
            </Panel>
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Comboboxes</p>
          <div className="workbench-form-grid">
            <Panel className="workbench-field-demo" level="l1" title="Default combo">
              <ComboBox
                description="Uses the same input surface, text, helper and focus tokens."
                label="Status"
                options={[...statusOptions]}
                placeholder="Choose status"
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Selected combo">
              <ComboBox
                defaultOpen
                defaultValue="in-progress"
                label="Status"
                options={[...statusOptions]}
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Error combo">
              <ComboBox
                error="Select a status before continuing."
                label="Status"
                options={[...statusOptions]}
                placeholder="Choose status"
              />
            </Panel>
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Switches</p>
          <div className="workbench-form-grid">
            <Panel className="workbench-field-demo" level="l1" title="Off switch">
              <SwitchField
                description="Compact inline toggle for dense inspector controls."
                label="Clip content"
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="On switch">
              <SwitchField defaultChecked label="Auto layout" />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Disabled switch">
              <SwitchField defaultChecked disabled label="Locked setting" />
            </Panel>
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Form structure</p>
          <div className="workbench-inspector-demo">
            <FormStack>
              <FormGroup>
                <TextField defaultValue="Decision" label="Title" />
              </FormGroup>
              <FormGroup>
                <ComboBox
                  defaultValue="type-selects"
                  label="Continue with"
                  options={[...flowTargetOptions]}
                />
                <ComboBox
                  defaultValue="classifier-successful"
                  label="Store result at"
                  options={[...resultOptions]}
                />
                <SwitchField defaultChecked label="Is branching?" />
              </FormGroup>
              <FormGroup title="Options">
                <ObjectList addLabel="Add Options">
                  {optionRows.map((option) => (
                    <ObjectListItem
                      icon={<Icon name="Output" size={16} />}
                      key={option}
                      title={option}
                      variant="surface"
                    />
                  ))}
                </ObjectList>
              </FormGroup>
            </FormStack>
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Object lists</p>
          <div className="workbench-form-grid">
            <Panel className="workbench-field-demo" level="l1" title="Metadata list">
              <ObjectList
                addLabel="Add Metadata Field"
                getKey={(field) => field.id}
                items={metadataFields}
                onDeleteItem={() => undefined}
                onEditItem={() => undefined}
                renderItem={(field, actions) => (
                  <ObjectListItem
                    actions={actions}
                    marker={field.marker}
                    subtitle={"subtitle" in field ? field.subtitle : undefined}
                    title={field.title}
                  />
                )}
              />
            </Panel>
            <Panel className="workbench-field-demo" level="l1" title="Collapsible list">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                <ObjectList
                  addLabel="Add Class ID"
                  collapsible
                  defaultOpen={false}
                  getKey={(t) => t.id}
                  getMarker={(t) => t.marker}
                  heading="CLASS ID"
                  items={triggerFields}
                  renderItem={(item) => (
                    <ObjectListItem
                      marker={item.marker}
                      subtitle={item.subtitle}
                      title={item.title}
                    />
                  )}
                />
                <ObjectList
                  addLabel="Add Session"
                  collapsible
                  defaultOpen={false}
                  getKey={(t) => t.id}
                  getMarker={(t) => t.marker}
                  heading="SESSIONS"
                  items={sessionFields}
                  renderItem={(item) => (
                    <ObjectListItem
                      marker={item.marker}
                      title={item.title}
                    />
                  )}
                />
              </div>
            </Panel>
          </div>
        </Panel>

        <section id="device-panel">
          <p className="workbench-section-label">Device Panel</p>
          <div className="workbench-row" style={{ alignItems: "flex-start", gap: "2rem" }}>
            <DevicePanel
              title="BCI Device"
              icon={<Icon name="MCP" size={20} />}
              status="connected"
              fields={[
                { label: "Device", value: "BCI Core 8" },
                { label: "Serial number", value: "U8-2024.07.33" },
                { label: "Sampling", value: "250 Hz" },
                { label: "Channels", value: "8 channels" },
                { label: "Battery", value: "82%" },
              ]}
              actionIcon={<Icon name="Disconnected" size={14} />}
              actionLabel="Disconnect"
              onAction={() => undefined}
              trigger={
                <button className="workbench-icon-btn" type="button" aria-label="BCI Device">
                  <Icon name="Connected" size={18} />
                </button>
              }
            />
            <DevicePanel
              title="BCI Device"
              icon={<Icon name="MCP" size={20} />}
              status="disconnected"
              fields={[
                { label: "Device", value: "BCI Core 8" },
                { label: "Last seen", value: "2 min ago" },
              ]}
              actionIcon={<Icon name="Connected" size={14} />}
              actionLabel="Connect"
              onAction={() => undefined}
              trigger={
                <button className="workbench-icon-btn" type="button" aria-label="BCI Device">
                  <Icon name="Disconnected" size={18} />
                </button>
              }
            />
          </div>
        </section>

        <section id="cards">
          <p className="workbench-section-label">Cards</p>
          <div className="workbench-form-grid">
            <Card
              title="Definitions"
              lists={[
                {
                  heading: "CLASS ID",
                  items: triggerFields,
                  getKey: (item) => item.id,
                  getMarker: (item) => item.marker,
                  addLabel: "Add Class ID",
                  renderItem: (item) => (
                    <ObjectListItem marker={item.marker} subtitle={item.subtitle} title={item.title} />
                  ),
                } satisfies CardListConfig,
                {
                  heading: "SESSIONS",
                  items: sessionFields,
                  getKey: (item) => item.id,
                  getMarker: (item) => item.marker,
                  addLabel: "Add Session",
                  renderItem: (item) => (
                    <ObjectListItem marker={item.marker} title={item.title} />
                  ),
                } satisfies CardListConfig,
              ]}
            />
            <Card
              title="Control"
              lists={[
                {
                  heading: "TRIGGERS",
                  items: controlTriggers,
                  getKey: (item) => item.id,
                  getMarker: (item) => item.marker,
                  addLabel: "Add Trigger",
                  renderItem: (item) => (
                    <ObjectListItem marker={item.marker} title={item.title} />
                  ),
                } satisfies CardListConfig,
                {
                  heading: "CONTROL SIGNALS",
                  items: controlSignals,
                  getKey: (item) => item.id,
                  getMarker: (item) => item.marker,
                  addLabel: "Add Signal",
                  renderItem: (item) => (
                    <ObjectListItem marker={item.marker} subtitle={item.subtitle} title={item.title} />
                  ),
                } satisfies CardListConfig,
              ]}
            />
            <Card
              title="Metadata"
              lists={[
                {
                  items: metadataFields,
                  getKey: (item) => item.id,
                  getMarker: (item) => item.marker,
                  addLabel: "Add Metadata Field",
                  renderItem: (item) => (
                    <ObjectListItem
                      marker={item.marker}
                      subtitle={"subtitle" in item ? item.subtitle : undefined}
                      title={item.title}
                    />
                  ),
                } satisfies CardListConfig,
              ]}
            />
          </div>
        </section>

        <Panel
          actions={<Badge tone="neutral">{Object.keys(iconMap).length} icons</Badge>}
          icon={<Icon name="Paradigm" size={16} />}
          id="icons"
          title="Icons"
        >
          <p className="workbench-section-label">All icons</p>
          <div className="workbench-icon-grid">
            {(Object.keys(iconMap) as IconName[]).map((name) => (
              <div className="workbench-icon-item" key={name}>
                <Icon name={name} />
                <span className="workbench-icon-label">{name}</span>
              </div>
            ))}
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Badges</p>
          <div className="workbench-row">
            <Icon name="Runner" badge="success" />
            <Icon name="Runner" badge="warning" />
            <Icon name="Runner" badge="danger" />
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Muted</p>
          <div className="workbench-row" style={{ alignItems: "center" }}>
            <Icon name="Runner" />
            <Icon name="Runner" muted />
            <Icon name="Runner" badge="success" muted />
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">Sizes</p>
          <div className="workbench-row" style={{ alignItems: "center" }}>
            <Icon name="Paradigm" size={16} />
            <Icon name="Paradigm" size={20} />
            <Icon name="Paradigm" size={24} />
            <Icon name="Paradigm" size={32} />
            <Icon name="Paradigm" size={48} />
          </div>
        </Panel>

        <Panel
          actions={<Badge tone="success">reusable</Badge>}
          icon={<span aria-hidden="true">::</span>}
          id="tokens"
          title="Theme Tokens"
        >          <p className="workbench-section-label">Semantic definitions</p>
          <div className="workbench-token-grid">
            {Object.entries(semanticTokens).map(([name, value]) => (
              <Panel className="workbench-token" key={name} level="l1" title={name}>
                <span className="workbench-swatch" style={{ background: value }} />
                <span className="workbench-token-value">{value}</span>
              </Panel>
            ))}
          </div>
          <p className="workbench-section-label workbench-section-label--spaced">
            Active palette
          </p>
          <div className="workbench-token-grid">
            {Object.entries(activeColors).map(([name, value]) => (
              <Panel className="workbench-token" key={name} level="l1" title={name}>
                <span className="workbench-swatch" style={{ backgroundColor: value }} />
                <span className="workbench-token-value">{value}</span>
              </Panel>
            ))}
          </div>
        </Panel>
      </section>
    </main>
  );
}
