import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Workbench } from "./workbench/Workbench";
import "./workbench/workbench.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Workbench />
  </StrictMode>,
);
