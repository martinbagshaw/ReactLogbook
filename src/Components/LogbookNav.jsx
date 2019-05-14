import React from "react";
import { LogbookNavButton } from "./LogbookNavButton.jsx";

import { BtnContainerStyle } from "../styles/logbookNavStyle";

export const LogbookNav = ({ logs, low, high, onClick }) => {
  return (
    <BtnContainerStyle>
      {high < logs.length && (
        <LogbookNavButton
          onClick={() => onClick({ low: (low += 50), high: (high += 50) })}
          text="older"
        />
      )}
      {low >= 50 && (
        <LogbookNavButton
          onClick={() => onClick({ low: (low -= 50), high: (high -= 50) })}
          text="newer"
        />
      )}
    </BtnContainerStyle>
  );
};
