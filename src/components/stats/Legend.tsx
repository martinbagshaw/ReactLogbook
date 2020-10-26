import React, { FC, Fragment, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import useIsWidth from "../common/useIsWidth";
import { buttonBase } from "../common/Buttons";
import Chevron from "../common/icons/Chevron";
import { breakpoint, colors } from "../common/styleVariables";

const Container = styled.div`
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: ${colors.lightGrey};
  border-top: 0.175rem solid ${colors.midGrey};
  @media only screen and (min-width: ${breakpoint.tablet}) {
    position: unset;
    width: auto;
    background: transparent;
    border-top: 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LegendTitle = styled.legend`
  font-weight: 500;
`;

const Button = styled.button`
  ${buttonBase};
  width: 100%;
  text-align: right;
  svg {
    fill: ${colors.black};
    transition: all ease-in-out 0.3s;
    margin-right: 0.25rem;
    width: 2.25rem;
    height: 2.25rem;
    @media only screen and (min-width: ${breakpoint.Xsmall}) {
      width: 3rem;
      height: 3rem;
    }
  }
  &:hover svg {
    margin-left: 0.5rem;
  }
  @media only screen and (min-width: ${breakpoint.tablet}) {
    display: none;
    pointer-events: none;
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

const Square = styled.div<{bg: string}>`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  background-color: ${({ bg }) => bg};
`;

const chartColors = d3.scaleOrdinal(d3.schemeCategory10);

interface Props {
  chartdata: object;
  settings: object;
}
const Legend: FC<Props> = ({ chartdata, settings }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { isWidth: isTablet } = useIsWidth("tablet");

  const { type } = settings;
  const key = type.toLowerCase();
  const { cumulative } = settings[key];

  return (
    <Container>
      <TitleContainer>
        <LegendTitle>Key{cumulative === "Month" && ": All years"}</LegendTitle>
        <Button onClick={() => setOpen(!open)}>
          <Chevron
            title={`${open ? "close" : "open"} key`}
            fill="unset"
            direction={open ? "down" : "up"}
          />
        </Button>
      </TitleContainer>

      {(isTablet || open) && (
        <Items>
          {chartdata.map((d, i: number) => (
            <Item key={i}>
              <Square bg={chartColors(i.toString())} />
              {d.data && d.data.keyLabel ? 
              (
                <Fragment>
                  <strong>{d.data.keyLabel[0]}</strong>
                  {`${d.data.keyLabel[1]}`}
                </Fragment>
              ): "no label found"}
            </Item>
          ))}
        </Items>
      )}
    </Container>
  );
};

export default Legend;
