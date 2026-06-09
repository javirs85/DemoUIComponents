import { useEffect, useRef, useState, type ReactNode } from "react";
import "./Popover.css";

export interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
}

export function Popover({ children, trigger }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <div className="dui-popover" ref={rootRef}>
      <span className="dui-popover__trigger" onClick={() => setOpen((v) => !v)}>
        {trigger}
      </span>
      <div className="dui-popover__panel" data-open={open || undefined}>
        {children}
      </div>
    </div>
  );
}
