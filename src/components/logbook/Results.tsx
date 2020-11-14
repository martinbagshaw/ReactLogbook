import React, { FC } from "react";
import styled from "styled-components";

import { OutputObject } from "../../utils/types";

import useIsWidth from "../common/useIsWidth";
import Chevron from "../common/icons/Chevron";
import { breakpoint, colors } from "../common/styleVariables";
import { searchResultText } from "../common/Typography";
import { buttonBase } from "../common/Buttons";
import { getDate } from "../../utils/get-date";

const ResultsList = styled.ul`
  margin: 0 0 3rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    margin-bottom: 0;
  }
`;

const ListItem = styled.li`
  width: 100%;
`;

const ListButton = styled.button`
  ${buttonBase};
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
  background-color: transparent;
  &:hover {
    background-color: ${colors.lightGrey};
    border-color: ${colors.midGrey};
    svg {
      fill: ${colors.black};
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
`;

interface Props {
  logs: OutputObject[];
  low: number;
  high: number;
  handleSingleView: (index: string | null) => void;
}
const Results: FC<Props> = ({ logs, low, high, handleSingleView }) => {
  const { isWidth: isDesktop } = useIsWidth("large");
  // TODO: run getDate in processed-data.ts
  return (
    <ResultsList>
      {logs
        .slice(low, high)
        .map(({ climbName, cragName, date: { processed }, grade, key, style }) => (
          <ListItem key={key}>
            <ListButton onClick={() => handleSingleView(key)}>
              <Climb>
                <strong>{climbName}</strong> - {grade}
              </Climb>{" "}
              <Crag>
                {isDesktop && `${style} - `}
                {cragName}
              </Crag>
              <Date>
                {getDate(processed, isDesktop)}
                <Chevron fill="unset" />
              </Date>
            </ListButton>
          </ListItem>
        ))}
    </ResultsList>
  );
};

export default Results;
