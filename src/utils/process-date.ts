

import { MonthOptions, DateOptions } from "./types";
import { months } from "./constants";

type MonthYearInputOptions = "day" | "month" | "monthLong" | "year"
type MonthYearInput = {
  [key in MonthYearInputOptions]: string;
}

// optional properties
interface MonthYearOutput extends MonthYearInput {
  monthInt?: string; 
  yearInt?: string; 
}

const twoDigitYear = new Date()
  .getFullYear()
  .toString()
  .substr(2);
  
const processMonthYear = (month: keyof typeof months, year: string, inputObj: MonthYearInput): MonthYearOutput => {
  const retObj: MonthYearOutput = { ...inputObj };
  if (Object.keys(months).includes(month)) {
    const { text, int } = months[month];
    retObj.month = month;
    retObj.monthLong = text;
    retObj.monthInt = int;
  }
  if (year && !year.includes("?") && year.length === 4) {
    retObj.year = year;
  }
  if (year && !year.includes("?") && year.length === 2) {
    retObj.year = year > twoDigitYear ? `19${year}` : `20${year}`;
  }
  retObj.yearInt = year.slice(0, 2);
  return retObj;
};

const processDaySuffix = (day: string): string => {
  const num: number | 'typeof NaN' = parseInt(day);
  if (!num) {
    return day;
  }
  const t = num % 10;
  const h = num % 100;
  if (t == 1 && h != 11) {
    return `${num}st`;
  }
  if (t == 2 && h != 12) {
    return `${num}nd`;
  }
  if (t == 3 && h != 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};

export const processDate = (date: string): DateOptions => {
  const defaultRes: DateOptions = {
    year: "unknown",
    month: "unknown",
    monthLong: "unknown",
    day: "unknown",
  };
  if (typeof date !== "string") {
    return defaultRes;
  }

  const dateArr: string[] = date.split("/");

  // month and year only
  if (dateArr.length === 2) {
    const [month, year] = <[m: MonthOptions, y: string]>dateArr;
    const newRes = { ...defaultRes };
    return processMonthYear(month, year, newRes);
  }

  // day, month, and year
  if (dateArr.length === 3) {
    const [day, month, year] = <[d: string, m: MonthOptions, y: string]>dateArr;
    const newRes = { ...defaultRes };
    if (day && !day.includes("?") && day.length === 2) {
      newRes.day = day;
      newRes.dayLong = processDaySuffix(day);
    }
    return processMonthYear(month, year, newRes);
  }
  return defaultRes;
};