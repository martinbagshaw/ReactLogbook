import React, { FC, Fragment, useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { ValueType } from "react-select";

import { CategoryInt, FilterType, LogType, SettingsInt } from "../../utils/types";

import { defaultSettings, months } from "../../utils/constants";

import { StatsContextProvider } from "./StatsContext";
import StatsHeader from "./StatsHeader";
import PieChart from "./PieChart";
import Legend from "./Legend";
import { breakpoint } from "../common/styleVariables";

const StatContainer = styled.div<{isHidden: boolean}>`
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
// - getChartData takes setting state and logs
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

// BUG:
// - clicking from chart to log view (disappearing stuff)

const handleCumulativeDate = (dateType, logs) => {
  const search = dateType.toLowerCase();

  const createData = (monthOrYear, logs) => {
    const newLogs = [...logs];
    const res = newLogs.reduce((r, { date }) => {
      let label = date[monthOrYear];
      if (monthOrYear === "month") {
        label = (months[label] && months[label].text) || "unknown";
      }
      if (!r[label]) {
        r[label] = { label, value: 1 };
      } else {
        r[label].value++;
      }
      return r;
    }, {});
    return res;
  };

  const formatAndSort = (monthOrYear, logsObj) => {
    const newLogs = { ...logsObj };
    if (monthOrYear === "month") {
      const valid = Object.values(months).map(({ text }) => {
        const { label, value } = newLogs[text];
        const monthAbbr = Object.keys(months).find(key => months[key].text === label);
        return {
          keyLabel: [`${label}:`, `${value} climbs`],
          itemFilter: monthAbbr,
          tooltipLabel: `${value} climbs in ${label}`,
          value,
        };
      });
      const invalid = Object.values(newLogs).find(i => i.label === "unknown");
      const { value } = invalid;
      const unknown = {
        keyLabel: ["Unknown:", `${value} climbs`],
        tooltipLabel: `${value} climbs on an unknown date`,
        value,
      };
      return invalid ? valid.concat(unknown) : valid;
    }
    return Object.values(newLogs).map(i => {
      const { label, value } = i;
      return {
        keyLabel: [`${label}:`, `${value} climbs`],
        itemFilter: label,
        tooltipLabel: `${value} climbs in ${label}`,
        value,
      };
    });
  };

  const createdData = createData(search, logs);
  const sortedData = formatAndSort(search, createdData);
  return sortedData;
};

const handleFilteredDate = (filter, logs) => {
  const filters = Object.keys(filter).length;

  // part 1: filter logs
  const filterLogs = (filterLength, filter, logs) => {
    const { month, year } = filter;
    const newLogs = [...logs];
    if (filterLength === 1) {
      // year and cumulative month
      return newLogs.filter(i => {
        if (month) {
          return i.date["month"] === month;
        }
        return i.date["year"] === year;
      });
    }
    if ([2, 3].includes(filterLength)) {
      // month and day
      return newLogs.reduce((acc, i) => {
        const { day, month, year } = i.date;
        const isMonth = month === filter["month"] && year === filter["year"];
        const isDay = isMonth && day === filter["day"];
        if ((filterLength === 2 && isMonth) || (filterLength === 3 && isDay)) {
          acc.push(i);
        }
        return acc;
      }, []);
    }
  };

  // part 2: create data for chart and key
  const createData = (filterLength, filter, filteredLogs) => {
    const { month: isCumulativeMonth } = filter;
    const newLogs = [...filteredLogs];
    let result;

    // cumulative month, single year
    if (filterLength === 1) {
      result = newLogs.reduce((acc, { date }) => {
        const { dayLong, day, month, monthLong, year } = date;
        let label = `${monthLong} ${year}`;
        if (isCumulativeMonth) {
          label = `${dayLong} ${monthLong}`;
        }
        if (!acc[label]) {
          acc[label] = isCumulativeMonth
            ? { day, dayLong, month, monthLong, label, value: 1 }
            : { month, monthLong, year, value: 1 };
        } else {
          acc[label].value++;
        }
        return acc;
      }, {});
      return Object.values(result);
    }

    // single month and single day
    if ([2, 3].includes(filterLength)) {
      result = newLogs.reduce((acc, { date }) => {
        const { day, dayLong, month, monthLong, year } = date;
        const label = `${dayLong} ${monthLong} ${year}`;
        if (!acc[label]) {
          acc[label] = { day, dayLong, month, monthLong, year, label, value: 1 };
        } else {
          acc[label].value++;
        }
        return acc;
      }, {});
      return Object.values(result);
    }
  };

  // part 3: sort data ascending, format, create labels
  const formatAndSort = (filterLength, filter, formattedData) => {
    const { month: isCumulativeMonth } = filter;
    const formatted = [...formattedData];
    // order ascending
    if ((filterLength === 1 && isCumulativeMonth) || [2, 3].includes(filterLength)) {
      let arr = [];
      for (let day = 0; day < 32; day++) {
        const entry = formatted.find(i => parseInt(i.day) === day);
        if (entry) {
          const { dayLong, month, monthLong, year, value } = entry;
          const keyLabel = [
            `${dayLong} ${monthLong} ${[2, 3].includes(filterLength) ? year : ""}:`,
            `${value} climbs`,
          ];
          const tooltipLabel = `${value} climbs on ${dayLong} ${monthLong} ${
            [2, 3].includes(filterLength) ? year : ""
          }`;
          const res = { keyLabel, tooltipLabel, value };
          if ([2, 3].includes(filterLength)) {
            res.itemFilter = `${year} ${month} ${day}`;
          }
          arr.push(res);
        }
      }
      return arr;
    }
    if (filterLength === 1) {
      // use months object to order by month
      return Object.values(months).reduce((acc, monthLong) => {
        const entry = formatted.find(i => i.monthLong === monthLong.text);
        if (entry) {
          const { month, monthLong, year, value } = entry;
          const keyLabel = [`${monthLong} ${year}:`, `${value} climbs`];
          const tooltipLabel = `${value} climbs in ${monthLong} ${year}`;
          acc.push({ itemFilter: `${year} ${month}`, keyLabel, tooltipLabel, value });
        }
        return acc;
      }, []);
    }
    return formatted;
  };

  // crunch data
  const filteredData = filterLogs(filters, filter, logs);
  const createdData = createData(filters, filter, filteredData);
  const sortedData = formatAndSort(filters, filter, createdData);
  return sortedData;
};

// set pie chart data:
// - filters the settingState to get chart data
const getChartData = (settingState: SettingsInt, logs: LogType[]) => {
  const { type, date } = settingState;
  const hasFilter = Object.values(settingState).find(i => i.filter);
  if (type === "date" && !hasFilter) {
    return handleCumulativeDate(date.cumulative, logs);
  }
  // if (type === "date" && hasFilter.filter.day) {
  //   return console.log('single day, no chart things');
  // }
  if (type === "date" && hasFilter) {
    return handleFilteredDate(hasFilter.filter, logs);
  }
};

type Props = {
  handleSingleDay: (logs: LogType[], filter: FilterType) => void;
  isHidden: boolean;
  logs: LogType[];
};
const Stats: FC<Props> = ({ handleSingleDay, isHidden, logs }) => {
  const [settings, setSettings] = useState<SettingsInt>(defaultSettings);

  // put this in StatsHeader perhaps:
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

    // - works with handleFilteredDate
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

  const { type } = settings;
  const piechartData = getChartData(settings, logs);

  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const chartdata = piechartData ? createPie(piechartData) : null;

  const hasFilter = Object.values(settings).find(i => i.filter);

  // console.log('chartdata', chartdata);
  // console.log('hasFilter', hasFilter)
  console.log('logs', logs)

  // Single day log - probably best remove, as this makes a boring pie chart
  // - change to cut straight to logbook
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

  return (
    <StatsContextProvider>
      <StatContainer isHidden={isHidden}>
        <StatsHeader logs={logs} setDropdown={setDropdown} type={type} />
        <BodySection>
          {chartdata && type === "date" ? (
            <Fragment>
              <PieChart
                chartdata={chartdata}
                width={500}
                height={500}
                innerRadius={120}
                outerRadius={200}
                type={type}
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
