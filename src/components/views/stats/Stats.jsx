import React, { useState } from "react";
import styled from "styled-components";
import { colors, spacing, fontWeight, breakpoint } from "../../common/styleVars";

const StatContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: ${spacing.xLarge} ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: ${spacing.large} 0;
  }
`;

const StatMenu = styled.section`
  display: flex;
  padding-bottom: ${spacing.large};
  margin-bottom: ${spacing.large};
  justify-content: space-between;
  align-items: center;
  > div:nth-child(1) {
    padding: ${spacing.small} ${spacing.med};
    border-bottom: ${spacing.xSmall} solid ${colors.black};
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
  }
  strong {
    font-weight: ${fontWeight.bold};
  }
  select {
    margin-left: ${spacing.med};
  }
`;

const Stats = ({ logs }) => {
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

export default Stats;
