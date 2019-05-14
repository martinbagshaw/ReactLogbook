import React from "react";
import { ListStyle, ListButton } from "../styles/logbookListStyle";

export const LogbookAscents = ({ logs, low, high }) => {
  return (
    <ListStyle>
      {logs.slice(low, high).map(log => (
        <li key={log.key}>
          <ListButton>
            <span>{log.climbName}</span>{" "}
            <span>
              {log.grade}, {log.style} - {log.cragName}
            </span>
            <span>
              {log.date}
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
              </svg>
            </span>
          </ListButton>
        </li>
      ))}
    </ListStyle>
  );
};
