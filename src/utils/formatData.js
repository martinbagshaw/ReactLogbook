// change format of climbs data
// - make id relate to entry in logbook order
// const key = (i, data) => data.length - i;
export const formatData = rawData => {
  return rawData.map((item, index) => {
    return {
      climbName: item["Climb name"],
      cragName: item["Crag name"],
      date: item.Date,
      grade: item.Grade,
      notes: item.Notes,
      partners: item["Partner(s)"],
      style: item.Style,
      key: `ascent-${index}`,
    };
  });
};
