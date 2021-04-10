import { LogType } from "../../../utils/types";
import { DateEnum, months } from "../../../utils/constants";

interface PrimaryData {
  keyLabel: string[];
  itemFilter: string;
  tooltipLabel: string;
  value: number;
}

// see DateTypeNewFail. Same as dropdown items
interface CreatedItem {
  label: string;
  value: number;
}

interface CreatedData {
  [key: string]: CreatedItem;
}

export const handlePrimaryDate = (monthOrYear: DateEnum, logs: LogType[]): PrimaryData[] => {
  const createData = (monthOrYear: DateEnum, logs: LogType[]): CreatedData => {
    const newLogs = [...logs];
    const res = newLogs.reduce((r, { date }) => {
      let label = date[monthOrYear]; // key of months
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
  const formatAndSort = (monthOrYear: DateEnum, logsObj: CreatedData) => {
    const newLogs = { ...logsObj };

    // month
    if (monthOrYear === DateEnum.MONTH) {
      const completeLogs = Object.entries(months).map(([key, { label }]) => {
        // number of climbs in one month:
        const climbCount = newLogs[label].value;
        return {
          keyLabel: [`${label}:`, `${climbCount} climbs`],
          itemFilter: key,
          tooltipLabel: `${climbCount} climbs in ${label}`,
          value: climbCount,
        };
      });

      const invalidLogs = Object.values(newLogs).find(i => i.label === "unknown");
      if (invalidLogs?.value) {
        const unknown = {
          keyLabel: ["Unknown:", `${invalidLogs.value} climbs`],
          itemFilter: "",
          tooltipLabel: `${invalidLogs.value} climbs on an unknown date`,
          value: invalidLogs.value,
        };
        return completeLogs.concat(unknown);
      }

      return completeLogs;
    }

    return Object.values(newLogs).map(({ label, value }) => ({
      keyLabel: [`${label}:`, `${value} climbs`],
      itemFilter: label,
      tooltipLabel: `${value} climbs in ${label}`,
      value,
    }));
  };

  const createdData = createData(monthOrYear, logs);
  const sortedData = formatAndSort(monthOrYear, createdData);
  return sortedData;
};
