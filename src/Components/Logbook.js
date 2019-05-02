import React, { useState } from "react";

import { Button } from "./Button";

import { ContainerStyle, UlStyle, LiStyle, BtnContainerStyle } from "../styles/mainView";

// get first 50 results (Logbook.js) - will be last range from state eventually
export const Logbook = ({ logs }) => {
  // set state, pass initial state in
  const [range, setRange] = useState({ low: 0, high: 50 });

  // range function
  function handleRangeChange(text, { low, high }) {
    switch (text) {
      case "prev": {
        return setRange({ low: low - 50, high: high - 50 });
      }
      case "next": {
        return setRange({ low: low + 50, high: high + 50 });
      }
      default: {
        return setRange({ low, high });
      }
    }
  }

  // get range
  const { low, high } = range;

  return (
    <ContainerStyle>
      <p>This is the logbook view</p>
      <BtnContainerStyle>
        {low >= 50 && <Button onClick={() => handleRangeChange("prev", range)} text="prev" />}
        {high < logs.length && (
          <Button onClick={() => handleRangeChange("next", range)} text="next" />
        )}
      </BtnContainerStyle>
      <UlStyle>
        {logs.slice(low, high).map(log => (
          <LiStyle key={log.key}>
            {log.climbName}, {log.cragName}:<span>{log.date}</span>
          </LiStyle>
        ))}
      </UlStyle>
    </ContainerStyle>
  );
};
