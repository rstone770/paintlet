export function useResizeObserver(
  target: HTMLElement,
  onResize: (entry: ResizeObserverEntry) => void,
  delay = 100
) {
  let timeout: number | null = null;

  const observer = new ResizeObserver((entries) => {
    if (entries.length === 0) return;

    if (timeout != null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      onResize(entries[0]);
    }, delay);
  });

  observer.observe(target);

  return () => {
    observer.disconnect();

    if (timeout != null) {
      clearTimeout(timeout);
    }
  };
}
