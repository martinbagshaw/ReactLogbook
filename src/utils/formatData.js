// change format of climbs data
// - make id relate to entry in logbook order
// const key = (i, data) => data.length - i;
const formatData = rawData => {
  return rawData.map((item, index) => {
    return {
      climbName: item["Climb name"],
      cragName: item["Crag name"],
      date: item.Date,
      grade: `${item.Grade}`.replace(/\*+$/, "").trim(),
      notes: item.Notes,
      partners: item["Partner(s)"] || "climbed alone / no partner listed",
      style: `${item.Style}`.replace(/&beta;|_/, "flash"),
      key: `ascent-${index}`,
    };
  });
};

export { formatData };
