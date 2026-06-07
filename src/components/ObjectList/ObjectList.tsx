import { useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import "./ObjectList.css";

export type ObjectListMarker = "neutral" | "success" | "warning" | "danger";

export interface ObjectListProps<TItem = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  addLabel?: ReactNode;
  children?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  getKey?: (item: TItem, index: number) => string | number;
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
      {status ? <span className="dui-object-list__status">{status}</span> : null}
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
        <span aria-hidden="true" className={`dui-object-list-item__marker dui-object-list-item__marker--${marker}`} />
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
      <span aria-hidden="true" className="dui-object-list-add__icon">+</span>
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
      <span aria-hidden="true" className="dui-status-summary__icon" />
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
          <span aria-hidden="true" className="dui-object-list-row-actions__icon dui-object-list-row-actions__icon--edit" />
        </button>
      ) : null}
      {onDelete ? (
        <button
          aria-label="Delete item"
          className="dui-object-list-row-actions__button"
          onClick={onDelete}
          type="button"
        >
          <span aria-hidden="true" className="dui-object-list-row-actions__icon dui-object-list-row-actions__icon--trash" />
        </button>
      ) : null}
    </span>
  );
}
