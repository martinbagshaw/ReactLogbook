import { LogType } from "../../../utils/types";
import { DateEnum, months } from "../../../utils/constants";

export const handlePrimaryDate = (dateType: DateEnum, logs: LogType[]) => {
  const search = dateType.toLowerCase();

  const createData = (monthOrYear: DateEnum, logs: LogType[]) => {
    const newLogs = [...logs];
    const res = newLogs.reduce((r, { date }) => {
      let label = date[monthOrYear];
      if (monthOrYear === "month") {
        label = (months[label] && months[label].label) || "unknown";
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

  // creates an array from object, adds key label, adds tooltip label
  const formatAndSort = (monthOrYear, logsObj) => {
    const newLogs = { ...logsObj };
    if (monthOrYear === "month") {
      // value is number of the month, not the climbs done in the month
      const completeLogs = Object.entries(months).map(([key, { label }]) => {
        const climbCount = newLogs[label].value;
        return {
          keyLabel: [`${label}:`, `${climbCount} climbs`],
          itemFilter: key,
          tooltipLabel: `${climbCount} climbs in ${label}`,
          value: climbCount,
        };
      });

      const invalidLogs = Object.values(newLogs).find(i => i.label === "unknown");
      const unknown = {
        keyLabel: ["Unknown:", `${invalidLogs.value} climbs`],
        tooltipLabel: `${invalidLogs.value} climbs on an unknown date`,
        value: invalidLogs.value,
      };

      return invalidLogs ? completeLogs.concat(unknown) : completeLogs;
    }

    // when does this return?
    // - thought we just cater to month?
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
