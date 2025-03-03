import { render } from "preact";
import { useEffect, useState } from "preact/hooks";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Hello World {count}</div>;
};

const root = document.getElementById("app");

if (root != null) {
  render(<App />, root);
} else {
  throw new Error("Root element not found");
}
