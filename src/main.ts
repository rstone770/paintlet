import { renderGridCanvas } from "./GridCanvas/GridCanvas";

const root = document.getElementById("app");

if (root != null) {
  const p = renderGridCanvas({});
  root.appendChild(p.node);
} else {
  throw new Error("Root element not found");
}
