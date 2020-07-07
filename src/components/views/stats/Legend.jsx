import React, { Fragment } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Container = styled.div`
  @media only screen and (min-width: 768px) {
    position: absolute;
    top: 3rem;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  strong {
    font-weight: 700;
    margin-right: 0.5rem;
  }
`;

const Square = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  background-color: ${({ bg }) => bg};
`;

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const logText = data => {
  if (data && data.keyLabel) {
    const { keyLabel } = data;
    return (
      <Fragment>
        <strong>{keyLabel[0]}</strong>
        {`${keyLabel[1]}`}
      </Fragment>
    );
  }
  return "no label found";
};

const Legend = ({ chartdata, settings }) => {
  const { type } = settings;
  const { cumulative } = settings[type.toLowerCase()];
  return (
    <Container>
      <legend>Key{cumulative === "Month" && ": All years"}</legend>
      <Items>
        {chartdata.map((d, i) => (
          <Item key={i}>
            <Square bg={colors(i)} />
            {logText(d.data)}
          </Item>
        ))}
      </Items>
    </Container>
  );
};

export default Legend;
