import React, { FC, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { ValueType } from "react-select";

import { CategoryInt, FilterType, LogType, SettingsInt } from "../../utils/types";
import { defaultSettings, months } from "../../utils/constants";

import { StatsContextProvider } from "./StatsContext";
import { createChartData } from "./stats-utils/createChartData";

import { StatsHeader } from "./StatsHeader";
import PieChart from "./PieChart";
import Legend from "./Legend";

import { breakpoint } from "../common/styleVariables";

const StatContainer = styled.div<{ isHidden: boolean }>`
  width: 50%;
  ${({ isHidden }) => isHidden && `height: 0; opacity: 0`};
`;

const BodySection = styled.section`
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 0;
  }
`;

// TODO:
// Make this easier to reason about, bit by bit
// - draw a diagram / note information flows
// - can the original shape of the data be changed to help?
// ^ less data = less processing
// - cut down on legacy / old stuff

// STRATEGY
// - adding type annotations to below functions could help, but don't get too into it
// - the below functions basically take logs, then format for the chart and tooltips
// - think ahead - how will this work with discipline, partners etc?
// - createChartData takes setting state and logs
// - pie chart is determined outside of this. Do a function that sets the chart type
// - draw diagram / chart, come up with 3-4 scenarios (plot out discipline, styles, partners)
// ^ what gets filtered with what?

// 1. draft flows and filters
// - Date is fine, just filtering date
// - Discipline requires an algorithm to convert grade + style to discipline (do this higher up)
//   - 6a+ 5a and TR/OS = sandstone
//   - default: Show discipline breakdown in pie
//   - add years and months filtering option
// -

// 2. separate out functions, write tests for them

// - Legend and PieChart require this processed data
// ^ look to separate the two, if it makes sense
//   - key doesn't need to know all of the arc points. Just keyLabel, and a range
//   - pie needs to know hover tooltips (keyLabel)

// AFTER:
// - add more 'type'/overall filters (partners, discipline, etc)
// - make filter function more adaptable: handle different data types

// Refactoring:
// - make functions more modular
// - look for patterns and reuse opportunities

type StatsProps = {
  handleSingleDay: (logs: LogType[], filter: FilterType) => void;
  isHidden: boolean;
  logs: LogType[];
};

const Stats: FC<StatsProps> = ({ handleSingleDay, isHidden, logs }) => {
  const [settings, setSettings] = useState<SettingsInt>(defaultSettings);

  // use setSettings instead?
  // better: settings dropdown, filter dropdown

  // function prop<T, K extends keyof T>(obj: T, key: K) {
  //   return obj[key];
  // }
  // extends keyof SettingsInt
  // setDropdown: (type: keyof SettingsInt, item: ValueType<CategoryInt>) => void;
  // setDropdown: (type: keyof SettingsInt, item: ValueType<CategoryInt>) => void;
  const setDropdown = (type: keyof SettingsInt, item: ValueType<CategoryInt>) => {
    const newSettings = { ...defaultSettings };
    const { value } = item;
    if (type !== "type") {
      newSettings[type].cumulative = value;
    } else {
      newSettings[type] = value;
    }
    setSettings(newSettings);
  };

  // prevent single day pie chart from showing
  const setFiltered = (type, data) => {
    // - works with handleSecondaryDate
    // - filters the settings object, used by getChartData
    const newSettings = JSON.parse(JSON.stringify(settings)); // need to deep clone
    const search = type ? type.toLowerCase() : null;
    if (!type || !settings[type] || !settings[type].cumulative) {
      const resetSettings = { ...defaultSettings };
      return setSettings(resetSettings); // reset and return
    }
    const { cumulative, filter } = newSettings[type];
    if (!filter) {
      newSettings[type].filter = {};
    }

    // remove requirement for months data
    const handleDate = (dateSetting, setting, data) => {
      const { itemFilter } = data;
      if (!dateSetting) {
        return;
      }
      if (!itemFilter) {
        return dateSetting;
      }
      // first level, month or year
      const isMonth = Object.keys(months).includes(itemFilter);
      const isYear = parseInt(itemFilter);
      const singleMonth = !isMonth && itemFilter.split(" ").length === 2;
      const singleDay = !isMonth && itemFilter.split(" ").length === 3;
      if (isMonth || isYear) {
        dateSetting.filter[setting] = itemFilter;
      }
      if (singleMonth || singleDay) {
        const [year, month] = itemFilter.split(" ");
        dateSetting.filter[setting] = year;
        dateSetting.filter["month"] = month;
      }
      if (singleDay) {
        const day = itemFilter.split(" ")[2];
        dateSetting.filter["day"] = day;
      }
      return dateSetting;
    };

    const setting = cumulative.toLowerCase();
    switch (search) {
      case "date":
        newSettings[search] = handleDate(newSettings[search], setting, data);
        break;
      default:
        null;
    }
    setSettings(newSettings);
  };

  const hasFilter = Object.values(settings).find(i => i.filter);

  // console.log('chartdata', chartdata);
  // console.log('hasFilter', hasFilter)
  // console.log("logs", logs);

  // Single day log
  // - change to cut straight to logbook
  // - does this by acting on parent state
  // - want to remove the data processing stuff first
  useEffect(() => {
    if (hasFilter?.filter?.day) {
      const newLogs = [...logs];
      const filter = hasFilter.filter;
      const dailyLogs = newLogs.reduce((acc, i) => {
        const { day, month, year } = i.date;
        const isMonth = month === filter["month"] && year === filter["year"];
        // normalise days: can be '04', needs to match to '4'
        const isDay = isMonth && parseInt(day) === parseInt(filter["day"]);
        if (isDay) {
          acc.push(i);
        }
        return acc;
      }, []);
      handleSingleDay(dailyLogs, filter);
    }
  }, [hasFilter]);

  // chart data
  const chartdata = createChartData(settings, logs);

  return (
    <StatsContextProvider>
      <StatContainer isHidden={isHidden}>
        <StatsHeader logs={logs} setDropdown={setDropdown} type={settings.type} />
        <BodySection>
          {chartdata && settings.type === "date" ? (
            <Fragment>
              <PieChart
                chartdata={chartdata}
                width={500}
                height={500}
                innerRadius={120}
                outerRadius={200}
                type={settings.type}
                setFiltered={setFiltered}
              />
              <Legend chartdata={chartdata} settings={settings} />
            </Fragment>
          ) : (
            <p>Only date has been implemented so far...</p>
          )}
        </BodySection>
      </StatContainer>
    </StatsContextProvider>
  );
};

export default Stats;
