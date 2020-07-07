import React from "react";
import styled from "styled-components";
import {
  colors,
  spacing,
  fonts,
  fontSize,
  fontWeight,
  boxShadow,
  breakpoint,
} from "../../common/styleVars";
import { searchResultText } from "../../common/Layout.jsx";
import { buttonBase } from "../../common/Buttons.jsx";

const SearchContainer = styled.div`
  position: relative;
  display: block;
  margin: 0 auto ${spacing.xLarge};
  width: 100%;
  max-width: 40rem;
  padding: 0 ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 0;
  }
`;

const HiddenLabel = styled.label`
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  display: block;
  visibility: hidden;
  height: 0;
`;

const SearchBar = styled.input`
  padding: ${spacing.large};
  width: 100%;
  font-family: ${fonts.main};
  font-size: ${fontSize.med};
  font-weight: ${fontWeight.med};
  border: 0;
  text-align: center;
  transition: all ease-in-out 0.5s;
  border-bottom: ${spacing.small} solid ${colors.darkGrey};
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
  @media only screen and (min-width: ${breakpoint.small}) {
    font-size: ${fontSize.large};
  }
`;

const Results = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 65vh;
  overflow-y: scroll;
  box-shadow: ${boxShadow.top};
`;

const ResultButton = styled.button`
  ${buttonBase};
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${spacing.med} ${spacing.large};
  font-size: ${fontSize.med};
  text-align: left;
  background-color: ${colors.lightGrey};
  border: ${spacing.xSmall} solid transparent;
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
  font-weight: ${fontWeight.reg};
  flex: 2;
`;

const Date = styled.span`
  margin-left: auto;
  font-weight: ${fontWeight.bold};
`;

const Search = ({
  placeholder,
  searchTerm,
  results,
  onChange,
  // onBlur,
  onResultClick,
  disabled,
}) => (
  <SearchContainer>
    <HiddenLabel htmlFor="search-ascents">{placeholder}</HiddenLabel>
    <SearchBar
      id="search-ascents"
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={onChange}
      // onBlur={onBlur}
      disabled={disabled}
    />

    {results && !disabled && (
      <Results>
        {results.map(i => (
          <li key={i.key}>
            <ResultButton
              aria-label={`Go to log for: ${i.climbName} on ${i.date}`}
              onClick={() => onResultClick(i.key)}
            >
              <Climb>{i.climbName}</Climb>
              <Crag>{i.cragName}</Crag>
              <Date>{i.date.original}</Date>
            </ResultButton>
          </li>
        ))}
      </Results>
    )}
  </SearchContainer>
);

export default Search;
