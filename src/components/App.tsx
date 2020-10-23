import React, { useEffect, useState, FC } from "react";
import styled from "styled-components";

import { allLogs, OutputObject } from "../utils/formatData";
import Stats from "./stats/Stats.jsx";
import Logbook from "./logbook/Logbook.jsx";

import { breakpoint, colors, fonts, fontSize } from "./common/styleVars";
import { buttonBase } from "./common/Buttons.jsx";

const Root = styled.div`
  margin: 0;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1.4;
`;

const Header = styled.header`
  display: flex;
`;

const Button = styled.button<{ readonly isActive: boolean }>`
  ${buttonBase};
  display: flex;
  width: 50%;
  padding: 1.25rem 2rem;
  border-bottom: 0.175rem solid ${colors.midGrey};
  background-color: ${colors.lightGrey};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 2rem;
    font-size: 1.5rem;
  }
  &:first-child {
    justify-content: flex-end;
  }
  > span {
    user-select: none;
    max-width: 23rem;
    width: 100%;
    display: block;
  }
  &:hover {
    background-color: ${({ isActive }) => colors[isActive ? "lightRed" : "midGrey"]};
  }
  ${({ isActive }) =>
    isActive &&
    `
  background-color: ${colors.lightRed};
  border-bottom-color: ${colors.red};
  `}
`;

const DailyMessage = styled.p`
  text-align: center;
  padding: 0.25rem;
  background-color: ${colors.midBlue};
`;

const ViewContainer = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 0;
  overflow: hidden;
`;

const Views = styled.div<{ readonly isLogbook: boolean }>`
  display: flex;
  width: 200%;
  ${({ isLogbook }) =>
    isLogbook
      ? `
    transform: translateX(-50%);
    transition: transform ease-in-out 1s;
  `
      : `
    transform: translateX(0%);
    transition: transform ease-in-out 1s;
  `}
`;

interface Filter {
  day: string;
  month: string;
  year: string;
}
const App: FC = () => {
  const [view, setView] = useState<string>("Stats");
  const [logs, setLogs] = useState<OutputObject[]>(allLogs);
  const [message, setMessage] = useState<string | null>(null);

  const handleSingleDay = (logs: OutputObject[], filter: Filter) => {
    const { day, month, year } = filter;
    setView("Logbook");
    setLogs(logs);
    setMessage(
      `Showing ${logs.length} ${logs.length === 1 ? "log" : "logs"} for: ${day} ${month} ${year}`
    );
  };

  // reset to original
  useEffect(() => {
    if (message && view === "Stats") {
      setLogs(allLogs);
      setMessage(null);
    }
  }, [message, view]);

  return (
    <Root>
      {message && <DailyMessage>{message}</DailyMessage>}
      <Header>
        <Button
          onClick={() => setView("Stats")}
          isActive={view === "Stats"}
          aria-label="Stats View"
        >
          <span>Stats</span>
        </Button>
        <Button
          onClick={() => setView("Logbook")}
          isActive={view === "Logbook"}
          aria-label="Logbook View"
        >
          <span>Logbook</span>
        </Button>
      </Header>

      <ViewContainer>
        <Views isLogbook={view === "Logbook"}>
          <Stats logs={logs} handleSingleDay={handleSingleDay} />
          <Logbook logs={logs} />
        </Views>
      </ViewContainer>
    </Root>
  );
};

export default App;
