import type { HTMLAttributes, ReactNode } from "react";
import { ObjectList } from "../ObjectList";
import type { ObjectListMarker } from "../ObjectList";
import "./Card.css";

// Typed variant for consumer use — preserves item type through callbacks
export interface CardListConfigOf<TItem> {
  addLabel?: ReactNode;
  getKey?: (item: TItem, index: number) => string | number;
  getMarker?: (item: TItem) => ObjectListMarker | undefined;
  heading?: ReactNode;
  items: readonly TItem[];
  onAdd?: () => void;
  onDeleteItem?: (item: TItem, index: number) => void;
  onEditItem?: (item: TItem, index: number) => void;
  renderItem: (item: TItem, actions: ReactNode, index: number) => ReactNode;
}

// Erased variant for use in arrays of heterogeneous list configs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CardListConfig = CardListConfigOf<any>;

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  lists: readonly CardListConfig[];
  title: ReactNode;
}

export function Card({ className = "", lists, title, ...props }: CardProps) {
  const collapsible = lists.length > 1;

  return (
    <section className={`dui-card ${className}`.trim()} {...props}>
      <header className="dui-card__header">
        <h2 className="dui-card__title">{title}</h2>
      </header>
      <div className="dui-card__body">
        {lists.map((list, i) => (
          <ObjectList
            addLabel={list.addLabel}
            collapsible={collapsible}
            defaultOpen
            getKey={list.getKey}
            getMarker={list.getMarker}
            heading={collapsible ? list.heading : undefined}
            items={list.items}
            key={i}
            onAdd={list.onAdd}
            onDeleteItem={list.onDeleteItem}
            onEditItem={list.onEditItem}
            renderItem={list.renderItem}
          />
        ))}
      </div>
    </section>
  );
}
