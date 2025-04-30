import { css } from "@linaria/core";

export const root = css`
  position: relative;
  width: 100%;
  max-height: 1024px;
  height: 100vh;
  overflow: hidden;
`;

export const layer = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
