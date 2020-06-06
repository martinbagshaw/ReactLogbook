import React, { Fragment } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const PieChart = styled.svg`
  width: 50vw;
  height: 50vw;
  display: block;
  margin: auto;
  overflow: visible;
  @media only screen and (min-width: 768px) {
    margin-right: 0;
    margin-left: calc(100% - 400px);
  }
`;

const Key = styled.div`
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
  background-color: ${props => props.bg};
`;

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="white"
      fontSize="10"
    >
      {format(data.value)}
    </text>
  </g>
);

const Pie = props => {
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".0f");
  const data = createPie(props.data);

  return (
    <Fragment>
      <PieChart>
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          {data.map((d, i) => (
            <Arc key={i} data={d} index={i} createArc={createArc} colors={colors} format={format} />
          ))}
        </g>
      </PieChart>

      <Key>
        <legend>Key</legend>
        <Items>
          {data.map((d, i) => (
            <Item key={i}>
              <Square bg={colors(i)} />
              <strong>{(d.data && d.data.label) || "no label found"}</strong>
              {(d.data && `${d.data.value} logs`) || "no logs found"}
            </Item>
          ))}
        </Items>
      </Key>
    </Fragment>
  );
};

export default Pie;
