import type { HTMLAttributes, ReactNode } from "react";
import "./Panel.css";

export type PanelLevel = "l1" | "l2";

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  actions?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  level?: PanelLevel;
  title: ReactNode;
}

export function Panel({
  actions,
  children,
  className = "",
  icon,
  level = "l2",
  title,
  ...props
}: PanelProps) {
  return (
    <section className={`dui-panel dui-panel--${level} ${className}`.trim()} {...props}>
      <header className="dui-panel__header">
        <div className="dui-panel__title-group">
          {icon ? <span className="dui-panel__icon">{icon}</span> : null}
          <h2 className="dui-panel__title">{title}</h2>
        </div>
        {actions ? <div className="dui-panel__actions">{actions}</div> : null}
      </header>
      <div className="dui-panel__body">{children}</div>
    </section>
  );
}
