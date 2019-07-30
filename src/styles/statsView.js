import styled from "styled-components";
import { colors, spacing, fonts, fontSize, fontWeight, boxShadow, breakpoint } from "./styleVars";

const StatContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: ${spacing.xLarge} ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: ${spacing.large} 0;
  }
`;

const StatMenu = styled.section`
  display: flex;
  padding-bottom: ${spacing.large};
  margin-bottom: ${spacing.large};
  justify-content: space-between;
  align-items: center;
  > div:nth-child(1) {
    padding: ${spacing.small} ${spacing.med};
    border-bottom: ${spacing.xSmall} solid ${colors.black};
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
  }
  strong {
    font-weight: ${fontWeight.bold};
  }
  select {
    margin-left: ${spacing.med};
  }
`;

export { StatContainer, StatMenu };
