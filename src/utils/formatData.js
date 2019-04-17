// change format of climbs data
export const formatData = rawData => {
  return rawData.map(item => {
    return {
      climbName: item["Climb name"],
      cragName: item["Crag name"],
      date: item.Date,
      grade: item.Grade,
      notes: item.Notes,
      partners: item["Partner(s)"],
      style: item.Style,
    };
  });
};
