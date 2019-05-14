import React from "react";
import {
  SearchStyle,
  LabelStyle,
  SearchBarStyle,
  SearchList,
  SearchListButton,
} from "../styles/searchStyle";

// TODO:
// - utility function to abbreviate text (fit on one line)
// - onClick display single result
export const Search = ({ placeholder, searchTerm, results, onChange }) => {
  return (
    <SearchStyle>
      <LabelStyle htmlFor="search-ascents">{placeholder}</LabelStyle>
      <SearchBarStyle
        id="search-ascents"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onChange}
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
