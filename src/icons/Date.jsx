import React from "react";
import { colors } from "../styles/styleVars";

export const Date = ({ date }) => {
  return (
    <svg
      aria-labelledby="date"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill={colors.darkGrey}
    >
      <title id="date" lang="en">
        Climbed on: {date}
      </title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  );
};
