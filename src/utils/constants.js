const defaultSettings = {
  type: "Date", // grade, discipline, style, crag
  date: { cumulative: "Year" },
  grade: { cumulative: "Low" }, // low to high. Tricky to show in a pie chart
  discipline: { cumulative: "Trad" }, // Sport, Bouldering, Mixed, etc. => grade low to high
  style: { cumulative: "Onsight" }, // Flashed, Worked, Dogged, Did not finish
  partners: { cumulative: undefined }, // most climbed with by default
};

const months = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export { defaultSettings, months };
