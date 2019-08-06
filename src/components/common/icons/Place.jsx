import React from "react";
import { colors } from "../styleVars";

export const Place = ({ cragName }) => {
  return (
    <svg
      aria-labelledby="crag name"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill={colors.red}
    >
      <title id="crag name" lang="en">
        This climb is at: {cragName}
      </title>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};
