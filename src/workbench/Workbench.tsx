import { useState } from "react";
import {
  Badge,
  Button,
  ComboBox,
  FormGroup,
  FormStack,
  ObjectList,
  ObjectListItem,
  Panel,
  StatusSummary,
  SwitchField,
  TextField,
} from "../components";
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
const triggerFields = ["TargetTrigger", "NonTargetTrigger", "EyesClosed", "FreeRun"] as const;

export function Workbench() {
  const [theme, setTheme] = useState<(typeof themes)[number]>("dark");
  const activeColors = theme === "dark" ? darkColors : lightColors;

  return (
    <main className="workbench-shell" data-theme={theme}>
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
          <a href="#buttons">Buttons</a>
          <a href="#badges">Badges</a>
          <a href="#forms">Forms</a>
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
                      icon={<span aria-hidden="true" className="workbench-option-icon" />}
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
              <ObjectList
                addLabel="Add Triggers"
                collapsible
                heading="Triggers"
                status={<StatusSummary count={2} tone="success" />}
              >
                {triggerFields.map((trigger) => (
                  <ObjectListItem key={trigger} marker="success" title={trigger} />
                ))}
              </ObjectList>
            </Panel>
          </div>
        </Panel>

        <Panel
          actions={<Badge tone="success">reusable</Badge>}
          icon={<span aria-hidden="true">::</span>}
          id="tokens"
          title="Theme Tokens"
        >
          <p className="workbench-section-label">Semantic definitions</p>
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
