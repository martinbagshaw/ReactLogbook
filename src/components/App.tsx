import React, { useEffect, useState, FC } from "react";
import styled from "styled-components";

import { FilterType, LogType } from "../utils/types";
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
  min-height: 100vh;
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
  padding-top: 1rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const ViewPanel = styled.div<{ translatePercent: number }>`
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform ease-in-out 1s;
  transform: translateX(${props => props.translatePercent}%);
`;

type Views = {
  s: string;
  l: string;
}
const views: Views = {
  s: "Stats",
  l: "Logbook"
};

const App: FC = (): JSX.Element => {
  const [activeView, setActiveView] = useState<string>(views.s);
  const [logs, setLogs] = useState<LogType[]>(allLogs);
  const [message, setMessage] = useState<string | null>(null);

  const handleSingleDay = (logs: LogType[], filter: FilterType): void => {
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
        <ViewPanel translatePercent={activeView === views.l ? -50 : 0}>
          <Stats logs={logs} handleSingleDay={handleSingleDay} />
          <Logbook logs={logs} isActive={activeView === views.l}/>
        </ViewPanel>
      </ViewContainer>
    </Root>
  );
};

export default App;
