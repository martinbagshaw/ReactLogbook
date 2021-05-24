import React, { useState, useEffect, Fragment, FC } from "react";
import styled from "styled-components";

import { LogType, SearchType } from "../../utils/types";

import { Search } from "./Search";
import { SearchReset } from "./SearchReset";
import PageNav from "./PageNav";
import Results from "./Results";
import SingleLog from "../singleLog/SingleLog";

const LogContainer = styled.div<{ isHidden: boolean }>`
  width: 50%;
  ${({ isHidden }) => isHidden && "height: 0; opacity: 0"};
`;

const defaultSearch: SearchType = {
  placeholder: "Search by Climb or Crag name...",
  searchTerm: "",
  results: undefined,
};

type LogbookProps = {
  isHidden: boolean;
  logs: LogType[];
};
const Logbook: FC<LogbookProps> = ({ isHidden, logs }): JSX.Element => {
  const [search, setSearch] = useState<SearchType | undefined>(defaultSearch);
  const [page, setPage] = useState<{ low: number; high: number }>({ low: 0, high: 50 });
  const [singleLog, setSingleLog] = useState<LogType | undefined>(undefined);
  const [starredLogs, setStarredLogs] = useState<string[]>([]);
  const [activeStarred, setActiveStarred] = useState<boolean>(false);

  const handleSearch = (value: string): SearchType | void => {
    const findResults = (value: string, logs: LogType[]): LogType[] | void => {
      if (value.length < 3) return;
      return logs.filter(log => {
        const regex = new RegExp(value, "gi");
        const cl = log.climbName.toString();
        const cr = log.cragName.toString();
        return cl.match(regex) || cr.match(regex);
      });
    };
    const placeholder: string = value.length > 0 ? "" : "Search by Climb or Crag name...";
    return setSearch({ placeholder, searchTerm: value, results: findResults(value, logs) });
  };

  const handlePageChange = (direction: string) => {
    let { low: newLow, high: newHigh } = page;
    if (direction === "older") {
      setPage({ low: newLow += 50, high: newHigh += 50 });
    }
    if (direction === "newer") {
      setPage({ low: newLow -= 50, high: newHigh -= 50 });
    }
  };

  // TODO: stricter checking here. Should be ascent-<number>, see LogType
  const handleSingleView = (index?: string): void => {
    return setSingleLog(logs.find(i => i.key === index));
  };

  // Starred logs
  const handleStarred = (index: string): void => {
    if (!localStorage.getItem(`${index}-starred`)) {
      localStorage.setItem(`${index}-starred`, "true");
      starredLogs.push(`${index}-starred`);
      setActiveStarred(true);
    } else {
      localStorage.removeItem(`${index}-starred`);
      const removeIndex = starredLogs.indexOf(`${index}-starred`);
      starredLogs.splice(removeIndex, 1);
      setActiveStarred(false);
    }
    setStarredLogs(starredLogs);
  };

  useEffect(() => {
    if (singleLog?.index && localStorage.getItem(`${singleLog?.index}-starred`)) {
      setActiveStarred(true);
    } else {
      setActiveStarred(false);
    }
  }, [singleLog?.index]);

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("ascent-") && localStorage.getItem(key)) {
        starredLogs.push(key);
      }
      setStarredLogs(starredLogs);
    }
  }, [starredLogs]);

  return (
    <LogContainer isHidden={isHidden}>
      <div>
        {!singleLog && (
          <Fragment>
            <Search handleSearch={handleSearch} handleSingleView={handleSingleView} {...search} />
            <PageNav {...page} logs={logs} handlePageChange={handlePageChange} />
            <Results
              {...page}
              logs={logs}
              handleSingleView={handleSingleView}
              starredLogs={starredLogs}
            />
            <SearchReset
              onClose={() => {
                setSearch(defaultSearch);
              }}
            />
          </Fragment>
        )}
        {singleLog && (
          <SingleLog
            {...singleLog}
            handleSingleView={handleSingleView}
            handleStarred={() => handleStarred(singleLog?.index)}
            isStarred={activeStarred}
          />
        )}
      </div>
    </LogContainer>
  );
};

export default Logbook;
