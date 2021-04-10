import React, { FC } from "react";
import styled from "styled-components";

import { SearchResults } from "./SearchResults";
import { SearchType } from "../../utils/types";
import { colors, fonts, breakpoint } from "../common/styleVariables";

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

type SearchProps = Partial<SearchType> & {
  handleSearch: (value: string) => void;
  handleSingleView: (index: string | null) => void;
};
export const Search: FC<SearchProps> = ({
  handleSearch,
  handleSingleView,
  placeholder,
  results,
  searchTerm,
}) => {
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

      {results && <SearchResults handleSingleView={handleSingleView} results={results} />}
    </SearchContainer>
  );
};
