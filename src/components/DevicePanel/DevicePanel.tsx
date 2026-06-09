import type { ReactNode } from "react";
import { Popover } from "../Popover";
import "./DevicePanel.css";

export type DevicePanelStatus = "connected" | "disconnected";

export interface DevicePanelField {
  label: string;
  value: ReactNode;
}

export interface DevicePanelProps {
  actionIcon?: ReactNode;
  actionLabel?: ReactNode;
  fields?: DevicePanelField[];
  icon?: ReactNode;
  onAction?: () => void;
  status?: DevicePanelStatus;
  statusLabel?: ReactNode;
  title: ReactNode;
  trigger: ReactNode;
}

export function DevicePanel({
  actionIcon,
  actionLabel,
  fields,
  icon,
  onAction,
  status,
  statusLabel,
  title,
  trigger,
}: DevicePanelProps) {
  return (
    <Popover trigger={trigger}>
      <div className="dui-device-panel">
        <header className="dui-device-panel__header">
          {icon ? <span className="dui-device-panel__icon">{icon}</span> : null}
          <div className="dui-device-panel__title-group">
            <span className="dui-device-panel__title">{title}</span>
            {status ? (
              <span className={`dui-device-panel__status dui-device-panel__status--${status}`}>
                <span className="dui-device-panel__status-dot" />
                {statusLabel ?? (status === "connected" ? "Connected" : "Disconnected")}
              </span>
            ) : null}
          </div>
        </header>
        {fields && fields.length > 0 ? (
          <div className="dui-device-panel__fields">
            {fields.map((field, i) => (
              <div className="dui-device-panel__field" key={i}>
                <span className="dui-device-panel__field-label">{field.label}</span>
                <span className="dui-device-panel__field-value">{field.value}</span>
              </div>
            ))}
          </div>
        ) : null}
        {onAction ? (
          <div className="dui-device-panel__footer">
            <button className="dui-device-panel__action" onClick={onAction} type="button">
              {actionIcon ? <span className="dui-device-panel__action-icon">{actionIcon}</span> : null}
              {actionLabel}
            </button>
          </div>
        ) : null}
      </div>
    </Popover>
  );
}
