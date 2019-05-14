import React, { useState } from "react";
import { Search } from "./Search.jsx";
import { LogbookNav } from "./LogbookNav.jsx";
import { LogbookAscents } from "./LogbookAscents.jsx";

import { ContainerStyle } from "../styles/mainView";

// TODO:
// - think about what needs to go into global context
// - use mixins with styled components (think of code reuse)
// - click events for logs / ascents
export const Logbook = ({ logs }) => {
  const [search, setSearch] = useState({
    placeholder: "Search by Climb or Crag name...",
    searchTerm: "",
    results: [],
  });

  const [range, setRange] = useState({ low: 0, high: 50 });

  function handleSearch(value) {
    const resultsFind = (value, logs) => {
      if (value.length < 3) return;
      return logs.filter(log => {
        const regex = new RegExp(value, "gi");
        const cl = log.climbName.toString();
        const cr = log.cragName.toString();
        return cl.match(regex) || cr.match(regex);
      });
    };
    const placeholder = value.length > 0 ? "" : "Search by Climb or Crag name...";
    return setSearch({ placeholder, searchTerm: value, results: resultsFind(value, logs) });
  }

  function handleRangeChange({ low, high }) {
    return setRange({ low, high });
  }

  return (
    <ContainerStyle>
      <Search {...search} onChange={e => handleSearch(e.target.value)} />
      <LogbookNav {...range} logs={logs} onClick={handleRangeChange} />
      <LogbookAscents {...range} logs={logs} />
    </ContainerStyle>
  );
};
