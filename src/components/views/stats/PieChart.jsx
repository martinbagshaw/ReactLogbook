import React, { useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const SvgChart = styled.svg`
  display: block;
  margin: auto;
  overflow: visible;
  transform: scale(0.5) translate(0, 0);
  transform-origin: bottom right;
  max-width: 480px;
  @media only screen and (min-width: 768px) {
    margin: 0;
    margin-left: auto;
    transform: scale(0.75) translate(0, 50%);
  }
`;

const DismissObject = styled.foreignObject`
  cursor: pointer;
  width: 100%;
  height: 100%;
  transform: translate(-200px, -200px);
`;

const ArcGroup = styled.g`
  cursor: pointer;
`;

const Text = styled.text`
  cursor: none;
  user-select: none;
  pointer-events: none;
  font-size: 0.625rem;
  fill: white;
  text-anchor: middle;
  alignment-baseline: middle;
`;

const ForeignObject = styled.foreignObject`
  pointer-events: none;
  padding: 0 0.25rem 0.25rem 0;
  div {
    width: auto;
    z-index: 1;
    pointer-events: none;
    user-select: none;
    font-size: 0.625rem;
    text-align: left;
    background: white;
    box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
    padding: 0.25rem;
    border-radius: 0.125rem;
  }
`;

const Tooltip = ({ transform, data }) => {
  const { tooltipLabel } = data;
  return (
    <ForeignObject transform={transform} width={150} height={40}>
      <div>
        <p>{tooltipLabel}</p>
      </div>
    </ForeignObject>
  );
};

const Arc = ({ setTooltip, data, index, createArc, colors, format, onClick }) => (
  <ArcGroup key={index} onClick={onClick}>
    <path
      d={createArc(data)}
      fill={colors(index)}
      onMouseOver={() => setTooltip(data)}
      onMouseOut={() => setTooltip(false)}
    />
    <Text transform={`translate(${createArc.centroid(data)})`}>{format(data.value)}</Text>
  </ArcGroup>
);

const PieChart = ({ chartdata, innerRadius, outerRadius, type, setFiltered }) => {
  const [tooltip, setTooltip] = useState(false); // data for active tooltip

  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".0f");
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const getToolPos = (data, arcFunc, radius) => {
    if (typeof data !== "object" || !arcFunc.centroid) {
      return "translate(0, 0)";
    }
    const [a, b] = arcFunc.centroid(data);
    if (a && b) {
      return `translate(${a + radius}, ${b + radius})`;
    }
    return "translate(0, 0)";
  };

  return (
    <SvgChart viewBox="0 0 200 200">
      <DismissObject onClick={() => setFiltered(null)} />
      {chartdata.map((d, i) => (
        <Arc
          setTooltip={setTooltip}
          key={i}
          data={d}
          index={i}
          createArc={createArc}
          colors={colors}
          format={format}
          onClick={() => setFiltered(type, d.data)}
        />
      ))}
      {tooltip && <Tooltip transform={getToolPos(tooltip, createArc, outerRadius)} {...tooltip} />}
    </SvgChart>
  );
};

export default PieChart;
