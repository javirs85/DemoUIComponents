import type { FunctionComponent, SVGProps } from "react";

import Amplifier from "../../Icons/SVG/Amplifier.svg?react";
import Analyze from "../../Icons/SVG/Analyze.svg?react";
import Cancel from "../../Icons/SVG/Cancel.svg?react";
import Chain from "../../Icons/SVG/Chain.svg?react";
import ChevronDown from "../../Icons/SVG/Chevron_Down.svg?react";
import ChevronLeft from "../../Icons/SVG/Chevron_left.svg?react";
import ChevronRight from "../../Icons/SVG/Chevron_right.svg?react";
import ChevronUp from "../../Icons/SVG/Chevron_Up.svg?react";
import Cloud from "../../Icons/SVG/Cloud.svg?react";
import Connected from "../../Icons/SVG/Connected.svg?react";
import Contract from "../../Icons/SVG/Contract.svg?react";
import CornersOut from "../../Icons/SVG/CornersOut.svg?react";
import Dash from "../../Icons/SVG/Dash.svg?react";
import DeleteX from "../../Icons/SVG/DeleteX.svg?react";
import Deploy from "../../Icons/SVG/Deploy.svg?react";
import Design from "../../Icons/SVG/Design.svg?react";
import Disconnected from "../../Icons/SVG/Disconnected.svg?react";
import Dots from "../../Icons/SVG/Dots.svg?react";
import Error from "../../Icons/SVG/Error.svg?react";
import Exclamation from "../../Icons/SVG/Exclamation.svg?react";
import FocusDoublePanel from "../../Icons/SVG/FocusDoublePanel.svg?react";
import Green from "../../Icons/SVG/Green.svg?react";
import LPClose from "../../Icons/SVG/LP_Close.svg?react";
import LPOpen from "../../Icons/SVG/LP_Open.svg?react";
import Logo from "../../Icons/SVG/Logo.svg?react";
import MCP from "../../Icons/SVG/MCP.svg?react";
import Metadata from "../../Icons/SVG/Metadata.svg?react";
import Orange from "../../Icons/SVG/Orange.svg?react";
import Output from "../../Icons/SVG/Output.svg?react";
import Paradigm from "../../Icons/SVG/Paradigm.svg?react";
import Plot from "../../Icons/SVG/Plot.svg?react";
import Plus from "../../Icons/SVG/Plus.svg?react";
import Proccess from "../../Icons/SVG/Proccess.svg?react";
import Red from "../../Icons/SVG/Red.svg?react";
import RPClose from "../../Icons/SVG/RP_Close.svg?react";
import RPOpen from "../../Icons/SVG/RP_Open.svg?react";
import Runner from "../../Icons/SVG/Runner.svg?react";
import Tick from "../../Icons/SVG/Tick.svg?react";
import TryAgain from "../../Icons/SVG/TryAgain.svg?react";
import Warning from "../../Icons/SVG/Warning.svg?react";

export type SvgComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export const iconMap = {
  Amplifier,
  Analyze,
  Cancel,
  Chain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Connected,
  Contract,
  CornersOut,
  Dash,
  DeleteX,
  Deploy,
  Design,
  Disconnected,
  Dots,
  Error,
  Exclamation,
  FocusDoublePanel,
  Green,
  LPClose,
  LPOpen,
  Logo,
  MCP,
  Metadata,
  Orange,
  Output,
  Paradigm,
  Plot,
  Plus,
  Proccess,
  Red,
  RPClose,
  RPOpen,
  Runner,
  Tick,
  TryAgain,
  Warning,
} satisfies Record<string, SvgComponent>;
