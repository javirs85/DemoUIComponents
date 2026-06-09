import { useMemo, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";
import "./ObjectList.css";

const markerIconMap: Record<ObjectListMarker, IconName> = {
  neutral: "Dash",
  success: "Green",
  warning: "Warning",
  danger: "Error",
};

const markerSizeMap: Record<ObjectListMarker, number> = {
  neutral: 8,
  success: 8,
  warning: 20,
  danger: 20,
};

const statusIconMap: Record<Exclude<ObjectListMarker, "neutral">, IconName> = {
  success: "Tick",
  warning: "Exclamation",
  danger: "Error",
};

const statusIconWidthMap: Partial<Record<Exclude<ObjectListMarker, "neutral">, number>> = {
  warning: 4,
};

export type ObjectListMarker = "neutral" | "success" | "warning" | "danger";

export interface ObjectListProps<TItem = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  addLabel?: ReactNode;
  children?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  getKey?: (item: TItem, index: number) => string | number;
  getMarker?: (item: TItem) => ObjectListMarker | undefined;
  heading?: ReactNode;
  items?: readonly TItem[];
  onAdd?: () => void;
  onDeleteItem?: (item: TItem, index: number) => void;
  onEditItem?: (item: TItem, index: number) => void;
  renderItem?: (item: TItem, actions: ReactNode, index: number) => ReactNode;
  status?: ReactNode;
}

export interface ObjectListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  actions?: ReactNode;
  icon?: ReactNode;
  marker?: ObjectListMarker;
  subtitle?: ReactNode;
  title: ReactNode;
  variant?: "plain" | "surface";
}

export interface ObjectListAddActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface StatusSummaryProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  tone?: Exclude<ObjectListMarker, "neutral">;
}

export interface ObjectListRowActionsProps extends HTMLAttributes<HTMLSpanElement> {
  onDelete?: () => void;
  onEdit?: () => void;
}

export function ObjectList<TItem = unknown>({
  addLabel,
  children,
  className = "",
  collapsible = false,
  defaultOpen = true,
  getKey,
  getMarker,
  heading,
  items,
  onAdd,
  onDeleteItem,
  onEditItem,
  renderItem,
  status,
  ...props
}: ObjectListProps<TItem>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const derivedStatus = useMemo(() => {
    if (status !== undefined || !getMarker || !items?.length) return null;
    const counts = { success: 0, warning: 0, danger: 0 };
    for (const item of items) {
      const m = getMarker(item);
      if (m === "success") counts.success++;
      else if (m === "warning") counts.warning++;
      else if (m === "danger") counts.danger++;
    }
    const pills = (["success", "warning", "danger"] as const)
      .filter((tone) => counts[tone] > 0)
      .map((tone) => <StatusSummary count={counts[tone]} key={tone} tone={tone} />);
    return pills.length > 0 ? pills : null;
  }, [items, getMarker, status]);

  const resolvedStatus = status ?? derivedStatus;

  const renderedItems =
    items && renderItem
      ? items.map((item, index) => {
          const actions =
            onEditItem || onDeleteItem ? (
              <ObjectListRowActions
                onDelete={onDeleteItem ? () => onDeleteItem(item, index) : undefined}
                onEdit={onEditItem ? () => onEditItem(item, index) : undefined}
              />
            ) : null;

          return (
            <div className="dui-object-list__rendered-item" key={getKey?.(item, index) ?? index}>
              {renderItem(item, actions, index)}
            </div>
          );
        })
      : children;
  const headingContent = (
    <>
      <span className="dui-object-list__heading-text">{heading}</span>
      {resolvedStatus ? <span className="dui-object-list__status">{resolvedStatus}</span> : null}
    </>
  );

  return (
    <div
      className={`dui-object-list ${className}`.trim()}
      data-has-heading={Boolean(heading) || undefined}
      data-open={isOpen || undefined}
      {...props}
    >
      {heading ? (
        collapsible ? (
          <button
            aria-expanded={isOpen}
            className="dui-object-list__heading dui-object-list__heading-button"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {headingContent}
          </button>
        ) : (
          <div className="dui-object-list__heading">{headingContent}</div>
        )
      ) : null}
      <div aria-hidden={!isOpen} className="dui-object-list__collapse">
        <div className="dui-object-list__collapse-inner">
          <div className="dui-object-list__items">
            {renderedItems}
            {addLabel ? <ObjectListAddAction onClick={onAdd}>{addLabel}</ObjectListAddAction> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ObjectListItem({
  actions,
  className = "",
  icon,
  marker = "neutral",
  subtitle,
  title,
  variant = "plain",
  ...props
}: ObjectListItemProps) {
  return (
    <div className={`dui-object-list-item dui-object-list-item--${variant} ${className}`.trim()} {...props}>
      {icon ? (
        <span className="dui-object-list-item__icon">{icon}</span>
      ) : (
        <span className="dui-object-list-item__marker">
          <Icon name={markerIconMap[marker]} size={markerSizeMap[marker]} />
        </span>
      )}
      <span className="dui-object-list-item__content">
        <span className="dui-object-list-item__title">{title}</span>
        {subtitle ? <span className="dui-object-list-item__subtitle">{subtitle}</span> : null}
      </span>
      {actions ? <span className="dui-object-list-item__actions">{actions}</span> : null}
    </div>
  );
}

export function ObjectListAddAction({
  children,
  className = "",
  type = "button",
  ...props
}: ObjectListAddActionProps) {
  return (
    <button className={`dui-object-list-add ${className}`.trim()} type={type} {...props}>
      <Icon name="Plus" size={20} />
      <span>{children}</span>
    </button>
  );
}

export function StatusSummary({
  className = "",
  count,
  tone = "success",
  ...props
}: StatusSummaryProps) {
  return (
    <span className={`dui-status-summary dui-status-summary--${tone} ${className}`.trim()} {...props}>
      <Icon name={statusIconMap[tone]} size={12} width={statusIconWidthMap[tone]} />
      {typeof count === "number" ? <span>{count}</span> : null}
    </span>
  );
}

export function ObjectListRowActions({
  className = "",
  onDelete,
  onEdit,
  ...props
}: ObjectListRowActionsProps) {
  return (
    <span className={`dui-object-list-row-actions ${className}`.trim()} {...props}>
      {onEdit ? (
        <button aria-label="Edit item" className="dui-object-list-row-actions__button" onClick={onEdit} type="button">
          <Icon name="Dots" size={14} />
        </button>
      ) : null}
      {onDelete ? (
        <button
          aria-label="Delete item"
          className="dui-object-list-row-actions__button"
          onClick={onDelete}
          type="button"
        >
          <Icon name="DeleteX" size={14} />
        </button>
      ) : null}
    </span>
  );
}
