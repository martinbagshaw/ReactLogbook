import styled from "styled-components";
import { colors, spacing, fonts, fontSize, fontWeight, boxShadow, breakpoint } from "./styleVars";

// older / newer buttons
const BtnContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacing.large};
  padding: 0 ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 0;
  }
`;

// NOTE: used in single view also
const BtnStyle = styled.button`
  user-select: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.small};
  padding: ${props => (props.hasPadding ? spacing[props.hasPadding] : 0)};
  ${props => (props.text === "older" ? `padding-right: ${spacing.large} ` : "")};
  ${props => (props.text === "newer" ? `padding-left: ${spacing.large} ` : "")};
  //
  // back button differences
  //
  ${props => (props.text === "back" ? `margin: -${spacing.xSmall}` : "")};
  ${props => (props.text !== "back" ? `color: ${colors.midBlue}` : "")};
  border: ${props => (props.text !== "back" ? `${spacing.xSmall} solid ${colors.midBlue}` : "0")};
  background-color: ${props =>
    props.text !== "back" ? `${colors.lightBlue}` : `${colors.midGrey}`};
  &:focus,
  &:hover {
    outline: none;
    background-color: ${props =>
      props.text !== "back" ? `${colors.midBlue}` : `${colors.darkGrey}`};
    color: ${colors.white};
    svg {
      fill: ${colors.white};
    }
  }
  svg {
    fill: ${props => (props.text === "back" ? `${colors.darkGrey}` : `${colors.midBlue}`)};
    transition: all ease-in-out 0.3s;
  }
`;

export { BtnContainerStyle, BtnStyle };
