import React, { FC } from "react";
import styled from "styled-components";

import { LogType } from "../../utils/types";

import { breakpoint, colors } from "../common/styleVariables";
import Chevron from "../common/icons/Chevron";
import { Icon } from "../common/icons/Icon";
import { searchResultText } from "../common/Typography";
import { buttonBase } from "../common/Buttons";

const ResultsList = styled.ul`
  margin: 0 0 3rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    margin-bottom: 0;
  }
`;

const ListItem = styled.li`
  width: 100%;
`;

const ListButton = styled.button<{ isActive: boolean }>`
  ${buttonBase};
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
  }
  border: 0.125rem solid transparent;
  border-radius: 0.125rem;
  &:hover {
    background-color: ${({ isActive }) => colors[isActive ? "lightYellow" : "lightGrey"]};
    border-color: ${({ isActive }) => colors[isActive ? "yellow" : "midGrey"]};
    svg {
      fill: ${({ isActive }) => colors[isActive ? "yellow" : "black"]};
    }
  }
  svg {
    fill: ${colors.black};
    transition: all ease-in-out 0.3s;
    width: 2.25rem;
    height: 2.25rem;
    @media only screen and (min-width: ${breakpoint.Xsmall}) {
      width: 3rem;
      height: 3rem;
    }
    @media only screen and (min-width: ${breakpoint.tablet}) {
      fill: transparent;
    }
  }
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    fill: ${colors.yellow};
  }
  background-color: ${({ isActive }) => (isActive ? colors.lightYellow : "transparent")};
`;

const Climb = styled.span`
  ${searchResultText};
  flex: 3;
  strong {
    font-weight: 500;
  }
`;

const Crag = styled.span`
  ${searchResultText};
  flex: 2;
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
  }
`;

const Date = styled.span`
  margin-left: 1rem;
  font-weight: 600;
  margin-left: auto;
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    flex: 2.5;
    justify-content: space-between;
    margin-left: 2rem;
  }
`;

const Small = styled.span`
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: none;
  }
`;
const Large = styled.span`
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
  }
`;

interface ResultsProps {
  logs: LogType[];
  low: number;
  high: number;
  handleSingleView: (index?: string) => void;
  starredLogs: string[];
}

const Results: FC<ResultsProps> = ({ logs, low, high, handleSingleView, starredLogs }) => (
  <ResultsList>
    {logs.slice(low, high).map(({ climbName, cragName, date, grade, index, key, style }) => {
      // TODO: Simplify - in original data?
      const { day, dayLong, monthInt, monthLong, year, yearInt } = date;
      const isActive = starredLogs.includes(`${index}-starred`);
      return (
        <ListItem key={key}>
          <ListButton onClick={() => handleSingleView(key)} isActive={isActive}>
            {isActive && <Icon icon="star" />}
            <Climb>
              <strong>{climbName}</strong> - {grade}
            </Climb>{" "}
            <Crag>
              <Large>{`${style} - `}</Large>
              {cragName}
            </Crag>
            <Date>
              <Small>{`${day}/${monthInt}/${yearInt}`}</Small>
              <Large>{`${dayLong} ${monthLong} ${year}`}</Large>
              <Chevron fill="unset" />
            </Date>
          </ListButton>
        </ListItem>
      );
    })}
  </ResultsList>
);

export default Results;
