import React from "react";
import { NavButton } from "../../common/Buttons.jsx";

import styled from "styled-components";
import { spacing, breakpoint } from "../../common/styleVars";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacing.large};
  padding: 0 ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 0;
  }
`;

const PageNav = ({ logs, low, high, onClick }) => {
  return (
    <NavContainer>
      {high < logs.length && (
        <NavButton onClick={() => onClick({ low: (low += 50), high: (high += 50) })} text="older" />
      )}
      {low >= 50 && (
        <NavButton onClick={() => onClick({ low: (low -= 50), high: (high -= 50) })} text="newer" />
      )}
    </NavContainer>
  );
};

export default PageNav;
