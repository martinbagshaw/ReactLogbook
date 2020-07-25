import React from "react";

const Chevron = ({ title = "Arrow", width = 48, fill = "#000000", direction = "right" }) => {
  const degree = {
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
