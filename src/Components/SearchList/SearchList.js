import React from "react";

// import and combine all components here
import SmallResult from "../SmallResult/SmallResult";

// get list styles
import { ListContainer } from "../styles/mainView";

const SearchList = props => {
  // don't display climbs until the user starts searching for them
  const { matchingClimbs, onClick } = props;

  // this.props.onSubmit(this.state);
  // onClick(item);

  // hide list based on suggestions in props
  // see formidable tech test

  const climbs =
    matchingClimbs &&
    matchingClimbs.map((item, index) => (
      <li key={index} onClick={e => onClick(item)}>
        <SmallResult data={item} />
      </li>
    ));

  return <ListContainer>{climbs}</ListContainer>;
};

export default SearchList;
