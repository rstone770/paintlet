import { render } from "preact";

const App = () => {
  return <div>Hello World</div>;
};

const root = document.getElementById("app");

if (root != null) {
  render(<App />, root);
} else {
  throw new Error("Root element not found");
}
