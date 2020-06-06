/* App Component
- entry point
- contains logbook, stats and menu
*/

import React, { useState } from "react";
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
    props.isActive
      ? `
  background-color: ${colors.lightRed};
  border-bottom-color: ${colors.red};
  `
      : ""}
`;

const allLogs = formatData(climbData);

const App = () => {
  const [view, setView] = useState("Stats");

  return (
    <Root>
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
      {view === "Stats" && <Stats logs={allLogs} />}
      {view === "Logbook" && <Logbook logs={allLogs} />}
    </Root>
  );
};

export default App;
