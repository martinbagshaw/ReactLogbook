// for testing
const sampleDates = [
  { date: "28/10/2018" },
  { date: "28/6/2016" },
  { date: "21/4/2018" },
  { date: "23/1/2018" },
];

// const expectedResult = [{ date: 2016, value: 1 }, { date: 2018, value: 3 }];

// const arrayOfYears = logs => {
//   const a = [];
//   logs.map(log => {
//     a.push(yearFromLog(log.date));
//   });
//   return a;
// };

// want to do this with one loop ideally, not two (with the above arrayOfYears map)
// const groupByYear = logs => {
//   logs.reduce((tally, year) => {
//     tally[year] = (tally[yearFromLog(year.date)] || 0) + 1;
//     return tally;
//   }, {});
// };
// const groupByYear = yearsArray => {
//   return yearsArray.reduce((tally, year) => {
//     tally[year] = (tally[year] || 0) + 1;
//     return tally;
//   }, {});
// };

// want an array of objects, not one massive object
// const groupByDay = logs => {
//   return logs.reduce((a, c) => ((a[c.date] = (a[c.date] || 0) + 1), a), {});
// };

// console.log(groupByDay(sampleDates));

// const groupedMap = initialArray => {
//   return initialArray.reduce(
//     (entryMap, e) => entryMap.set(e.date, [...(entryMap.get(e.date) || []), e]),
//     new Map()
//   );
// };

// console.log(groupedMap(sampleDates));

// const yearTally = logs => {
//   logs.reduce((acc, cur) => {
//     if (!acc[cur]) {
//       acc[cur] = 1;
//     } else {
//       acc[cur] = acc[cur] + 1;
//     }
//     return acc;
//   }, {});
// };

// console.log(yearTally(sampleDates));

// 1. get array of years
// 2. reduce to count the number of years
// 3. make into an array of objects that looks like this:
// const expectedResult = [{ date: 2016, value: 1 }, { date: 2018, value: 3 }];

// export { formatData, arrayOfYears, groupByYear, groupByDay };

// const mapFn = array => array.map(i => yearFromLog(i.date));
// console.log(mapFn(sampleDates)); //[ 2018, 2016, 2018, 2018 ]

// const filterFn = array => array.filter(i => i > 2016);

// perhaps use this (adapted from array objects mashup)
// const mapFilter = (mapFn, filterFn, array) => {
//   return array.reduce((acc, cur) => {
//     // if the map function maps the array
//     // run the filter function :
//     // return the accumulator (which won't push to the resulting array)
//     return mapFn(acc) ? acc.concat(filterFn(acc)) : acc;
//   }, []);
// };

// console.log(mapFilter(mapFn, filterFn, sampleDates));
// doesnt work

// approach 2:
// 1. get unique years from logs (filter)
// 2. map unique years, if...

// enter log.date to get year from object
const yearFromLog = logDate =>
  Number(
    logDate
      .split("")
      .reverse()
      .slice(0, 4)
      .reverse()
      .join("")
  );

// https://stackoverflow.com/questions/50746310/how-to-group-an-array-of-objects-by-month-year
// copied code, base calculations on this
// - adapt to pass in day and month functions as well
const groupByYear = logs => {
  const result = logs.reduce((r, { date }) => {
    const year = yearFromLog(date);
    if (!r[year]) r[year] = { date: year, value: 1 };
    else r[year].value++;
    return r;
  }, {});
  return Object.values(result);
};

// console.log(groupByYear(sampleDates));

export { groupByYear };
