import { LogType, SettingsInt } from "../../../utils/types";
import { months } from "../../../utils/constants";

// filter should be DateEnum
export const handleSecondaryDate = (filter: SettingsInt, logs: LogType[]) => {
  const filterCount: number = Object.keys(filter).length;

  // part 1: filter logs
  const filterLogs = (filterLength: number, filter: SettingsInt, logs: LogType[]) => {
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
    return newLogs;
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
        const entry = formatted.find(i => i.monthLong === monthLong.label);
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
  const filteredData = filterLogs(filterCount, filter, logs);
  const createdData = createData(filterCount, filter, filteredData);
  const sortedData = formatAndSort(filterCount, filter, createdData);
  return sortedData;
};
