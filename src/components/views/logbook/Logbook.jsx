import React, { useState } from "react";
import Search from "./Search.jsx";
import PageNav from "./PageNav.jsx";
import Results from "./Results.jsx";
import SingleLog from "../singleLog/SingleLog.jsx";

import { ContainerStyle } from "../../common/Layout.jsx";

// todo:
// - handle blur in a way that doesn't interfere with result click (set a timeout?)
// - wait for mouseUp, if not on list button, clear results
// - better: pass in e.target, see if this is NOT a search results button. If so, clear selectedLog
// - try handleSingleView

const Logbook = ({ logs }) => {
  const [search, setSearch] = useState({
    placeholder: "Search by Climb or Crag name...",
    searchTerm: "",
    results: [],
  });
  const [page, setPage] = useState({ low: 0, high: 50 });
  const [singleLog, setSingleLog] = useState(null);

  const handleSearch = value => {
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
  };

  const handlePageChange = ({ low, high }) => {
    return setPage({ low, high });
  };

  const handleSingleView = index => {
    return setSingleLog(logs.find(i => i.key === index));
  };

  return (
    <ContainerStyle>
      <Search
        {...search}
        onChange={e => handleSearch(e.target.value)}
        disabled={singleLog ? true : false}
        onResultClick={handleSingleView}
        // onBlur={() => handleSearch("")}
      />
      {!singleLog && <PageNav {...page} logs={logs} onClick={handlePageChange} />}
      {!singleLog && <Results {...page} logs={logs} onClick={handleSingleView} />}
      {singleLog && <SingleLog {...singleLog} onClick={handleSingleView} />}
    </ContainerStyle>
  );
};

export default Logbook;
