/*
 * getDate
 * input: date string in multiple formats, with and without missing date (represented by ??)
 * output:
 * - an object with the below shape. `integer` denotes the order of day / month / year
 * - as `day` and `month` may not be available, `d` and `m` may not be output
 * - `text` property is used for the log list view, e.g. `24/05/2020` or `24th May 2020`
*/
import { months } from "./constants";
import { MonthType } from "./types";

type DatePart = {
  integer: number; //index
  label: string; //long
  value: string; //short
};

type DateType = {
  d?: DatePart;
  m?: DatePart;
  y: DatePart;
  text: { l: string; s: string };
};

type DateTypeFail = {
  label: string;
  value: string;
};

const getYear = (year: string): string => {
  const currentYear = new Date()
      .getFullYear()
      .toString()
      .substr(2);
      return year.length === 4 ? year : year > currentYear ? `19${year}` : `20${year}`;
}

const getMonth = (month: keyof typeof months): DatePart | undefined => {
  if (Object.keys(months).includes(month)) {
    const { label, value } = months[month];
    return { integer: value, label, value: month.toLowerCase() };
  }
  return;
}

const getDay = (day: string): DatePart | undefined => {
  if (/^\?/.test(day) || !parseInt(day)) return;
  const number: number = parseInt(day);

  const t = number % 10;
  const h = number % 100;
  let label = `${number}th`;
  if (t == 1 && h != 11) {
    label = `${number}st`;
  }
  if (t == 2 && h != 12) {
    label = `${number}nd`;
  }
  if (t == 3 && h != 13) {
    label = `${number}rd`;
  }
  const str = number.toString();
  const value = str.length === 2 ? str : `0${str}`;
  return { integer: number, label, value }
}

type TextType = {
  l: string;
  s: string;
}

// long text: reuses calculations from month and day
const getText = (y: string, m?: DatePart, d?: DatePart): TextType => {
  if (y && m && d){
    const str = m.integer.toString();
    const month = str.length === 2 ? str : `0${str}`;
    return {l: `${d.label} ${m.label} ${y}`, s: `${d.value}/${month}/${y}`};
  }
  if (y && m){
    const str = m.integer.toString();
    const month = str.length === 2 ? str : `0${str}`;
    return {l: `${m.label} ${y}`, s: `${month}/${y}`};
  }
  return {l: y, s: y};
}

export const getDateNew = (date?: string): DateType | DateTypeFail => {
  // must end in 2 or more digits, with a slash before
  if (!date || typeof date !== "string" || !/\/[0-9]{2,}$/.test(date)) {
    return { value: "none", label: "None found" };
  }
  const slashCount: number | undefined = date.match(/\//g)?.length;
  if (slashCount === 1) {
    const year = getYear(date.split("/")[1]);
    return {
      y: { integer: parseInt(year), label: year, value: year },
      text: { l: year, s: year },
    };
  }
  
  if (slashCount === 2) {
    const [day, month, year] = <[day: string, month: MonthType, year: string]>date.split("/");
    const y = getYear(year);
    const m = getMonth(month);
    const d = getDay(day);
    const text = getText(y, m, d);
    return {
      d,
      m,
      y: { integer: parseInt(y), label: y, value: y },
      text,
    };
  }

  return { value: "none", label: "None found" };
};
