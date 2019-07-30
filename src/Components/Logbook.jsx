import React, { useState } from "react";
import { Search } from "./Search.jsx";
import { LogbookNav } from "./LogbookNav.jsx";
import { LogbookAscents } from "./LogbookAscents.jsx";
import { LogbookSingleView } from "./LogbookSingleView.jsx";

import { ContainerStyle } from "../styles/mainView";

export const Logbook = ({ logs }) => {
  // search results
  const [search, setSearch] = useState({
    placeholder: "Search by Climb or Crag name...",
    searchTerm: "",
    results: [],
  });

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

  // set results page
  const [range, setRange] = useState({ low: 0, high: 50 });

  function handleRangeChange({ low, high }) {
    return setRange({ low, high });
  }

  // list view or single climb
  const [view, setView] = useState({ selectedLog: "" });

  function handleSingleView(logIndex) {
    const selected = logIndex ? logs.find(i => i.key === logIndex) : "";
    return setView({ selectedLog: selected });
  }

  return (
    <ContainerStyle>
      <Search
        {...search}
        onChange={e => handleSearch(e.target.value)}
        disabled={view.selectedLog !== "" ? true : false}
      />
      {!view.selectedLog && <LogbookNav {...range} logs={logs} onClick={handleRangeChange} />}
      {!view.selectedLog && <LogbookAscents {...range} logs={logs} onClick={handleSingleView} />}
      {view.selectedLog && <LogbookSingleView {...view.selectedLog} onClick={handleSingleView} />}
    </ContainerStyle>
  );
};
