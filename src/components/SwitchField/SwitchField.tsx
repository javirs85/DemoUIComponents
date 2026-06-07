import type { InputHTMLAttributes, ReactNode } from "react";
import "./SwitchField.css";

export interface SwitchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  description?: ReactNode;
  label: ReactNode;
}

export function SwitchField({
  className = "",
  description,
  id,
  label,
  ...props
}: SwitchFieldProps) {
  const switchId = id ?? `dui-switch-${String(label).toLowerCase().replace(/\W+/g, "-")}`;
  const descriptionId = description ? `${switchId}-description` : undefined;

  return (
    <label className={`dui-switch-field ${className}`.trim()} htmlFor={switchId}>
      <span className="dui-switch-field__row">
        <input
          aria-describedby={descriptionId}
          className="dui-switch-field__input"
          id={switchId}
          type="checkbox"
          {...props}
        />
        <span aria-hidden="true" className="dui-switch-field__track">
          <span className="dui-switch-field__thumb" />
        </span>
        <span className="dui-switch-field__label">{label}</span>
      </span>
      {description ? (
        <span className="dui-switch-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
    </label>
  );
}
