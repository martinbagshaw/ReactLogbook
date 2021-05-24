import { InputLogType, LogType } from "./types";

import sourceData from "../data/mb-logbook.json";
import { getDate } from "./get-date";
import { getDateNew } from "./get-date-new";
import { getDiscipline } from "./get-discipline";

const formatData = (rawData: InputLogType[]): LogType[] => {
  const ret: LogType[] = [];
  rawData.forEach((item, index: number) => {
    ret.push({
      climbName: item["Climb name"],
      cragName: item["Crag name"],
      date: getDate(item.Date),
      dateNew: getDateNew(item.Date),
      discipline: getDiscipline(item.Grade, item.Style),
      grade: `${item.Grade}`.replace(/\*+$/, "").trim(),
      index: `ascent-${index}`,
      notes: item.Notes,
      partners: item["Partner(s)"] || "climbed alone / no partner listed",
      style: `${item.Style}`.replace(/&beta;|_/, "flash"),
      key: `ascent-${index}`,
    });
  });
  return ret;
};

const allLogs = formatData(sourceData);
export { allLogs };
