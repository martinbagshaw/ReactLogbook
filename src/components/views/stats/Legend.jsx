import React, { Fragment, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import useIsWidth from "../../common/useIsWidth.jsx";
import { buttonBase } from "../../common/Buttons.jsx";
import { Chevron } from "../../common/icons/Icons.jsx";
import { breakpoint, colors } from "../../common/styleVars";

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

const Square = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  background-color: ${({ bg }) => bg};
`;

const chartColors = d3.scaleOrdinal(d3.schemeCategory10);

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
  const [open, setOpen] = useState(false);
  const { isWidth: isTablet } = useIsWidth("tablet");

  const { type } = settings;
  const { cumulative } = settings[type.toLowerCase()];

  return (
    <Container>
      <TitleContainer>
        <LegendTitle>Key{cumulative === "Month" && ": All years"}</LegendTitle>
        <Button onClick={() => setOpen(!open)}>
          <Chevron
            title={`${open ? "close" : "open"} key`}
            fill="unset"
            direction={open ? "down" : "up"}
            width="unset"
          />
        </Button>
      </TitleContainer>

      {(isTablet || open) && (
        <Items>
          {chartdata.map((d, i) => (
            <Item key={i}>
              <Square bg={chartColors(i)} />
              {logText(d.data)}
            </Item>
          ))}
        </Items>
      )}
    </Container>
  );
};

export default Legend;
