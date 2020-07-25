import React from "react";
import styled from "styled-components";

import useIsWidth from "../../common/useIsWidth.jsx";
import Chevron from "../../common/icons/Chevron.jsx";
import { buttonBase } from "../../common/Buttons.jsx";
import { breakpoint, colors } from "../../common/styleVars";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem 0.5rem;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: linear-gradient(0deg, white, transparent);
  @media only screen and (min-width: ${breakpoint.Xsmall}) {
    padding: 1rem 0.5rem;
    position: unset;
    background: none;
  }
  @media only screen and (min-width: ${breakpoint.large}) {
    position: relative;
  }
`;

const Pagination = styled.p`
  position: absolute;
  left: calc(50% - 259px / 2);
  top: 2rem;
  font-size: 1rem;
  text-align: center;
  strong {
    font-weight: 500;
    padding: 0.125rem;
    border-radius: 0.125rem;
    background-color: ${colors.lightBlue};
    &:nth-child(2) {
      background-color: ${colors.lightRed};
    }
  }
`;

const Button = styled.button`
  ${buttonBase};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.175rem;
  border: 0.125rem solid ${colors.midBlue};
  ${({ direction }) =>
    direction === "left"
      ? "padding-right: 1rem"
      : direction === "right"
      ? `
  padding-left: 1rem;
  margin-left: auto;
  `
      : ""};
  color: ${colors.midBlue};
  background-color: ${colors.lightBlue};
  &:focus,
  &:hover,
  &:active {
    background-color: ${colors.midBlue};
    color: ${colors.white};
    svg {
      fill: ${colors.white};
    }
  }
  svg {
    fill: ${colors.midBlue};
    transition: all ease-in-out 0.3s;
  }
`;

// TODO:
// - go to top of page when changing pages
const PageNav = ({ logs, low, high, handlePageChange }) => {
  const { isWidth: isDesktop } = useIsWidth("large");
  const buttons = {
    older: {
      condition: high < logs.length,
      direction: "left",
    },
    newer: {
      condition: low >= 50,
      direction: "right",
    },
  };

  return (
    <NavContainer>
      {isDesktop && (
        <Pagination>
          Showing <strong>{`${logs.length - high >= 0 ? logs.length - high : 0}`}</strong> to{" "}
          <strong>{`${logs.length - low}`}</strong> {`of ${logs.length} logs.`}
        </Pagination>
      )}
      {Object.keys(buttons).map(i => {
        const { condition, direction } = buttons[i];
        return (
          condition && (
            <Button key={i} onClick={() => handlePageChange(i)} direction={direction}>
              {direction === "right" && i}
              <Chevron fill={"unset"} title={`${i} entries`} direction={direction} />
              {direction === "left" && i}
            </Button>
          )
        );
      })}
    </NavContainer>
  );
};

export default PageNav;
