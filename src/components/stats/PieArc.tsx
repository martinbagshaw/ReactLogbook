import React, { FC } from "react";
import styled from "styled-components";

import { ChartType } from "../../utils/types";

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

type Props = {
  activeArcIndex: number | undefined;
  data: ChartType;
  index: number;
  onClick: () => void;
  setTooltip: (index: number | undefined) => void;
};

const PieArc: FC<Props> = ({
  activeArcIndex,
  colors,
  createArc,
  data,
  format,
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
        fill={colors(index)}
        onMouseOver={() => setTooltip(index)}
        onMouseOut={() => setTooltip(undefined)}
      />
      <Text transform={`translate(${createArc.centroid(data)})`}>{format(data.value)}</Text>
    </ArcGroup>
  );
};

export default PieArc;
