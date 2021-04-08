import React, { FC } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const ArcGroup = styled.g<{ opacity: number }>`
  cursor: pointer;
  transition: opacity ease-in-out 0.3;
  opacity: ${({ opacity }) => opacity};
`;

const Text = styled.text`
  cursor: none;
  user-select: none;
  pointer-events: none;
  font-size: 0.625rem;
  fill: white;
  text-anchor: middle;
`;

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(".0f");

type PieArcProps = {
  activeArcIndex: number | undefined;
  createArc: d3.Arc<any, d3.DefaultArcObject>;
  data: d3.PieArcDatum<number | { valueOf(): number }>;
  index: number;
  onClick: () => void;
  setTooltip: (index: number | undefined) => void;
};

const PieArc: FC<PieArcProps> = ({
  activeArcIndex,
  createArc,
  data,
  index,
  onClick,
  setTooltip,
}) => {
  const hovered = Boolean(activeArcIndex || activeArcIndex === 0);
  return (
    <ArcGroup
      key={index}
      opacity={hovered && activeArcIndex !== index ? 0.65 : 1}
      onClick={onClick}
    >
      <path
        d={createArc(data)}
        fill={colors(index.toString())}
        onMouseOver={() => setTooltip(index)}
        onMouseOut={() => setTooltip(undefined)}
      />
      <Text transform={`translate(${createArc.centroid(data)})`}>{format(data.value)}</Text>
    </ArcGroup>
  );
};

export default PieArc;
