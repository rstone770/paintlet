import { cx } from "@linaria/core";
import { useResizeObserver } from "./useResizeObserver";
import * as styles from "./GridCanvas.styles";

type Props = {
  className?: string;
};

export interface GridCanvasResult {
  node: HTMLElement;
  dispose: () => void;
}

export const renderGridCanvas = (props: Props): GridCanvasResult => {
  const { className } = props;

  const guide = document.createElement("canvas");
  guide.className = styles.layer;

  const work = document.createElement("canvas");
  work.className = styles.layer;

  const edit = document.createElement("canvas");
  edit.className = styles.layer;

  const node = document.createElement("div");
  node.className = cx(styles.root, className);
  node.append(guide, work, edit);

  const removeResizeObserver = useResizeObserver(node, (entry) => {
    const { width, height } = entry.contentRect;
    guide.width = width;
    guide.height = height;
    work.width = width;
    work.height = height;
    edit.width = width;
    edit.height = height;
  });

  const dispose = () => {
    removeResizeObserver();
    node.remove();
  };

  return { node, dispose };
};
