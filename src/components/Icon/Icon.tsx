import "./Icon.css";
import { iconMap } from "./iconMap";

export type IconName = keyof typeof iconMap;
export type IconBadge = "success" | "warning" | "danger";

const badgeIconMap: Record<IconBadge, IconName> = {
  success: "Green",
  warning: "Orange",
  danger: "Red",
};

export interface IconProps {
  name: IconName;
  size?: number | string;
  width?: number | string;
  muted?: boolean;
  badge?: IconBadge;
  className?: string;
  "aria-label"?: string;
}

export function Icon({
  name,
  size = 24,
  width,
  muted = false,
  badge,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  const IconSvg = iconMap[name];
  const BadgeSvg = badge ? iconMap[badgeIconMap[badge]] : null;

  return (
    <span
      aria-hidden={ariaLabel ? undefined : "true"}
      aria-label={ariaLabel}
      className={`dui-icon${className ? ` ${className}` : ""}`}
      role={ariaLabel ? "img" : undefined}
      style={{ width: width ?? size, height: size }}
    >
      <IconSvg
        className={`dui-icon__svg${muted ? " dui-icon__svg--muted" : ""}`}
        height="100%"
        width="100%"
      />
      {BadgeSvg && (
        <span aria-hidden="true" className="dui-icon__badge">
          <BadgeSvg height="100%" width="100%" />
        </span>
      )}
    </span>
  );
}
