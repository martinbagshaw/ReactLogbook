// these could be brought into the main function - disregards year though

// - enter year, then month, then date
const yearFromLog = logDate => Number(logDate.split("/")[2]);
const monthFromLog = logDate => Number(logDate.split("/")[1]);
const dayFromLog = logDate => Number(logDate.split("/")[0]);

// https://stackoverflow.com/questions/50746310/how-to-group-an-array-of-objects-by-month-year
// copied code, base calculations on this
// - adapt to pass in day and month functions as well
// const groupByYear = logs => {
//   const result = logs.reduce((r, { date }) => {
//     const year = yearFromLog(date);
//     if (!r[year]) r[year] = { date: year, value: 1 };
//     else r[year].value++;
//     return r;
//   }, {});
//   return Object.values(result);
// };

const dateGrouping = (dateFunc, logs) => {
  const result = logs.reduce((r, { date }) => {
    const dateType = dateFunc(date);
    if (!r[dateType]) r[dateType] = { date: dateType, value: 1 };
    else r[dateType].value++;
    return r;
  }, {});
  return Object.values(result);
};

export { yearFromLog, monthFromLog, dayFromLog, dateGrouping };
