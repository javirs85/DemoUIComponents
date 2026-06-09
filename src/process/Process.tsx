import { useRef, useState } from "react";
import { Icon, IconButton, ObjectList, ObjectListItem, Panel, SelectField, SwitchField, TextField, TopBar } from "../components";
import type { ObjectListMarker, TopBarNavItem, TopBarStatusItem } from "../components";
import "./process.css";

const PANEL_ANIM_MS = 160; // keep in sync with transition duration in process.css

const navItems: TopBarNavItem[] = [
  { id: "design", label: "Design", iconName: "Design" },
  { id: "process", label: "Process", iconName: "Proccess" },
  { id: "analyze", label: "Analyze", iconName: "Analyze" },
  { id: "deploy", label: "Deploy", iconName: "Deploy" },
];

const statusItems: TopBarStatusItem[] = [
  { iconName: "Amplifier", ariaLabel: "Amplifier", badge: "success" },
  { iconName: "Cloud", ariaLabel: "Cloud sync", badge: "warning" },
  { iconName: "Runner", ariaLabel: "Runner", badge: "danger" },
  { iconName: "MCP", ariaLabel: "MCP", badge: "success" },
];

type Item = { id: string; marker: ObjectListMarker; title: string; subtitle?: string };

const classItems: Item[] = [
  { id: "c1", marker: "warning", title: "NoClass", subtitle: "Substatus" },
  { id: "c2", marker: "danger",  title: "EyesOpen", subtitle: "Substatus" },
  { id: "c3", marker: "success", title: "EyesClosed" },
  { id: "c4", marker: "success", title: "FreeRun" },
];
const triggerItems: Item[] = [
  { id: "t1", marker: "success", title: "nonTargetTrigger" },
  { id: "t2", marker: "success", title: "TargetTrigger" },
  { id: "t3", marker: "success", title: "CharacterStart" },
  { id: "t4", marker: "success", title: "SequenceFinished" },
];
const signalItems: Item[] = [
  { id: "s1", marker: "success", title: "Alpha Power" },
  { id: "s2", marker: "success", title: "Beta Power" },
  { id: "s3", marker: "warning", title: "Theta Power", subtitle: "unmapped" },
];
const metaItems: Item[] = [
  { id: "m1", marker: "success", title: "Subject ID" },
  { id: "m2", marker: "success", title: "Session Date" },
  { id: "m3", marker: "warning", title: "Device Serial", subtitle: "unused" },
  { id: "m4", marker: "success", title: "Sampling Rate" },
];
const amplifierItems: Item[] = [
  { id: "a1", marker: "success", title: "BCI Core 8" },
  { id: "a2", marker: "success", title: "250 Hz" },
  { id: "a3", marker: "success", title: "8 channels" },
];
const layoutItems: Item[] = [
  { id: "l1", marker: "success", title: "Fz" },
  { id: "l2", marker: "success", title: "Cz" },
  { id: "l3", marker: "success", title: "P3" },
  { id: "l4", marker: "success", title: "Pz" },
  { id: "l5", marker: "success", title: "P4" },
  { id: "l6", marker: "success", title: "PO7" },
  { id: "l7", marker: "success", title: "Oz" },
  { id: "l8", marker: "success", title: "PO8" },
];
const resultsetItems: Item[] = [
  { id: "r1", marker: "success", title: "Average Alpha Power" },
  { id: "r2", marker: "danger",  title: "Relaxation Score", subtitle: "Missing mapping" },
  { id: "r3", marker: "warning", title: "Alpha Asymmetry Index", subtitle: "Widget not selected" },
];
const realtimeItems: Item[] = [
  { id: "rt1", marker: "success", title: "Raw EEG" },
  { id: "rt2", marker: "success", title: "Alpha Power 8–12 Hz" },
  { id: "rt3", marker: "warning", title: "Alpha Asymmetry (C3–C4)", subtitle: "unmapped" },
];

function renderItem(i: Item) {
  return <ObjectListItem marker={i.marker} subtitle={i.subtitle} title={i.title} />;
}
function getKey(i: Item) { return i.id; }
function getMarker(i: Item) { return i.marker; }

function startResize(
  e: React.MouseEvent,
  currentWidth: number,
  setWidth: (w: number) => void,
  direction: 1 | -1,
) {
  e.preventDefault();
  const startX = e.clientX;
  const startW = currentWidth;
  const onMove = (ev: MouseEvent) => {
    const delta = (ev.clientX - startX) * direction;
    setWidth(Math.max(140, Math.min(700, startW + delta)));
  };
  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function WarningPopoverButton() {
  const [visible, setVisible] = useState(false);
  const issues = [
    { tone: "warning", text: "NoClass — needs substatus" },
    { tone: "danger",  text: "EyesOpen — needs substatus" },
    { tone: "warning", text: "Theta Power — unmapped" },
    { tone: "warning", text: "Device Serial — unused" },
    { tone: "danger",  text: "Relaxation Score — missing mapping" },
    { tone: "warning", text: "Alpha Asymmetry — widget not selected" },
  ];
  return (
    <div
      className="proc-warning-wrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button className="proc-warning-btn" type="button">
        <Icon name="Warning" size={16} />
      </button>
      {visible && (
        <div className="proc-warning-popover">
          <p className="proc-warning-popover__heading">Contract issues</p>
          {issues.map((issue) => (
            <div className="proc-warning-popover__row" key={issue.text}>
              <Icon name={issue.tone === "danger" ? "Error" : "Warning"} size={12} />
              <span>{issue.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const POPUP_WIDTH = 320;
const POPUP_MAX_HEIGHT = 520;

function WidgetPopup({ anchor, onClose }: { anchor: DOMRect; onClose: () => void }) {
  // Position to the left of the anchor; fall back to right if not enough room
  const spaceLeft = anchor.left - 8;
  const left = spaceLeft >= POPUP_WIDTH
    ? anchor.left - POPUP_WIDTH - 8
    : anchor.right + 8;
  const top = Math.min(
    anchor.top,
    window.innerHeight - POPUP_MAX_HEIGHT - 8,
  );

  return (
    <>
      {/* transparent click-catcher */}
      <div className="proc-popup-catcher" onClick={onClose} />
      <div
        className="proc-widget-popup"
        onClick={(e) => e.stopPropagation()}
        style={{ left, top, width: POPUP_WIDTH }}
      >
        <div className="proc-widget-popup__header">
          <span className="proc-widget-popup__title">Widget</span>
          <IconButton onClick={onClose} variant="ghost">
            <Icon name="Cancel" size={14} />
          </IconButton>
        </div>
        <div className="proc-widget-popup__body">
          <div className="proc-widget-popup__section">
            <p className="proc-widget-popup__section-label">WIDGET TYPE</p>
            <SelectField label="Scope">
              <option>EEG Scope</option>
              <option>Power Spectrum</option>
              <option>Time Series</option>
              <option>Heatmap</option>
            </SelectField>
          </div>
          <div className="proc-widget-popup__section">
            <p className="proc-widget-popup__section-label">CONNECTED NODE</p>
            <SelectField label="Output item">
              <option>Raw EEG</option>
              <option>Alpha Power 8–12 Hz</option>
              <option>Filtered EEG</option>
              <option>Alpha Asymmetry (C3–C4)</option>
            </SelectField>
          </div>
          <div className="proc-widget-popup__section">
            <p className="proc-widget-popup__section-label">DISPLAY</p>
            <TextField defaultValue="0.1" label="Scaling" type="number" />
            <SelectField label="Color scheme">
              <option>Spectral</option>
              <option>Cool</option>
              <option>Warm</option>
              <option>Monochrome</option>
            </SelectField>
            <SwitchField defaultChecked label="Show grid" />
            <SwitchField defaultChecked label="Show cursor" />
          </div>
        </div>
        <div className="proc-widget-popup__footer">
          <button className="proc-widget-popup__btn proc-widget-popup__btn--ghost" onClick={onClose} type="button">Cancel</button>
          <button className="proc-widget-popup__btn proc-widget-popup__btn--primary" type="button">Save</button>
        </div>
      </div>
    </>
  );
}

const widgets = [
  { title: "Raw EEG",              color: "#22c55e", units: "+/- 10uV", img: "/src/Images/Widget (1).png" },
  { title: "Alpha Power 8\u201312 Hz",   color: "#818cf8", units: "uV\xb3/Hz",  img: "/src/Images/Widget (2).png" },
  { title: "Alpha Asymmetry (C3\u2013C4)", color: "#f97316", units: "%",       img: "/src/Images/Widget (3).png" },
  { title: "Filtered EEG",         color: "#f97316", units: "+/- 10uV", img: "/src/Images/Widget (4).png" },
];

export function Process() {
  const [leftWidth, setLeftWidth] = useState(280);
  const [rightWidth, setRightWidth] = useState(455);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);
  const savedLeftWidth = useRef(280);
  const savedRightWidth = useRef(455);

  const [popupAnchor, setPopupAnchor] = useState<DOMRect | null>(null);
  const openWidgetPopup = (e: React.MouseEvent) => setPopupAnchor(e.currentTarget.getBoundingClientRect());
  const closeWidgetPopup = () => setPopupAnchor(null);

  const collapseLeft = () => {
    savedLeftWidth.current = leftWidth;
    setIsAnimating(true);
    setIsLeftCollapsed(true);
    setTimeout(() => setIsAnimating(false), PANEL_ANIM_MS);
  };
  const restoreLeft = () => {
    setIsAnimating(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsLeftCollapsed(false);
        setLeftWidth(savedLeftWidth.current);
      });
    });
    setTimeout(() => setIsAnimating(false), PANEL_ANIM_MS);
  };
  const collapseRight = () => {
    savedRightWidth.current = rightWidth;
    setIsAnimatingRight(true);
    setIsRightCollapsed(true);
    setTimeout(() => setIsAnimatingRight(false), PANEL_ANIM_MS);
  };
  const restoreRight = () => {
    setIsAnimatingRight(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsRightCollapsed(false);
        setRightWidth(savedRightWidth.current);
      });
    });
    setTimeout(() => setIsAnimatingRight(false), PANEL_ANIM_MS);
  };
  return (
    <div className="proc-shell" data-theme="dark">
      <TopBar
        activeNavId="process"
        fileName="Relaxation Alpha Study"
        fileStatus="success"
        navItems={navItems}
        onNavChange={(id) => {
          if (id === "design") window.location.href = "/studio.html";
        }}
        statusItems={statusItems}
        userInitials="MP"
      />

      <div className="proc-body">
        {/* ── Left panel: The contract ── */}
        <div
          className={`proc-clip${isAnimating ? " proc-clip--transitioning" : ""}`}
          style={{ width: isLeftCollapsed ? 0 : leftWidth }}
        >
          <div className="proc-panel proc-panel--left" style={{ width: leftWidth }}
          >
          <Panel
            icon={<Icon name="Contract" size={20} />}
            title="The contract"
            actions={
              <IconButton onClick={collapseLeft} variant="outlined">
                <Icon name="LPClose" size={24} />
              </IconButton>
            }
          >
            <div className="proc-panel__scroll">
              <div className="proc-section">
                <h3 className="proc-section__title">Definitions</h3>
                <ObjectList collapsible defaultOpen={false} heading="Class ID" items={classItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
              </div>
              <div className="proc-section">
                <h3 className="proc-section__title">Control</h3>
                <ObjectList collapsible defaultOpen={false} heading="Triggers" items={triggerItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
                <ObjectList collapsible defaultOpen={false} heading="Control Signals" items={signalItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
              </div>
              <div className="proc-section">
                <h3 className="proc-section__title">Metadata</h3>
                <ObjectList collapsible defaultOpen={false} heading="Metadata" items={metaItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
              </div>
              <div className="proc-section">
                <h3 className="proc-section__title">Acquisition</h3>
                <ObjectList collapsible defaultOpen={false} heading="Amplifier" items={amplifierItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
                <ObjectList collapsible defaultOpen={false} heading="Layout" items={layoutItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
              </div>
              <div className="proc-section">
                <h3 className="proc-section__title">Outputs</h3>
                <ObjectList collapsible defaultOpen={false} heading="Resultset Members" items={resultsetItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
                <ObjectList collapsible defaultOpen={false} heading="Realtime Outputs" items={realtimeItems} getKey={getKey} getMarker={getMarker} renderItem={renderItem} />
              </div>
            </div>
          </Panel>
          </div>
        </div>

        <div
          className={`proc-resize-handle${isLeftCollapsed ? " proc-resize-handle--hidden" : ""}`}
          onMouseDown={(e) => startResize(e, leftWidth, setLeftWidth, 1)}
        />

        {/* ── Center panel: pipeline canvas ── */}
        <div className="proc-panel proc-panel--center">
          <Panel
            icon={
              isLeftCollapsed ? (
                <div className={`proc-header-prefix${isAnimating ? " proc-header-prefix--no-events" : ""}`}>
                  <IconButton onClick={restoreLeft} variant="outlined">
                    <Icon name="Contract" size={20} />
                  </IconButton>
                  <WarningPopoverButton />
                  <Icon name="Proccess" size={20} />
                </div>
              ) : (
                <Icon name="Proccess" size={20} />
              )
            }
            title="Alpha extraction"
            actions={
              <div className={`proc-zoom${isAnimatingRight ? " proc-zoom--no-events" : ""}`}>
                <div className="proc-zoom__group">
                  <IconButton variant="ghost">
                    <Icon name="Dash" size={16} />
                  </IconButton>
                  <span className="proc-zoom__label">100%</span>
                  <IconButton variant="ghost">
                    <Icon name="Plus" size={16} />
                  </IconButton>
                </div>
                <IconButton variant="outlined">
                  <Icon name="CornersOut" size={20} />
                </IconButton>
                {isRightCollapsed && (
                  <IconButton onClick={restoreRight} variant="outlined">
                    <Icon name="Plot" size={20} />
                  </IconButton>
                )}
              </div>
            }
          >
            {null}
          </Panel>
        </div>

        <div
          className={`proc-resize-handle${isRightCollapsed ? " proc-resize-handle--hidden" : ""}`}
          onMouseDown={(e) => startResize(e, rightWidth, setRightWidth, -1)}
        />

        {/* ── Right panel: Widgets ── */}
        <div
          className={`proc-clip${isAnimatingRight ? " proc-clip--transitioning" : ""}`}
          style={{ width: isRightCollapsed ? 0 : rightWidth }}
        >
          <div className="proc-panel proc-panel--right" style={{ width: rightWidth }}
          >
          <Panel
            icon={<Icon name="Plot" size={20} />}
            title="Widgets"
            actions={
              <>
                <button className="proc-add-widget" onClick={openWidgetPopup} type="button">
                  <Icon name="Plus" size={16} />
                  <span>Add Widget</span>
                </button>
                <IconButton onClick={collapseRight} variant="outlined">
                  <Icon name="RPClose" size={24} />
                </IconButton>
              </>
            }
          >
            {/* widget list */}
            <div className="proc-widgets">
              {widgets.map((w) => (
                <div className="proc-widget" key={w.title}>
                  <div className="proc-widget__header">
                    <span className="proc-widget__dot" style={{ background: w.color }} />
                    <span className="proc-widget__title">{w.title}</span>
                    <span className="proc-widget__units">{w.units}</span>
                    <IconButton onClick={openWidgetPopup} variant="ghost">
                      <Icon name="Dots" size={16} />
                    </IconButton>
                  </div>
                  <div className="proc-widget__body">
                    <img alt={w.title} className="proc-widget__img" src={w.img} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: playback & status ── */}
      <div className="proc-bottom">
        <div className="proc-playback">
          <button className="proc-playback__btn" title="Reset" type="button">
            <Icon name="TryAgain" size={16} />
          </button>
          <button className="proc-playback__btn proc-playback__btn--primary" title="Run" type="button">
            <Icon name="Runner" size={16} />
            <span>Run</span>
          </button>
          <button className="proc-playback__btn" title="Stop" type="button">
            <Icon name="Cancel" size={16} />
          </button>
        </div>

        <div className="proc-timeline">
          <div className="proc-timeline__bar">
            <div className="proc-timeline__fill" style={{ width: "0%" }} />
          </div>
        </div>

        <div className="proc-status">
          <span className="proc-status__time">00:00:00</span>
          <span className="proc-status__divider" />
          <span className="proc-status__label">EEG Quality</span>
          <div className="proc-quality">
            <div className="proc-quality__bar proc-quality__bar--ok" />
            <div className="proc-quality__bar proc-quality__bar--ok" />
            <div className="proc-quality__bar proc-quality__bar--ok" />
            <div className="proc-quality__bar proc-quality__bar--warn" />
            <div className="proc-quality__bar" />
          </div>
        </div>
      </div>

      {popupAnchor && <WidgetPopup anchor={popupAnchor} onClose={closeWidgetPopup} />}
    </div>
  );
}
