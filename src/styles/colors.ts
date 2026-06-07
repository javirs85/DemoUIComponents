export const darkColors = {
  appBase: "#070B14",
  l2MidPanel: "#0C1322",
  l2Border: "#1B202C",
  l2OperationalWell: "#0C111D",
  l2HeaderSeparator: "#151923",
  l1MainPanel: "#111827",
  l1Stroke: "#252C3B",
  l1OperationalWell: "#1B2232",
  l1HeaderSeparator: "#242834",
  accent1: "#9D91FF",
  accent2: "#513CFB",
  mainText: "#D7DBE4",
  secondaryText: "#A0A7B5",
} as const;

export type DarkColorToken = keyof typeof darkColors;

export const lightColors = {
  appBase: "#F5F7FB",
  l2MidPanel: "#FFFFFF",
  l2Border: "#D9E0EA",
  l2OperationalWell: "#EEF2F7",
  l2HeaderSeparator: "#E4E9F0",
  l1MainPanel: "#FFFFFF",
  l1Stroke: "#D7DDE7",
  l1OperationalWell: "#F1F4F8",
  l1HeaderSeparator: "#E7EBF2",
  accent1: "#5B5CE2",
  accent2: "#4546C9",
  mainText: "#182033",
  secondaryText: "#5D6678",
} as const;

export type LightColorToken = keyof typeof lightColors;

export const semanticTokens = {
  background: "var(--dui-bg-app)",
  surfacePanelL2: "var(--dui-surface-panel-l2)",
  surfacePanelL1: "var(--dui-surface-panel-l1)",
  surfaceField: "var(--dui-surface-field)",
  inputBackground: "var(--dui-input-background)",
  inputTextColor: "var(--dui-input-text-color)",
  inputPlaceholderColor: "var(--dui-input-placeholder-color)",
  inputHelperColor: "var(--dui-input-helper-color)",
  fieldLabelColor: "var(--dui-field-label-color)",
  comboboxOptionHover: "var(--dui-combobox-option-hover)",
  comboboxOptionSelected: "var(--dui-combobox-option-selected)",
  optionButtonBackground: "var(--dui-option-button-background)",
  optionButtonHover: "var(--dui-option-button-background-hover)",
  borderL2: "var(--dui-border-l2)",
  borderL1: "var(--dui-border-l1)",
  accent: "var(--dui-accent)",
  textPrimary: "var(--dui-text-primary)",
  textMuted: "var(--dui-text-muted)",
  textDanger: "var(--dui-text-danger)",
} as const;

export type SemanticToken = keyof typeof semanticTokens;
