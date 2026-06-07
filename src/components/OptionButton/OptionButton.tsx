import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./OptionButton.css";

export interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function OptionButton({
  children,
  className = "",
  icon,
  type = "button",
  ...props
}: OptionButtonProps) {
  return (
    <button className={`dui-option-button ${className}`.trim()} type={type} {...props}>
      {icon ? <span className="dui-option-button__icon">{icon}</span> : null}
      <span className="dui-option-button__label">{children}</span>
    </button>
  );
}
