import { useState } from "react";
import {
  Card,
  Electrode,
  Icon,
  IconButton,
  ObjectListItem,
  TopBar,
} from "../components";
import type {
  CardListConfig,
  ObjectListMarker,
  TopBarNavItem,
  TopBarStatusItem,
} from "../components";
import "./studio.css";

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

type FieldItem = { id: string; marker: ObjectListMarker; title: string; subtitle?: string };

const definitionsItems: FieldItem[] = [
  { id: "class-1", marker: "warning", title: "NoClass", subtitle: "Substatus" },
  { id: "class-2", marker: "danger", title: "EyesOpen", subtitle: "Substatus" },
  { id: "class-3", marker: "success", title: "EyesClosed" },
  { id: "class-4", marker: "success", title: "FreeRun" },
];

const controlTriggerItems: FieldItem[] = [
  { id: "ct-1", marker: "success", title: "TargetTrigger" },
  { id: "ct-2", marker: "success", title: "NonTargetTrigger" },
  { id: "ct-3", marker: "success", title: "EyesClosed" },
  { id: "ct-4", marker: "success", title: "FreeRun" },
];

const controlSignalItems: FieldItem[] = [
  { id: "cs-1", marker: "success", title: "Alpha Power" },
  { id: "cs-2", marker: "success", title: "Beta Power" },
  { id: "cs-3", marker: "warning", title: "Theta Power", subtitle: "unmapped" },
];

const metadataItems: FieldItem[] = [
  { id: "m-1", marker: "success", title: "Subject ID" },
  { id: "m-2", marker: "success", title: "Session Date" },
  { id: "m-3", marker: "warning", title: "Device Serial", subtitle: "unused" },
  { id: "m-4", marker: "success", title: "Sampling Rate" },
];

const outputItems: FieldItem[] = [
  { id: "o-1", marker: "success", title: "Average Alpha Power" },
  { id: "o-2", marker: "danger", title: "Relaxation Score", subtitle: "Missing mapping" },
  { id: "o-3", marker: "warning", title: "Alpha Asymetry Index", subtitle: "Widget not selected" },
];

const realtimeItems: FieldItem[] = [
  { id: "rt-1", marker: "success", title: "Raw EEG" },
  { id: "rt-2", marker: "success", title: "Alpha Power 8–12 Hz" },
  { id: "rt-3", marker: "warning", title: "Alpha Asymetry (C3–C4)", subtitle: "unmapped" },
];

function fieldList(items: FieldItem[], addLabel?: string): CardListConfig {
  return {
    items,
    addLabel,
    getKey: (i) => i.id,
    getMarker: (i) => i.marker,
    renderItem: (i) => (
      <ObjectListItem marker={i.marker} subtitle={i.subtitle} title={i.title} />
    ),
  };
}

const controlCard: CardListConfig[] = [
  { ...fieldList(controlTriggerItems, "Add Triggers"), heading: "Triggers" },
  { ...fieldList(controlSignalItems), heading: "Control Signals" },
];

function GatherConnector() {
  return (
    <div className="studio-gather">
      <div className="studio-gather__bar">
        <div />
        <div className="studio-gather__bar--left" />
        <div className="studio-gather__bar--right" />
        <div />
      </div>
      <div className="studio-gather__stem">
        <div className="studio-conn-line" />
        <div className="studio-conn-arrowhead" />
      </div>
    </div>
  );
}

function SplitConnector() {
  return (
    <div className="studio-split">
      {/* Row 1: center junction — two curve blocks forming the T-junction with ::before stem */}
      <div className="studio-split__junction">
        <div className="studio-split__curve--left" />
        <div className="studio-split__curve--right" />
      </div>
      {/* Row 2: two arms — ::after arrowheads at outer ends */}
      <div className="studio-split__arms">
        <div className="studio-split__arm--left" />
        <div className="studio-split__arm--right" />
      </div>
    </div>
  );
}

export function Studio() {
  const [activeNav, setActiveNav] = useState("design");
  const [openElectrodes, setOpenElectrodes] = useState(
    () => new Set(["Fz","Cz","P3","Pz","P4","PO7","PO8","Oz"])
  );
  const toggleElectrode = (label: string) =>
    setOpenElectrodes(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  return (
    <div className="studio-shell" data-theme="dark">
      <TopBar
        activeNavId={activeNav}
        fileName="Relaxation Alpha Study"
        fileStatus="success"
        navItems={navItems}
        onNavChange={(id) => {
          if (id === "process") { window.location.href = "/process.html"; return; }
          setActiveNav(id);
        }}
        statusItems={statusItems}
        userInitials="MP"
      />

      <div className="studio-body">
        {/* Left: asset browser */}
        <aside className="studio-left">
          <div className="studio-panel">
            <div className="studio-panel__header">
              <Icon name="Paradigm" size={14} />
              <span className="studio-panel__title">Paradigm</span>
              <button className="studio-panel__action" type="button">
                <Icon name="FocusDoublePanel" size={14} />
              </button>
            </div>

            <div className="studio-asset-tabs">
              <button className="studio-asset-tab studio-asset-tab--active" type="button">
                IMAGES · 10
              </button>
              <button className="studio-asset-tab" type="button">TEXTS · 3</button>
              <button className="studio-asset-tab" type="button">SOUNDS · 4</button>
            </div>

            <div className="studio-asset-grid">
              {["woman2", "triangles", "jungle"].map((name) => (
                <div className="studio-asset-thumb" key={name}>
                  <div className="studio-asset-thumb__img" />
                  <span className="studio-asset-thumb__label">{name}</span>
                </div>
              ))}
              <button className="studio-asset-add" type="button">
                <Icon name="Plus" size={14} />
                <span>Add Image</span>
              </button>
            </div>

            <div className="studio-beats-header">
              <span>BEATS · 5</span>
            </div>
            {["Some beat", "Cool beat", "TargetBeat", "NonTargetBeat", "ThirdBeat"].map((beat, i) => (
              <div className="studio-beat-row" key={beat}>
                <span className="studio-beat-label">{beat}</span>
                <span className="studio-beat-tag">{["T","C","T","N","3"][i]}</span>
                <div className="studio-beat-bar" />
              </div>
            ))}
          </div>
        </aside>

        {/* Right: contract canvas */}
        <main className="studio-canvas">
          {/* ── Row 1: 3 definition cards ── */}
          <div className="studio-card-row">
            <Card
              lists={[fieldList(definitionsItems, "Add Definition")]}
              title="Definitions"
            />
            <Card lists={controlCard} title="Control" />
            <Card
              lists={[fieldList(metadataItems, "Add Metadata Field")]}
              title="Metadata"
            />
          </div>

          {/* ── Gather connector: 3 → 1 ── */}
          <GatherConnector />

          {/* ── Row 2: single processor panel ── */}
          <div className="studio-proc">
            <div className="studio-proc__node">
              <div className="studio-proc__node-head">
                <span className="studio-proc__node-title">Amplifier</span>
              </div>
              <div className="studio-proc__node-body">
                <div className="studio-proc__stat">
                  <span className="studio-proc__stat-label">Device</span>
                  <span className="studio-proc__stat-value">BCI Core 8</span>
                </div>
                <div className="studio-proc__stat">
                  <span className="studio-proc__stat-label">Fs</span>
                  <span className="studio-proc__stat-value">250 Hz</span>
                </div>
                <div className="studio-proc__stat">
                  <span className="studio-proc__stat-label">Channels</span>
                  <span className="studio-proc__stat-value">8</span>
                </div>
                <div className="studio-proc__stat">
                  <span className="studio-proc__stat-label">Electrodes</span>
                  <span className="studio-proc__stat-value">Dry</span>
                </div>
              </div>
              <div className="studio-proc__node-layout-footer">
                Fz Cz P3 Pz P4 PO7 Oz PO8
              </div>
            </div>

            <div className="studio-proc__divider" />

            <div className="studio-proc__node studio-proc__node--layout">
              {[
                ["Fp3","Fp1","Fpz","Fp2","Fp4"],
                ["F5","F3","F1","Fz","F2","F4","F6"],
                ["FT7","FC5","FC3","FC1","FCz","FC2","FC4","FC6","FT8"],
                ["T7","C5","C3","C1","Cz","C2","C4","C6","T8"],
                ["TP7","CP5","CP3","CP1","CPz","CP2","CP4","CP6","TP8"],
                ["P7","P5","P3","P1","Pz","P2","P4","P6","P8"],
                ["PO7","PO3","POz","PO4","PO8"],
                ["O1","Oz","O2"],
              ].map((row, i) => (
                <div className="studio-proc__layout-row" key={i}>
                  {row.map(e => (
                    <Electrode key={e} label={e} open={openElectrodes.has(e)} onClick={() => toggleElectrode(e)} />
                  ))}
                </div>
              ))}
            </div>

            <div className="studio-proc__divider" />

            <div className="studio-proc__node studio-proc__node--accent">
              <div className="studio-proc__node-header">
                <span className="studio-proc__node-title">Alpha Extraction</span>
                <span className="studio-proc__version">v1.0.1</span>
                  <IconButton variant="ghost">
                    <Icon name="Dots" size={12} />
                  </IconButton>
              </div>
              <div className="studio-proc__node-body">
                <div className="studio-proc__warning">
                  <Icon name="Warning" size={14} />
                  <span>Missing settings</span>
                </div>
                <div className="studio-proc__error">
                  <Icon name="Error" size={14} />
                  <span>Missing Output</span>
                </div>
              </div>
              <div className="studio-proc__footer">
                <Icon name="Proccess" size={24} />
                <span>Processing workspace</span>
                <Icon name="ChevronRight" size={24} />
              </div>
            </div>
          </div>

          {/* ── Split connector: 1 → 2 ── */}
          <SplitConnector />

          {/* ── Row 3: 2 output cards ── */}
          <div className="studio-card-row">
            <Card
              lists={[fieldList(outputItems, "Add Result Set Member")]}
              title="Resultset members"
            />
            <Card
              lists={[fieldList(realtimeItems, "Add Real Time Output")]}
              title="Realtime Outputs"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
