import React, { useState } from "react";
import { StatContainer, StatMenu } from "../styles/statsView";

export const Stats = ({ logs }) => {
  // main stat selection dropdown
  // - currently saves a string from dropdown to state
  // - use this to show different charts
  const [option, setOption] = useState({
    selected: "Date",
  });

  console.log(logs);

  return (
    <StatContainer>
      <StatMenu>
        <div>
          Total Ascents: <strong>{logs.length}</strong>
        </div>
        <div>
          Stats by:{" "}
          <select onChange={e => setOption({ selected: e.target.value })}>
            <option>Date</option>
            <option>Grade</option>
          </select>
        </div>
      </StatMenu>
      Currently showing stats by {option.selected}
    </StatContainer>
  );
};
