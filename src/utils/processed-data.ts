import { InputLogType, LogType } from "./types";

import sourceData from "../data/mb-logbook.json";
import { processDate } from "./process-date";

const formatData = (rawData: InputLogType []): LogType[] => {
  const ret: LogType[] = [];
  rawData.forEach((item, index: number) => {
    ret.push({
      climbName: item["Climb name"],
      cragName: item["Crag name"],
      date: {
        original: item.Date,
        processed: processDate(item.Date),
      },
      grade: `${item.Grade}`.replace(/\*+$/, "").trim(),
      notes: item.Notes,
      partners: item["Partner(s)"] || "climbed alone / no partner listed",
      style: `${item.Style}`.replace(/&beta;|_/, "flash"),
      key: `ascent-${index}`,
    });
  });
  return ret;
};

const allLogs = formatData(sourceData)
export { allLogs };
