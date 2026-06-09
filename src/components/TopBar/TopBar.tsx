import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "../Icon";
import type { IconBadge, IconName } from "../Icon";
import "./TopBar.css";

const fileStatusIconMap: Record<"success" | "warning" | "danger", IconName> = {
  success: "Green",
  warning: "Orange",
  danger: "Red",
};

export interface TopBarNavItem {
  iconName: IconName;
  id: string;
  label: ReactNode;
}

export interface TopBarStatusItem {
  ariaLabel?: string;
  badge?: IconBadge;
  iconName: IconName;
  onClick?: () => void;
}

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  activeNavId?: string;
  appName?: ReactNode;
  fileName?: ReactNode;
  fileStatus?: "success" | "warning" | "danger";
  navItems?: TopBarNavItem[];
  onNavChange?: (id: string) => void;
  onUserClick?: () => void;
  statusItems?: TopBarStatusItem[];
  userInitials?: string;
}

export function TopBar({
  activeNavId,
  appName = "UniverseStudio",
  className = "",
  fileName,
  fileStatus,
  navItems = [],
  onNavChange,
  onUserClick,
  statusItems = [],
  userInitials,
  ...props
}: TopBarProps) {
  return (
    <header className={`dui-top-bar ${className}`.trim()} {...props}>
      {/* Left: brand + file */}
      <div className="dui-top-bar__left">
        <div className="dui-top-bar__brand">
          <Icon name="Logo" size={20} />
          <span className="dui-top-bar__app-name">{appName}</span>
        </div>
        {fileName !== undefined ? (
          <>
            <span aria-hidden="true" className="dui-top-bar__divider" />
            <div className="dui-top-bar__file">
              <span className="dui-top-bar__file-name">{fileName}</span>
              {fileStatus ? <Icon name={fileStatusIconMap[fileStatus]} size={8} /> : null}
              <button aria-label="File options" className="dui-top-bar__file-chevron" type="button">
                <Icon name="ChevronDown" size={12} />
              </button>
            </div>
          </>
        ) : null}
      </div>

      {/* Center: nav tabs */}
      <nav aria-label="Main navigation" className="dui-top-bar__center">
        {navItems.map((item) => {
          const selected = item.id === activeNavId;
          return (
            <button
              aria-current={selected ? "page" : undefined}
              className={`dui-top-bar__nav-btn${selected ? " dui-top-bar__nav-btn--selected" : ""}`}
              key={item.id}
              onClick={() => onNavChange?.(item.id)}
              type="button"
            >
              <Icon name={item.iconName} size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: status icons + user */}
      <div className="dui-top-bar__right">
        {statusItems.map((item, i) => (
          <button
            aria-label={item.ariaLabel}
            className="dui-top-bar__icon-btn"
            key={i}
            onClick={item.onClick}
            type="button"
          >
            <Icon badge={item.badge} name={item.iconName} size={20} />
          </button>
        ))}
        {userInitials ? (
          <>
            <button
              aria-label="User menu"
              className="dui-top-bar__user-btn"
              onClick={onUserClick}
              type="button"
            >
              {userInitials}
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}
