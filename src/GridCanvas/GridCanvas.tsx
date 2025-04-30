import { cx } from "@linaria/core";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { useResizeObserver } from "./useResizeObserver";
import * as styles from "./GridCanvas.styles";

type Props = {
  className?: string;
  children?: ComponentChildren;
  onError?: (err: Error) => void;
};

export const GridCanvas = (props: Props) => {
  const { className, children, onError } = props;
  const $root = useRef<HTMLDivElement>(null);
  const [layers, onLayers] = useState<GridCanvasLayers | null>(null);

  useEffect(() => {
    if ($root.current == null) {
      return;
    }

    const $guide = $root.current.querySelector("[data-layer=guide]") as HTMLCanvasElement;
    const $work = $root.current.querySelector("[data-layer=work]") as HTMLCanvasElement;
    const $edit = $root.current.querySelector("[data-layer=edit]") as HTMLCanvasElement;

    if ($guide == null || $work == null || $edit == null) {
      onError?.(new Error("Could not find all canvas layers"));
      return;
    }

    const guide = $guide.getContext("2d");
    const work = $work.getContext("2d");
    const edit = $edit.getContext("2d");

    if (guide == null || work == null || edit == null) {
      onError?.(new Error("Could not get all canvas contexts"));
      return;
    }

    onLayers({
      guide: { element: $guide, context: guide },
      work: { element: $work, context: work },
      edit: { element: $edit, context: edit }
    });
  }, []);

  useResizeObserver($root.current, (entry) => {
    if (layers == null) {
      return;
    }

    const { width, height } = entry.contentRect;
    const { guide, work, edit } = layers;

    for (const layer of [guide, work, edit]) {
      layer.element.width = width;
      layer.element.height = height;
    }
  });

  return (
    <div ref={$root} className={cx(styles.root, className)}>
      <canvas className={styles.layer} data-layer="guide" />
      <canvas className={styles.layer} data-layer="work" />
      <canvas className={styles.layer} data-layer="edit" />
      {layers && (
        <GridCanvasLayersContext.Provider value={layers}>
          {children}
        </GridCanvasLayersContext.Provider>
      )}
    </div>
  );
};

export type CanvasRenderer = {
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export type GridCanvasLayers = {
  guide: CanvasRenderer;
  work: CanvasRenderer;
  edit: CanvasRenderer;
};

const GridCanvasLayersContext = createContext<GridCanvasLayers | null>(null);

export const useGridCanvasLayers = () => {
  const layers = useContext(GridCanvasLayersContext);
  if (layers == null) {
    throw new Error("GridCanvasLayersContext is not defined");
  }

  return layers;
};
