import { DefaultSettings, MonthOptions, Grades } from "./types";
import { colors } from "../components/common/styleVariables";

const defaultSettings: DefaultSettings = {
  date: { cumulative: "Year" },
  discipline: { cumulative: "Trad" },
  grade: { cumulative: "Low" },
  partners: { cumulative: undefined },
  style: { cumulative: "Onsight" },
  type: "date",
};

type IntOptions = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type MonthOptionsLong =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

interface Month {
  text: MonthOptionsLong;
  int: IntOptions;
}
type Months = { [month in MonthOptions]: Month };
const months: Months = {
  Jan: { text: "January", int: "01" },
  Feb: { text: "February", int: "02" },
  Mar: { text: "March", int: "03" },
  Apr: { text: "April", int: "04" },
  May: { text: "May", int: "05" },
  Jun: { text: "June", int: "06" },
  Jul: { text: "July", int: "07" },
  Aug: { text: "August", int: "08" },
  Sep: { text: "September", int: "09" },
  Oct: { text: "October", int: "10" },
  Nov: { text: "November", int: "11" },
  Dec: { text: "December", int: "12" },
};

const grades: Grades = {
  Grade: {
    difficulty: "not set",
    band: `${colors.darkGrey}`,
  },
  none: {
    difficulty: "not set",
    band: `${colors.darkGrey}`,
  },
  "M, D, VD, HVD, S, 1, 2, 2a, 2b, 2c, 3, 3a, 3b, 3c, 4a, 4b, 4c, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, n1, n2, n3, n4, f1, f2, f2+, f3, f3+, VB, V0-, V0, I, II, WI-1, WI-2": {
    difficulty: "easy",
    band: `${colors.green}`,
  },
  "HS, MVS, VS, HVS, 5a, 5b, 5c, 6a, 6a+, 5.7, 5.8, 5.9, 5.10a, 5.10b, 5.10c, n5-, n5, n5+, f4, f4+, V0+, V1, V2, III, IV, WI-3, WI-4": {
    difficulty: "medium",
    band: `${colors.yellow}`,
  },
  "E1, E2, E3, 6b, 6b+, 6c, 6c+, 7a, 5.10d, 5.11a, 5.11b, 5.11c, 5.11d, n6-, n6, n6+, f5, f5+, V3, V4, V5, V6, f6A, f6A+, V, VI, WI-5": {
    difficulty: "advanced",
    band: `${colors.red}`,
  },
  "E4, E5, E6, E7, E8, E9, E10, E11, E12, 7a+, 7b, 7b+, 7c, 7c+, 8a, 8a+, 8b, 8b+, 8c, 8c+, 9a, 9a+, 9b, 9b+, 9c, 5.12a, 5.12b, 5.12c, 5.12d, 5.13a, 5.13b, 5.13c, 5.13d, 5.14a, n7-, n7, n7+, n8-, n, n8+, f6B, f6B+, f6C, f6C+, f7A, f7A+, f7B, f7B+, f7C, f7C+, f8A, V7, V8, V9, V10, V11, V12, V13, V14, V15, VII, VIII, IX, X, WI-6, WI-7": {
    difficulty: "hard",
    band: `${colors.black}`,
  },
};

export { defaultSettings, months, grades };
