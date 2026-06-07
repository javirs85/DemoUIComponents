import type { InputHTMLAttributes, ReactNode } from "react";
import "./TextField.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
}

export function TextField({
  className = "",
  description,
  error,
  id,
  label,
  ...props
}: TextFieldProps) {
  const inputId = id ?? `dui-field-${String(label).toLowerCase().replace(/\W+/g, "-")}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <label className={`dui-text-field ${className}`.trim()} htmlFor={inputId}>
      <span className="dui-text-field__label">{label}</span>
      <input
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={Boolean(error) || undefined}
        className="dui-text-field__input"
        id={inputId}
        {...props}
      />
      {description ? (
        <span className="dui-text-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {error ? (
        <span className="dui-text-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
