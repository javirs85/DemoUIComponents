import type { HTMLAttributes, ReactNode } from "react";
import "./Form.css";

export interface FormStackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface FormGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  title?: ReactNode;
}

export function FormStack({ children, className = "", ...props }: FormStackProps) {
  return (
    <div className={`dui-form-stack ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function FormGroup({ children, className = "", title, ...props }: FormGroupProps) {
  return (
    <div className={`dui-form-group ${className}`.trim()} {...props}>
      {title ? <div className="dui-form-group__title">{title}</div> : null}
      <div className="dui-form-group__items">{children}</div>
    </div>
  );
}
