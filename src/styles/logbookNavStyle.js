import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fonts, fontSize, fontWeight, boxShadow } = styleVars;

// older / newer buttons
const BtnContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacing.large};
`;

const BtnStyle = styled.button`
  user-select: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1;
  display: flex;
  align-items: center;
  border: ${spacing.xSmall} solid ${colors.midBlue};
  border-radius: ${spacing.small};
  padding: 0;
  ${props => (props.text === "older" ? `padding-right: ${spacing.large} ` : "")};
  ${props => (props.text === "newer" ? `padding-left: ${spacing.large} ` : "")};
  background-color: ${colors.lightBlue};
  color: ${colors.midBlue};
  &:focus,
  &:hover {
    outline: none;
    background-color: ${colors.midBlue};
    color: ${colors.white};
    svg {
      fill: ${colors.white};
      transition: fill ease-in-out 0.3s;
    }
  }
  svg {
    fill: ${colors.midBlue};
  }
`;

export { BtnContainerStyle, BtnStyle };
