import type { HTMLAttributes, ReactNode } from "react";
import "./Badge.css";

export type BadgeTone = "neutral" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, className = "", tone = "neutral", ...props }: BadgeProps) {
  return (
    <span className={`dui-badge dui-badge--${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
