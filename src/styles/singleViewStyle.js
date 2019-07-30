import styled from "styled-components";
import { colors, spacing, fontSize, fontWeight, breakpoint } from "./styleVars";

const LogContainer = styled.div`
  margin-top: ${spacing.xLarge};
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  border: ${spacing.xSmall} solid ${colors.midGrey};
  border-radius: ${spacing.xSmall};
  background-color: ${colors.lightGrey};
  @media only screen and (min-width: ${breakpoint.small}) {
    flex-direction: row;
    > button,
    > div {
      flex: 1;
    }
  }
`;

const LogContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${spacing.large} ${spacing.med} ${spacing.xLarge};
  font-size: ${fontSize.small};
  h1 {
    font-size: ${fontSize.large};
    padding-left: calc(36px + 1rem);
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    flex: 8;
    padding: ${spacing.large};
    font-size: ${fontSize.med};
    h1 {
      font-size: ${fontSize.xLarge};
      padding-left: 0;
    }
  }
`;

const LogList = styled.ul`
  li {
    display: flex;
    align-items: center;
    margin-top: ${spacing.med};
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      align-items: flex-start;
    }
    svg {
      min-width: 36px;
      margin-right: ${spacing.large};
    }
    strong {
      font-weight: ${fontWeight.bold};
    }
  }
`;

const EditButtons = styled.div`
  display: flex;
  @media only screen and (min-width: ${breakpoint.small}) {
    flex-direction: column;
  }
`;

export { LogContainer, LogContent, LogList, EditButtons };
