/* formatData.js
 * - format raw data, then cache it (TODO)
 * - id relates to entry in logbook order
 */

import { months } from "./constants.js";

const twoDigitYear = new Date()
  .getFullYear()
  .toString()
  .substr(2);

const processMonthYear = (month, year, retObj) => {
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

const processDaySuffix = day => {
  const num = parseInt(day);
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

// return an object
const processDate = date => {
  const defaultRes = {
    year: "unknown",
    month: "unknown",
    monthLong: "unknown",
    day: "unknown",
  };
  if (typeof date !== "string") {
    return defaultRes;
  }
  const dateArr = date.split("/");

  // month and year only
  if (dateArr.length === 2) {
    const [month, year] = dateArr;
    const newRes = { ...defaultRes };
    return processMonthYear(month, year, newRes);
  }

  // day, month, and year
  if (dateArr.length === 3) {
    const [day, month, year] = dateArr;
    const newRes = { ...defaultRes };
    if (day && !day.includes("?") && day.length === 2) {
      newRes.day = day;
      newRes.dayLong = processDaySuffix(day);
    }
    return processMonthYear(month, year, newRes);
  }
  return defaultRes;
};

const formatData = rawData => {
  return rawData.map((item, index) => {
    return {
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
    };
  });
};

export { formatData };
