import React, { useState } from "react";

// import ReactDOM from "react-dom";
// import * as d3 from "d3";
import Pie from "./PieChart.jsx";
import { groupByYear } from "../../../utils/dateGrouping";

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

// const PieChart = styled(Pie)`
//   width: 600px;
//   height: 600px;
// `;

// todo:
// 1. filter functions to get aggregates:
// - discipline
// - grade
// - date (day / month / year)
const Stats = ({ logs }) => {
  // main stat selection dropdown
  // - currently saves a string from dropdown to state
  // - use this to show different charts
  const [option, setOption] = useState({
    selected: "Date",
  });

  // have something to decide which filter to use, based on current state
  // - currently hardcoded to use logs by year
  // - want to get colour coded key from d3 somehow
  const currentData = groupByYear(logs);

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
      <div>
        <Pie data={currentData} width={500} height={500} innerRadius={120} outerRadius={200} />
      </div>
    </StatContainer>
  );
};

export default Stats;
