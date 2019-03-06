import React from "react";

import { ResultContainer } from "../styles/singleView";

const LargeResult = props => {
  const { climbName, cragName, date, grade, notes, partners, style } = props.resultData;

  const result = climbName && (
    <>
      <div>{date && <p>{date}</p>}</div>
      <div>
        <h3>{climbName}</h3>
        {grade && <p>{grade}</p>}
        {style && <p>{style}</p>}
        {partners && <p>{partners}</p>}
        {notes && <p>{notes}</p>}
        <p>{cragName}</p>
      </div>
    </>
  );

  // will have child components for each part here
  return <ResultContainer>{result}</ResultContainer>;
};

export default LargeResult;
