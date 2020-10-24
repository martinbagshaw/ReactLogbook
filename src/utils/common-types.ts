// Notes is optional on this
type MonthOptions =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

interface DateOptions {
  year: string;
  yearInt?: string;
  month: string;
  monthLong: string;
  monthInt?: string;
  day: string;
  dayLong?: string;
}

interface Date {
  original: string;
  processed: DateOptions;
}

interface OutputObject {
  climbName: string;
  cragName: string;
  date: Date;
  grade: string;
  key: string;
  notes?: string;
  partners: string;
  style: string;
}

interface DefaultSearch {
  placeholder: string;
  results: OutputObject[] | void | undefined;
  searchTerm: string;
}

export { MonthOptions, DateOptions, OutputObject, DefaultSearch };
