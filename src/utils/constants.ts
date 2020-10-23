// applies to <Stats />
type DateOptions = "Year" | "Month";
type DisciplineOptions = "Bouldering" | "Ice" | "Mixed" | "Sport" | "Trad";
type GradeOptions = "Low" | "High"; // order low to high
type PartnerOptions = string | undefined;
type StyleOptions = "Dnf" | "Dogged" | "Flashed" | "Onsight" | "Redpoint";
type TypeOptions = "Crag" | "Date" | "Discipline" | "Grade" | "Style";

interface DefaultSettings {
  date: { cumulative: DateOptions },
  discipline: { cumulative: DisciplineOptions },
  grade: { cumulative: GradeOptions },
  partners: { cumulative: PartnerOptions },
  style: { cumulative: StyleOptions },
  type: TypeOptions
}

const defaultSettings: DefaultSettings = {
  date: { cumulative: "Year" },
  discipline: { cumulative: "Trad" },
  grade: { cumulative: "Low" },
  partners: { cumulative: undefined },
  style: { cumulative: "Onsight" },
  type: "Date" // make this to lowercase? - how and where does it need conversion?
};

type IntOptions = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type MonthOptionsLong = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
type MonthOptions = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

interface Month {
  text: MonthOptionsLong;
  int: IntOptions;
}

// previously used a Record:
// const months: Record<MonthOptions, Month> = {
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

export { defaultSettings, months, MonthOptions };