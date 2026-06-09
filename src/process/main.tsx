import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Process } from "./Process";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Process />
  </StrictMode>,
);
