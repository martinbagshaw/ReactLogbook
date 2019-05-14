// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fonts, fontSize, fontWeight, boxShadow } = styleVars;

const BaseStyle = styled.div`
  margin: 0;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1.4;
`;

const HeaderStyle = styled.header`
  button {
    margin: 0;
    padding: ${spacing.xLarge};
    box-shadow: 0;
    cursor: pointer;
    width: 50%;
    font-family: ${fonts.main};
    font-size: ${fontSize.med};
    font-weight: ${fontWeight.med};
    letter-spacing: 0.05rem;
    transition: all ease-in-out 0.3s;
    background-color: ${colors.lightGrey};
    border: 0;
    border-bottom: ${spacing.small} solid ${colors.midGrey};
    > span {
      user-select: none;
      max-width: 23rem;
      display: block;
    }
    &:first-child > span {
      text-align: center;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: ${colors.midGrey};
    }
    &.active {
      background-color: ${colors.lightRed};
      border-bottom-color: ${colors.red};
    }
  }
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

export { BaseStyle, HeaderStyle, ContainerStyle };
