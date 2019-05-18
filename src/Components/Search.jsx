import React from "react";
import {
  SearchStyle,
  LabelStyle,
  SearchBarStyle,
  SearchList,
  SearchListButton,
} from "../styles/searchStyle";

// TODO:
// - onUnfocus reset search
export const Search = ({ placeholder, searchTerm, results, onChange, disabled }) => {
  return (
    <SearchStyle>
      <LabelStyle htmlFor="search-ascents">{placeholder}</LabelStyle>
      <SearchBarStyle
        id="search-ascents"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onChange}
        disabled={disabled}
      />

      {results && (
        <SearchList>
          {results.map(i => (
            <li key={i.key}>
              <SearchListButton>
                <span>{i.climbName}</span> <span>{i.cragName}</span> <span>{i.date}</span>
              </SearchListButton>
            </li>
          ))}
        </SearchList>
      )}
    </SearchStyle>
  );
};
