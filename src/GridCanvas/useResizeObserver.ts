import { useEffect, useRef } from "preact/hooks";

export function useResizeObserver(
  target: HTMLElement | null,
  onResize: (entry: ResizeObserverEntry) => void,
  delay = 100
) {
  const $onResize = useRef(onResize);

  useEffect(() => {
    $onResize.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (target == null) {
      return;
    }

    let timeout: number | null = null;

    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0) {
        return;
      }

      if (timeout != null) {
        clearTimeout(timeout);
      }

      timeout = window.setTimeout(() => {
        $onResize.current(entries[0]);
      }, delay);
    });

    observer.observe(target);

    return () => {
      observer.disconnect();

      if (timeout != null) {
        clearTimeout(timeout);
      }
    };
  }, [target, delay]);
}
