import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fonts, fontSize, fontWeight } = styleVars;

const SingleStyle = styled.div`
  margin-top: ${spacing.xLarge};
  display: flex;
  vertical-align: middle;
  border: ${spacing.xSmall} solid ${colors.midGrey};
  border-radius: ${spacing.xSmall};
  background-color: ${colors.lightGrey};
  > button,
  > div {
    flex: 1;
  }
  > div {
    display: flex;
    flex-direction: column;
  }
  section {
    flex: 8;
    display: flex;
    flex-direction: column;
    padding: ${spacing.large};
    font-size: ${fontSize.med};
    h1 {
      font-size: ${fontSize.xLarge};
    }
    ul li {
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
  }
`;

// no text, just svgs
const SingleBtnStyle = styled.button`
  user-select: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50%;
  margin: -${spacing.xSmall};
  border-radius: ${spacing.small};
  border: ${spacing.xSmall} solid
    ${props => (props.type === "star" ? `${colors.yellow}` : `${colors.midBlue}`)};
  background-color: ${props =>
    props.type === "star" ? `${colors.lightYellow}` : `${colors.lightBlue}`};
  svg {
    fill: ${props => (props.type === "star" ? `${colors.yellow}` : `${colors.midBlue}`)};
    transition: all ease-in-out 0.3s;
  }
  &:focus,
  &:hover {
    outline: none;
    background-color: ${props =>
      props.type === "star" ? `${colors.yellow}` : `${colors.midBlue}`};
    svg {
      fill: ${colors.white};
    }
  }
`;
export { SingleStyle, SingleBtnStyle };
