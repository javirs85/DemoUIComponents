import { useState } from "react";
import { Badge, Button, Panel, TextField } from "../components";
import { darkColors, lightColors, semanticTokens } from "../styles";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
const tones = ["neutral", "success", "warning", "danger"] as const;
const themes = ["dark", "light"] as const;

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
          icon={<span aria-hidden="true">[]</span>}
          id="forms"
          title="Forms"
        >
          <p className="workbench-section-label">Field states</p>
          <div className="workbench-form-grid">
            <Panel level="l1" title="Default input">
              <TextField
                description="Helper text lives with the field and is wired through aria-describedby."
                label="Project name"
                placeholder="Design system"
              />
            </Panel>
            <Panel level="l1" title="Error input">
              <TextField error="Use at least 3 characters." label="Token prefix" placeholder="dui" />
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
