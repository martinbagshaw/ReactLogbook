import React, { useState, useEffect, Fragment } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import { defaultSettings, months } from "../../../utils/constants.js";
import StatsHeader from "./StatsHeader.jsx";
import PieChart from "./PieChart.jsx";
import Legend from "./Legend.jsx";
import { breakpoint } from "../../common/styleVars";

const StatContainer = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 0;
`;

const BodySection = styled.section`
  padding-bottom: 250px;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 0;
  }
`;

// TODO:
// - cache main chart data for better performance
// - update key and total logs text when drilling down
// - clicking 'out' of the piechart resets
// - more detailed tooltips (handle content drilldown)
// - link to logbook at end of drilldown (e.g. see logs for a particular date)

// - set up a context for nested components to use
// - dropdown styling (probably need to reformat data for this)
// - pie chart more responsive
// - add more 'type'/overall filters (partners, discipline, etc)
// ^ see github issue https://github.com/martinbagshaw/ReactLogbook/issues/23

// TODO (filter function for date):
// - make more adaptable: handle different data types
// - refactor: use a single reduce, if possible
// - new behavior: date click takes you to the logbook, with climbs on that date shown

// dropdown data format may need changing to:
// const dateOptions = {
//   year: { label: "Year", value: "year"},
//   month: { label: "Month", value: "month"}
// }

const handleCumulativeDate = (dateType, logs) => {
  const search = dateType.toLowerCase();

  const createData = (monthOrYear, logs) => {
    const newLogs = [...logs];
    const res = newLogs.reduce((r, { date }) => {
      let label = date.processed[monthOrYear];
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
          return i.date.processed["month"] === month;
        }
        return i.date.processed["year"] === year;
      });
    }
    if ([2, 3].includes(filterLength)) {
      // month and day
      return newLogs.reduce((acc, i) => {
        const { day, month, year } = i.date.processed;
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
        const { dayLong, day, month, monthLong, year } = date.processed;
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
        const { day, dayLong, month, monthLong, year } = date.processed;
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
const getChartData = (settingState, logs) => {
  const { type, date } = settingState;
  const search = type.toLowerCase();
  // find the item with '.filter'
  const hasFilter = Object.values(settingState).find(i => i.filter);
  if (search === "date" && !hasFilter) {
    return handleCumulativeDate(date.cumulative, logs);
  }
  if (search === "date" && hasFilter) {
    return handleFilteredDate(hasFilter.filter, logs);
  }
};

const Stats = ({ handleSingleDay, logs }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const setDropdown = (type, value) => {
    const newSettings = { ...defaultSettings };
    if (type !== "type") {
      newSettings[type].cumulative = value;
    } else {
      newSettings[type] = value;
    }
    setSettings(newSettings);
  };

  const setFiltered = (type, data) => {
    // - works with handleFilteredDate
    // - filters the settings object, used by getChartData
    const newSettings = JSON.parse(JSON.stringify(settings)); // need to deep clone
    const search = type ? type.toLowerCase() : null;
    if (!search || !settings[search] || !settings[search].cumulative) {
      const resetSettings = { ...defaultSettings };
      return setSettings(resetSettings); // reset and return
    }
    const { cumulative, filter } = newSettings[search];
    if (!filter) {
      newSettings[search].filter = {};
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

  // bug: make smoother
  useEffect(() => {
    if (hasFilter?.filter?.day) {
      const newLogs = [...logs];
      const filter = hasFilter.filter;
      const dailyLogs = newLogs.reduce((acc, i) => {
        const { day, month, year } = i.date.processed;
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
    !hasFilter?.filter?.day && (
      <StatContainer>
        <StatsHeader logs={logs} setDropdown={setDropdown} type={type} />
        <BodySection>
          {chartdata && type === "Date" ? (
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
    )
  );
};

export default Stats;
