import { useId, useMemo, useState, type ReactNode } from "react";
import "./ComboBox.css";

export interface ComboBoxOption {
  label: string;
  value: string;
}

export interface ComboBoxProps {
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
  onChange?: (value: string) => void;
  options: ComboBoxOption[];
  placeholder?: string;
  value?: string;
}

export function ComboBox({
  className = "",
  defaultOpen = false,
  defaultValue = "",
  description,
  error,
  label,
  onChange,
  options,
  placeholder = "Select an option",
  value,
}: ComboBoxProps) {
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue),
    [currentValue, options],
  );
  const fieldId = `dui-combobox-${generatedId}`;
  const listboxId = `${fieldId}-listbox`;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={`dui-combobox ${className}`.trim()} data-open={isOpen || undefined}>
      <span className="dui-combobox__label" id={`${fieldId}-label`}>
        {label}
      </span>
      <span className="dui-combobox__control">
        <button
          aria-controls={listboxId}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={Boolean(error) || undefined}
          aria-labelledby={`${fieldId}-label ${fieldId}-value`}
          className="dui-combobox__button"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span
            className={selectedOption ? "dui-combobox__value" : "dui-combobox__placeholder"}
            id={`${fieldId}-value`}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <span aria-hidden="true" className="dui-combobox__chevron" />
        </button>
        {isOpen ? (
          <div className="dui-combobox__popover">
            <ul
              aria-labelledby={`${fieldId}-label`}
              className="dui-combobox__list"
              id={listboxId}
              role="listbox"
            >
              {options.map((option) => {
                const isSelected = option.value === currentValue;

                return (
                  <li
                    aria-selected={isSelected}
                    className="dui-combobox__option"
                    key={option.value}
                    onClick={() => {
                      setInternalValue(option.value);
                      onChange?.(option.value);
                      setIsOpen(false);
                    }}
                    role="option"
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </span>
      {description ? (
        <span className="dui-combobox__description" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {error ? (
        <span className="dui-combobox__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
