import { OutputObject } from "./types";

import sourceData from "../data/mb-logbook.json";
import { processDate } from "./process-date";

interface InputObject {
  "Climb name": string;
  "Crag name": string;
  "Date": string;
  "Grade": string;
  "Notes"?: string;
  "Partner(s)"?: string;
  "Style": string;
}

const formatData = (rawData: InputObject[]): OutputObject[] => {
  const ret: OutputObject[] = [];
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
