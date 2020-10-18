import React, { useState, Fragment } from "react";
import Search from "./Search.jsx";
import SearchReset from "./SearchReset.jsx";
import PageNav from "./PageNav.jsx";
import Results from "./Results.jsx";
import SingleLog from "../singleLog/SingleLog.jsx";

import { ContainerStyle } from "../common/Layout.jsx";

const defaultSearch = {
  placeholder: "Search by Climb or Crag name...",
  searchTerm: "",
  results: [],
};

const Logbook = ({ logs }) => {
  const [search, setSearch] = useState({ ...defaultSearch });
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

  const handlePageChange = direction => {
    let { low: newLow, high: newHigh } = page;
    if (direction === "older") {
      setPage({ low: (newLow += 50), high: (newHigh += 50) });
    }
    if (direction === "newer") {
      setPage({ low: (newLow -= 50), high: (newHigh -= 50) });
    }
  };

  const handleSingleView = index => {
    return setSingleLog(logs.find(i => i.key === index));
  };

  return (
    <Fragment>
      <ContainerStyle>
        {!singleLog && (
          <Fragment>
            <Search
              {...search}
              handleSearch={e => handleSearch(e.target.value)}
              handleSingleView={handleSingleView}
            />
            <PageNav {...page} logs={logs} handlePageChange={handlePageChange} />
            <Results {...page} logs={logs} handleSingleView={handleSingleView} />
          </Fragment>
        )}
        {singleLog && <SingleLog {...singleLog} handleSingleView={handleSingleView} />}
      </ContainerStyle>
      <SearchReset
        onClose={() => {
          setSearch({ ...defaultSearch });
        }}
      />
    </Fragment>
  );
};

export default Logbook;
