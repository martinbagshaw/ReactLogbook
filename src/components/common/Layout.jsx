import styled, { css } from "styled-components";
import { breakpoint, colors } from "./styleVars";

// put in a typography file instead:
const searchResultText = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 1rem;
`;
// remove?
const ContainerStyle = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 0;
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 2rem 0;
  }
  > section {
    display: block;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 0.125rem solid ${colors.midGrey};
  }
`;

export { searchResultText, ContainerStyle };
