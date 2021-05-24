import React, { FC } from "react";
import styled from "styled-components";

import { LogType } from "../../utils/types";

import { searchResultText } from "../common/Typography";
import { buttonBase } from "../common/Buttons";
import { colors, boxShadow, breakpoint } from "../common/styleVariables";

const Results = styled.ul`
  position: absolute;
  top: 42px;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    top: 47px;
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    top: 71px;
  }
  margin-top: 1rem;
  left: 0.5rem;
  z-index: 2;
  width: calc(100% - 1rem);
  max-height: 65vh;
  overflow-y: scroll;
  box-shadow: ${boxShadow.top};
`;

const ResultButton = styled.button`
  ${buttonBase};
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: left;
  font-size: 1rem;
  padding: 0.5rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
  }
  @media only screen and (min-width: ${breakpoint.tablet}) {
    font-size: 1.125rem;
  }
  background-color: ${colors.lightGrey};
  border: 0.125rem solid transparent;
  border-bottom-color: ${colors.midGrey};
  &:hover {
    background-color: ${colors.lightBlue};
    border-color: ${colors.midBlue};
  }
`;

const Climb = styled.span`
  ${searchResultText};
  flex: 3;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    max-width: 40%;
  }
`;

const Crag = styled.span`
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
    ${searchResultText};
    font-weight: 400;
    flex: 2;
  }
`;

const DateSmall = styled.span`
  margin-left: auto;
  font-weight: 600;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: none;
  }
`;
const DateLarge = styled.span`
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: flex;
    margin-left: auto;
    font-weight: 600;
  }
`;

interface SearchResultsProps {
  handleSingleView: (index?: string) => void;
  results: LogType[];
}

export const SearchResults: FC<SearchResultsProps> = ({ results, handleSingleView }) => (
  <Results>
    {results.map(({ climbName, cragName, date, key }) => {
      // TODO: Simplify / use new date object
      const { day, dayLong, monthInt, monthLong, year, yearInt } = date;
      const dateLarge = `${dayLong} ${monthLong} ${year}`;
      return (
        <li key={key}>
          <ResultButton
            aria-label={`Go to log for: ${climbName} on ${dateLarge}`}
            onClick={() => handleSingleView(key)}
          >
            <Climb>{climbName}</Climb>
            <Crag>{cragName}</Crag>
            <DateSmall>{`${day}/${monthInt}/${yearInt}`}</DateSmall>
            <DateLarge>{`${dateLarge}`}</DateLarge>
          </ResultButton>
        </li>
      );
    })}
  </Results>
);
