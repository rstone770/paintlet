import { render } from "preact";
import { GridCanvas } from "./GridCanvas/GridCanvas";

const App = () => {
  return <GridCanvas></GridCanvas>;
};

const root = document.getElementById("app");

if (root != null) {
  render(<App />, root);
} else {
  throw new Error("Root element not found");
}
