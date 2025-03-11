import { useEffect } from "preact/hooks";

export const useOnResize = (
  element: HTMLElement | null,
  callback: (entry: ResizeObserverEntry) => void
) => {
  useEffect(() => {
    if (element == null) {
      return;
    }

    const observer = new ResizeObserver((e) => callback(e[0]));
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, callback]);
};
