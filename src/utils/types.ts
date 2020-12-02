import { OptionTypeBase } from "react-select";

export type Breakpoints =
  | "XXsmall"
  | "Xsmall"
  | "small"
  | "tablet"
  | "large"
  | "Xlarge"
  | "massive";

export interface CategoryInt extends OptionTypeBase {
  value: string;
  label: string;
}

type ChartTypeData = {
  itemFilter: string;
  keyLabel: string[];
  tooltipLabel: string;
  value: number;
};

export type ChartType = {
  data: ChartTypeData;
  endAngle: number;
  index: number;
  padAngle: number;
  startAngle: number;
  value: number;
};

export type DateType = {
  year: string;
  yearInt?: string;
  month: string;
  monthLong: string;
  monthInt?: string;
  day: string;
  dayLong?: string;
};

type DisciplineValues =
  | "alpine"
  | "boulder"
  | "dws"
  | "ice"
  | "mixed"
  | "none"
  | "sport"
  | "summit"
  | "trad"
  | "unknown"
  | "winter";
type DisciplineLabels =
  | "Alpine"
  | "Boulder Problem"
  | "Deep Water Solo"
  | "Ice"
  | "Mixed / dry tool"
  | "None found"
  | "Sport"
  | "Summit walk"
  | "Trad"
  | "Unable to determine"
  | "Winter climb";

export type DisciplineType = {
  value: DisciplineValues;
  label: DisciplineLabels;
};

type DefaultDates = "Year" | "Month";
type DefaultDisciplines = "Bouldering" | "Ice" | "Mixed" | "Sport" | "Trad";
type DefaultGrades = "Low" | "High"; // order low to high
type DefaultPartners = string | undefined;
type DefaultStyles = "Dnf" | "Dogged" | "Flashed" | "Onsight" | "Redpoint";

export type FilterType = {
  day: string;
  month: string;
  year: string;
};

export type InputLogType = {
  "Climb name": string;
  "Crag name": string;
  Date: string;
  Grade: string;
  Notes?: string;
  "Partner(s)"?: string;
  Style: string;
};

export type LogType = {
  climbName: string;
  cragName: string;
  date: DateType;
  discipline: DisciplineType;
  grade: string;
  key: string;
  notes?: string;
  partners: string;
  style: string;
};

export type MonthType =
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

export type GradeType = {
  difficulty: string;
  band: string;
};
type GradeOptionTypes =
  | "Grade"
  | "none"
  | "M, D, VD, HVD, S, 1, 2, 2a, 2b, 2c, 3, 3a, 3b, 3c, 4a, 4b, 4c, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, n1, n2, n3, n4, f1, f2, f2+, f3, f3+, VB, V0-, V0, I, II, WI-1, WI-2"
  | "HS, MVS, VS, HVS, 5a, 5b, 5c, 6a, 6a+, 5.7, 5.8, 5.9, 5.10a, 5.10b, 5.10c, n5-, n5, n5+, f4, f4+, V0+, V1, V2, III, IV, WI-3, WI-4"
  | "E1, E2, E3, 6b, 6b+, 6c, 6c+, 7a, 5.10d, 5.11a, 5.11b, 5.11c, 5.11d, n6-, n6, n6+, f5, f5+, V3, V4, V5, V6, f6A, f6A+, V, VI, WI-5"
  | "E4, E5, E6, E7, E8, E9, E10, E11, E12, 7a+, 7b, 7b+, 7c, 7c+, 8a, 8a+, 8b, 8b+, 8c, 8c+, 9a, 9a+, 9b, 9b+, 9c, 5.12a, 5.12b, 5.12c, 5.12d, 5.13a, 5.13b, 5.13c, 5.13d, 5.14a, n7-, n7, n7+, n8-, n, n8+, f6B, f6B+, f6C, f6C+, f7A, f7A+, f7B, f7B+, f7C, f7C+, f8A, V7, V8, V9, V10, V11, V12, V13, V14, V15, VII, VIII, IX, X, WI-6, WI-7";
export type GradeTypes = {
  [key in GradeOptionTypes]: GradeType;
};

export type LogbookType = "cragName" | "date" | "grade" | "partners" | "style";
export type LogbookIconsType = LogbookType | "chevron" | "comment";

export type SearchType = {
  placeholder: string;
  results: LogType[] | void | undefined;
  searchTerm: string;
};

export type SettingsType = "date" | "discipline" | "grade" | "partners" | "style";
export interface SettingsInt {
  date: { cumulative: DefaultDates };
  discipline: { cumulative: DefaultDisciplines };
  grade: { cumulative: DefaultGrades };
  partners: { cumulative: DefaultPartners };
  style: { cumulative: DefaultStyles };
  type: SettingsType;
}
