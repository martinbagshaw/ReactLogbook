import * as d3 from "d3";

import { LogType, SettingsInt } from "../../../utils/types";
import { handlePrimaryDate } from "./handlePrimaryDate";
import { handleSecondaryDate } from "./handleSecondaryDate";

// should handle chart data from all types of filter settings and chart clicks
const dataController = (settings: SettingsInt, logs: LogType[]) => {
  const { type, date } = settings;
  const hasFilter = Object.values(settings).find(i => i.filter);

  // top level
  if (type === "date" && !hasFilter) {
    return handlePrimaryDate(date.cumulative, logs);
  }

  // 2nd level
  if (type === "date" && hasFilter) {
    return handleSecondaryDate(hasFilter.filter, logs);
  }
  return;

  // if (type === "date" && hasFilter.filter.day) {
  //   return console.log('single day, no chart things');
  // }
};

export const createChartData = (settings: SettingsInt, logs: LogType[]) => {
  const piechartData = dataController(settings, logs);
  if (piechartData) {
    const createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null);

    return createPie(piechartData);
  }
  return;
};
