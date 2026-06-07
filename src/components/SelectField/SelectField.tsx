import type { ReactNode, SelectHTMLAttributes } from "react";
import "./SelectField.css";

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
}

export function SelectField({
  children,
  className = "",
  description,
  error,
  id,
  label,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? `dui-select-${String(label).toLowerCase().replace(/\W+/g, "-")}`;
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <label className={`dui-select-field ${className}`.trim()} htmlFor={selectId}>
      <span className="dui-select-field__label">{label}</span>
      <span className="dui-select-field__control">
        <select
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={Boolean(error) || undefined}
          className="dui-select-field__select"
          id={selectId}
          {...props}
        >
          {children}
        </select>
        <span aria-hidden="true" className="dui-select-field__chevron" />
      </span>
      {description ? (
        <span className="dui-select-field__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {error ? (
        <span className="dui-select-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
