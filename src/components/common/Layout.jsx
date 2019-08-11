import styled, { css } from "styled-components";
import { colors, spacing } from "./styleVars";

const searchResultText = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: ${spacing.large};
`;

const ContainerStyle = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: ${spacing.xLarge} 0;
  > section {
    display: block;
    padding-bottom: ${spacing.xLarge};
    margin-bottom: ${spacing.xLarge};
    border-bottom: ${spacing.xSmall} solid ${colors.midGrey};
  }
`;

export { searchResultText, ContainerStyle };
