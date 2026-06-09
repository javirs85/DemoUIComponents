import "./Electrode.css";

export interface ElectrodeProps {
  label: string;
  open?: boolean;
  onClick?: () => void;
}

export function Electrode({ label, open = false, onClick }: ElectrodeProps) {
  return (
    <button
      aria-label={label}
      className={`dui-electrode ${open ? "dui-electrode--open" : "dui-electrode--closed"}`}
      onClick={onClick}
      title={label}
      type="button"
    >
      <span className="dui-electrode__label">{label}</span>
    </button>
  );
}
