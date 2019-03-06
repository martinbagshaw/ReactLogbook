// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, fontWeight, boxShadow } = styleVars;

const ResultContainer = styled.div`
  display: flex;
  margin-top: ${spacing.large};
  margin-bottom: -${spacing.large};
  border: ${spacing.small} solid ${colors.red};
  // box-shadow: ${boxShadow.red};
  > div {
    display: flex;
    padding: ${spacing.xLarge} ${spacing.large};
    box-sizing: border-box;
  }
  > div:nth-child(1) {
    align-items: center;
    justify-content: center;
    width: 25%;
    flex-basis: 25%;
    position: relative;
    background: ${colors.midGrey};
    color: ${colors.black};
    font-size: ${fontSize.xxSmall};
    cursor: pointer;
    pointer-events: all;
    overflow: hidden;
  }
  > div:nth-child(2) {
    flex-basis: 75%;
    flex-direction: column;
  }
`;
export { ResultContainer };
