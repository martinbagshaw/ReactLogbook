import React, { FC, useContext } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import { ChartType } from "../../utils/types";

import { StatsContext } from "./StatsContext";
import PieArc from "./PieArc";
import { breakpoint } from "../common/styleVariables";

const ChartContainer = styled.div`
  display: block;
  margin: 1rem;
  max-width: 480px;
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    margin: 1rem auto;
  }
  @media only screen and (min-width: ${breakpoint.tablet}) {
    margin: 0;
    margin-left: auto;
    padding-right: 1rem;
    width: 100%;
  }
`;

const SvgChart = styled.svg`
  overflow: visible;
  transform: scale(0.5) translate(0, 0);
  transform-origin: bottom right;
  @media only screen and (min-width: ${breakpoint.tablet}) {
    transform: scale(0.5) translate(0, -20%);
  }
`;

// need to lift this out / have in another svg for better reset
const DismissObject = styled.foreignObject`
  cursor: pointer;
  width: 100%;
  height: 100%;
  transform: translate(-200px, -200px);
`;

const HoverTooltip = styled.foreignObject<{ positioning: number[] | undefined }>`
  pointer-events: none;
  transform: scale(1.125)
    ${({ positioning }) => positioning && `translate(${positioning[0]}px, ${positioning[1]}px)`};
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

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(".0f");

type Props = {
  chartdata: ChartType[];
};
const PieChart: FC<Props> = ({
  chartdata,
  innerRadius,
  outerRadius,
  setFiltered,
  type,
}): JSX.Element => {
  const {
    state: { activeArcIndex },
    dispatch,
  } = useContext(StatsContext);

  const setTooltip = (index: number | undefined): void => {
    dispatch({
      type: "activeArcIndex",
      payload: index,
    });
  };

  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const getToolPos = (data: ChartType | number | false, arcFunc, radius): number[] | undefined => {
    if (typeof data !== "object" || !arcFunc.centroid) {
      return;
    }
    const [a, b] = arcFunc.centroid(data);
    if (a && b) {
      const x = a - radius / 4;
      const y = b - radius / 4;
      return [x, y];
    }
    return;
  };
  
  const hovered = Boolean(activeArcIndex || activeArcIndex === 0);
  const tooltip = (activeArcIndex || activeArcIndex === 0) && chartdata[activeArcIndex];
  
  return (
    <ChartContainer>
      <SvgChart viewBox="0 0 200 200">
        <DismissObject onClick={() => setFiltered(null)} />
        {chartdata.map((d, i) => (
          <PieArc
            activeArcIndex={activeArcIndex}
            colors={colors}
            createArc={createArc}
            data={d}
            format={format}
            index={i}
            key={i}
            onClick={() => setFiltered(type, d.data)}
            setTooltip={setTooltip}
          />
        ))}
        {hovered && tooltip && (
          <HoverTooltip
            positioning={getToolPos(tooltip, createArc, outerRadius)}
            width={150}
            height={40}
          >
            <div>
              <p>{tooltip.data.tooltipLabel}</p>
            </div>
          </HoverTooltip>
        )}
      </SvgChart>
    </ChartContainer>
  );
};

export default PieChart;
