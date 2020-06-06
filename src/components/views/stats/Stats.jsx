import React, { Fragment, useState } from "react";
import Pie from "./PieChart.jsx";
import styled from "styled-components";
import { colors, spacing, breakpoint } from "../../common/styleVars";

const StatContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: ${spacing.xLarge} ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: ${spacing.large} 1rem;
  }
`;

const Header = styled.header`
  display: flex;
  padding-bottom: ${spacing.large};
  margin-bottom: ${spacing.large};
  align-items: center;
`;

const H1 = styled.h1`
  display: inline-block;
  margin-right: 1rem;
  font-size: 1.25rem;
  padding: ${spacing.small} 0;
  border-bottom: ${spacing.xSmall} solid ${colors.black};
`;

const MainControl = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid black;
  padding-left: 1rem;
  margin-left: 1rem;
  select {
    margin-left: ${spacing.med};
  }
`;

const BodySection = styled.section`
  margin-top: 1rem;
  position: relative;
`;

const H2 = styled.h2`
  font-size: 1.25rem;
  margin-right: 2rem;
  strong {
    font-weight: 700;
  }
`;

const FilterControl = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
`;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDateFormat = (type, date) => {
  if (type === "Year") {
    const year = date.split("/")[2];
    const currentYear = new Date()
      .getFullYear()
      .toString()
      .substr(2);
    if (year) {
      return year > currentYear ? `19${year}` : `20${year}`;
    }
    return "unknown";
  }
  if (type === "Month") {
    const month = date.split("/")[1];
    if (months.includes(month)) {
      return month;
    }
    return "unknown";
  }
};

const handleDate = (dateType, logs) => {
  const result = logs.reduce((r, { date }) => {
    const output = getDateFormat(dateType, date);
    if (!r[output]) {
      r[output] = { label: output, value: 1 };
    } else {
      r[output].value++;
    }
    return r;
  }, {});
  const retArray = Object.values(result);

  // sort dates here
  if (dateType === "Month") {
    const validMonths = months.map(i => result[i]);
    const invalidMonths = retArray.find(i => i.label === "unknown");
    return invalidMonths ? validMonths.concat(result["unknown"]) : validMonths;
  }

  return retArray;
};

// TODO:
// - add more main filters
// - nice dropdowns
// - pie chart more responsive
// - pie chart to handle different main values

// 1. date
// - year: needs a tooltip or key, need to process century data somehow
// - month: needs to process text
// - day should be omitted, unless a particular year and month can be selected somehow
// ^ this would be a great feature, requires some extra though / design

// 2. grade
// - omit this (tied into discipline, will not work well with a pie chart overall)

// 3. partner
// - no partner listed = no partner listed text

// 4. discipline
// - comes from grade, tricky to process

// 5. style
// - not set

const getChartData = (settingState, logs) => {
  if (settingState.main === "Date") {
    return handleDate(settingState.date, logs);
  }
};

const defaultSettings = {
  main: "Date", // grade, discipline, style, crag
  date: "Year", // Month, Year and Month => day
  grade: "Low", // low to high. Class discipline this way also. Cant show low to high in a pie chart though
  discipline: "Trad", // Sport, Bouldering, Mixed, etc. => grade low to high
  style: "Onsight", // Flashed, Worked, Dogged, Did not finish
  partners: undefined, // most climbed with by default
};

// set default select options here, e.g.
// const dateOptions = {
//   year: { label: "Year", value: "year"},
//   month: { label: "Month", value: "month"}
// }

const Stats = ({ logs }) => {
  const [settings, setSettings] = useState(defaultSettings);

  // console.log(logs)

  const setItem = (value, type) => {
    const newSettings = { ...settings };
    newSettings[type] = value;
    setSettings(newSettings);
  };

  const piechartData = getChartData(settings, logs);

  const { main } = settings;

  return (
    <StatContainer>
      <Header>
        <H1>
          Total Logs: <strong>{logs.length}</strong>
        </H1>
        <MainControl>
          <p>Stats by:</p>
          <select onChange={e => setItem(e.target.value, "main")}>
            <option>Date</option>
            <option>Discipline</option>
            <option>Style</option>
            <option>Partner(s)</option>
          </select>
        </MainControl>
      </Header>

      {main === "Date" && (
        <Fragment>
          <BodySection>
            <FilterControl>
              <H2>
                Filter <strong>{main}</strong>
              </H2>
              <Controls>
                <select onChange={e => setItem(e.target.value, "date")}>
                  <option>Year</option>
                  <option>Month</option>
                  {/* <option>Day</option> */}
                </select>
              </Controls>
            </FilterControl>
            <Pie data={piechartData} width={500} height={500} innerRadius={120} outerRadius={200} />
          </BodySection>
        </Fragment>
      )}
    </StatContainer>
  );
};

export default Stats;
