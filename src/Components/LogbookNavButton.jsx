import React from "react";

import { BtnStyle } from "../styles/logbookNavStyle";

export const LogbookNavButton = ({ onClick, text }) => {
  return (
    <BtnStyle onClick={onClick} text={text}>
      {text === "older" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z" />
        </svg>
      )}
      {text}
      {text === "newer" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
        </svg>
      )}
    </BtnStyle>
  );
};
