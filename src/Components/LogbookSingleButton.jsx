import React from "react";

import { SingleBtnStyle } from "../styles/singleViewStyle";

// star and notes button
export const LogbookSingleButton = ({ type, title }) => {
  return (
    <SingleBtnStyle type={type} title={title}>
      {type === "star" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      )}
      {type === "notes" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      )}
    </SingleBtnStyle>
  );
};
