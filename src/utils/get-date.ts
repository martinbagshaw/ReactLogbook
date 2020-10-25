import { DateOptions } from "./common-types";

const getDate = (dateData: DateOptions, desktop: boolean): string => {
  const { day, dayLong, monthInt, monthLong, year, yearInt } = dateData;
  if (desktop) {
    return `${dayLong} ${monthLong} ${year}`;
  }
  return `${day}/${monthInt}/${yearInt}`;
};

export { getDate };
