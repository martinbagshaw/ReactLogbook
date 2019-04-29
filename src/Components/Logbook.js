// React and Hooks
import React, { useState } from "react";

// Styles
import { ContainerStyle, UlStyle, LiStyle } from "../styles/mainView";

export const Logbook = ({ logs }) => {
  console.log(logs);
  return (
    <ContainerStyle>
      <p>This is the logbook view</p>
      <UlStyle>
        {logs.map(log => (
          <LiStyle key={log.key}>
            {log.climbName}, {log.cragName}:<span>{log.date}</span>
          </LiStyle>
        ))}
      </UlStyle>
    </ContainerStyle>
  );
};
