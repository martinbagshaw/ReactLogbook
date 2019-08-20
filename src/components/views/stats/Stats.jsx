import React, { Fragment, useState } from "react";

// import ReactDOM from "react-dom";
// import * as d3 from "d3";
import Pie from "./PieChart.jsx";
import { yearFromLog, monthFromLog, dayFromLog, dateGrouping } from "../../../utils/dateGrouping";

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

// todo:
// 1. add labels
// 2. filter functions to filter down by year > month > day when pie is clicked
// 3. control svg styling (colour and position)

const mapDateFunctions = {
  Year: yearFromLog,
  Month: monthFromLog,
  Day: dayFromLog,
};

const Stats = ({ logs }) => {
  // main stat selection dropdown
  // - currently saves a string from dropdown to state
  // - use this to show different charts
  const [option, setOption] = useState("Date"); // discipline, partner, etc.

  const [logsByDate, setLogsByDate] = useState("Year");

  return (
    <StatContainer>
      <StatMenu>
        <div>
          Total Ascents: <strong>{logs.length}</strong>
        </div>
        <div>
          Stats by:{" "}
          <select onChange={e => setOption(e.target.value)}>
            <option>Date</option>
            <option>Grade</option>
          </select>
        </div>
      </StatMenu>
      Currently showing stats by {option}
      {option === "Date" && (
        <Fragment>
          <div>
            <select onChange={e => setLogsByDate(e.target.value)}>
              <option>Year</option>
              <option>Month</option>
              <option>Day</option>
            </select>
          </div>
          <div>
            <Pie
              data={dateGrouping(mapDateFunctions[logsByDate], logs)}
              width={500}
              height={500}
              innerRadius={120}
              outerRadius={200}
            />
          </div>
        </Fragment>
      )}
    </StatContainer>
  );
};

export default Stats;
