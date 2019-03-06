import React from "react";

const SmallResult = props => {
  // don't display climbs until the user starts searching for them
  const { climbName, cragName, date } = props.data;

  return (
    <React.Fragment>
      <div>{date}</div>
      <div>
        {climbName}, {cragName}
      </div>
      <div>
        >
        <i className="fa fa-chevron-right" />
      </div>
    </React.Fragment>
  );
};

export default SmallResult;
