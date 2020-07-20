/* App Component
- entry point
- contains logbook, stats and menu
*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import climbData from "../data/mb-logbook.json";
import { formatData } from "../utils/formatData";

import Stats from "./views/stats/Stats.jsx";
import Logbook from "./views/logbook/Logbook.jsx";

import { colors, spacing, fonts, fontSize } from "./common/styleVars";
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

const Button = styled.button`
  ${buttonBase};
  letter-spacing: 0.05rem;
  font-size: ${fontSize.med};
  display: flex;
  width: 50%;
  border-bottom: ${spacing.small} solid ${colors.midGrey};
  padding: ${spacing.xLarge};
  background-color: ${colors.lightGrey};
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
    background-color: ${props => (props.isActive ? colors.lightRed : colors.midGrey)};
  }
  ${props =>
    props.isActive &&
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

const allLogs = formatData(climbData);

const App = () => {
  const [view, setView] = useState("Stats");
  const [logs, setLogs] = useState(allLogs);
  const [message, setMessage] = useState(null);

  const handleSingleDay = (logs, filter) => {
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
      {view === "Stats" && <Stats logs={logs} handleSingleDay={handleSingleDay} />}
      {view === "Logbook" && <Logbook logs={logs} />}
    </Root>
  );
};

export default App;
