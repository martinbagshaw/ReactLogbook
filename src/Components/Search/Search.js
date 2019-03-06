// @flow
import React from "react";

// get searchbar styles
import { SearchContainer } from "../styles/mainView";

const Search = props => {
  return (
    <SearchContainer
      type="text"
      className="search"
      placeholder="Climb or Crag"
      onChange={props.onChange}
    />
  );
};

export default Search;
