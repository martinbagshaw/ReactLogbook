const defaultSettings = {
  type: "Date", // grade, discipline, style, crag
  date: { cumulative: "Year" },
  grade: { cumulative: "Low" }, // low to high. Tricky to show in a pie chart
  discipline: { cumulative: "Trad" }, // Sport, Bouldering, Mixed, etc. => grade low to high
  style: { cumulative: "Onsight" }, // Flashed, Worked, Dogged, Did not finish
  partners: { cumulative: undefined }, // most climbed with by default
};

const months = {
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

export { defaultSettings, months };
