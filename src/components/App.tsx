import React, { useEffect, useState, FC } from "react";
import styled from "styled-components";

import { Filter, OutputObject } from "../utils/types";
import { allLogs } from "../utils/processed-data";
import Stats from "./stats/Stats";
import Logbook from "./logbook/Logbook";

import { breakpoint, colors, fonts, fontSize } from "./common/styleVariables";
import { buttonBase } from "./common/Buttons";

const Root = styled.div`
  margin: 0;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1.4;
`;

const Header = styled.header`
  display: flex;
`;

const ViewButton = styled.button<{ readonly isActive: boolean }>`
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

const ViewButtonText = styled.span`
  user-select: none;
  max-width: 23rem;
  width: 100%;
  display: block;
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

const ViewPanel = styled.div<{ readonly isLogbook: boolean }>`
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

interface Views {
  s: string;
  l: string;
}
const views: Views = {
  s: "Stats",
  l: "Logbook"
};

const App: FC = (): JSX.Element => {
  const [activeView, setActiveView] = useState<string>(views.s);
  const [logs, setLogs] = useState<OutputObject[]>(allLogs);
  const [message, setMessage] = useState<string | null>(null);

  const handleSingleDay = (logs: OutputObject[], filter: Filter): void => {
    const { day, month, year } = filter;
    setActiveView(views.l);
    setLogs(logs);
    setMessage(
      `Showing ${logs.length} ${logs.length === 1 ? "log" : "logs"} for: ${day} ${month} ${year}`
    );
  };

  // reset to original
  useEffect(() => {
    if (message && activeView === views.s) {
      setLogs(allLogs);
      setMessage(null);
    }
  }, [message, activeView]);

  return (
    <Root>
      {message && <DailyMessage>{message}</DailyMessage>}
      <Header>
        {Object.values(views).map(view => (
          <ViewButton
            key={view}
            onClick={() => setActiveView(view)}
            isActive={activeView === view}
            aria-label={`${view} View`}
          >
            <ViewButtonText>{view}</ViewButtonText>
          </ViewButton>
        ))}
      </Header>

      <ViewContainer>
        <ViewPanel isLogbook={activeView === views.l}>
          <Stats logs={logs} handleSingleDay={handleSingleDay} />
          <Logbook logs={logs} />
        </ViewPanel>
      </ViewContainer>
    </Root>
  );
};

export default App;
