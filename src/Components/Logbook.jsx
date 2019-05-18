import React, { useState } from "react";
import { Search } from "./Search.jsx";
import { LogbookNav } from "./LogbookNav.jsx";
import { LogbookAscents } from "./LogbookAscents.jsx";
import { LogbookSingleView } from "./LogbookSingleView.jsx";

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

  // single view or list view

  // defo:
  // - clicked on result (results index)
  // - use logs

  // maybe:
  // - pass this state to a reducer -> global store
  // - results range (page)
  // - set new scrollHeight, save old scrollHeight
  const [view, setView] = useState({ selectedLog: "" });

  function handleSingleView(logIndex) {
    // do I need to create a copy of logs, or just pick out index?
    // - I am adding to each log with stars, notes etc
    // - will want extra information to be passed in too
    // - new logs (with extra info) will need to reside in a global state
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
