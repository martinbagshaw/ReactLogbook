import React, { FC } from "react";
import styled from "styled-components";

import { DefaultSearch } from "../../utils/common-types";

import useIsWidth from "../common/useIsWidth.jsx";
import { searchResultText } from "../common/Layout.jsx";
import { buttonBase } from "../common/Buttons.jsx";
import { colors, fonts, boxShadow, breakpoint } from "../common/styleVars";
import { getDate } from "../../utils/get-date";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 1rem;
  width: 100%;
  padding: 0 0.5rem;
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 0 0.5rem;
    margin-bottom: 2rem;
  }
`;

const HiddenLabel = styled.label`
  font-family: ${fonts.main};
  font-size: 0.95rem;
  display: block;
  visibility: hidden;
  height: 0;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 40rem;
  border: 0;
  text-align: center;
  letter-spacing: 0.025rem;
  font-family: ${fonts.main};
  font-weight: 500;
  font-size: 1.25rem;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    font-size: 1.5rem;
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 1rem;
    font-size: 2rem;
  }
  transition: all ease-in-out 0.5s;
  border-bottom: 0.125rem solid ${colors.darkGrey};
  color: ${colors.darkGrey};
  &::placeholder {
    color: ${colors.darkGrey};
  }
  &:focus {
    outline: 0;
    border-bottom-color: ${colors.black};
    color: ${colors.black};
  }
  &:disabled {
    border-bottom-color: ${colors.midGrey};
    color: ${colors.midGrey};
    cursor: not-allowed;
    &::placeholder {
      color: ${colors.midGrey};
    }
  }
`;

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
`;

const Crag = styled.span`
  ${searchResultText};
  font-weight: 400;
  flex: 2;
`;

const Date = styled.span`
  margin-left: auto;
  font-weight: 600;
`;

// seems to be problems combining interfaces
// https://github.com/typescript-cheatsheets/react/issues/61
// https://github.com/microsoft/TypeScript/issues/21417
// https://stackoverflow.com/questions/59969756/not-assignable-to-type-intrinsicattributes-intrinsicclassattributes-react-js
interface Props extends DefaultSearch {
  handleSearch: (value: string) => void;
  handleSingleView: (index: string | null) => void;
}
const Search: FC<Props> = ({ handleSearch, handleSingleView, placeholder, results, searchTerm }) => {
  const { isWidth: isTablet } = useIsWidth("tablet");
  const { isWidth: isDesktop } = useIsWidth("large");

  return (
    <SearchContainer>
      <HiddenLabel htmlFor="search-ascents">{placeholder}</HiddenLabel>
      <SearchBar
        id="search-ascents"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.currentTarget.value)}
      />

      {results && (
        <Results>
          {results.map(({ climbName, cragName, date: { processed }, key }) => {
            // TODO: do this in processed-data.ts
            const formattedDate = getDate(processed, isDesktop);
            return (
              <li key={key}>
                <ResultButton
                  aria-label={`Go to log for: ${climbName} on ${formattedDate}`}
                  onClick={() => handleSingleView(key)}
                >
                  <Climb>{climbName}</Climb>
                  {isTablet && <Crag>{cragName}</Crag>}
                  <Date>{formattedDate}</Date>
                </ResultButton>
              </li>
            )
          })}
        </Results>
      )}
    </SearchContainer>
  );
};

export default Search;
