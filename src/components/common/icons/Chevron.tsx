import React, { FC } from "react";

interface Degree {
  [key: string]: number;
}
interface Props {
  direction?: string;
  fill?: string;
  title?: string;
  width?: string;
}

const Chevron: FC<Props> = ({
  title = "Arrow",
  width = 48,
  fill = "#000000",
  direction = "right",
}): JSX.Element => {
  const degree: Degree = {
    left: 180,
    right: 0,
    up: -90,
    down: 90,
  };
  const arrowDirection = `rotate(${degree[direction]}deg)`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      style={{
        width,
        transform: arrowDirection,
        transformOrigin: "50% 50%",
      }}
    >
      <title>{title}</title>
      <path fill={fill} d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
    </svg>
  );
};

export default Chevron;
