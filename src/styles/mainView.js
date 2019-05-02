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
  background-color: ${colors.white};
  border-bottom: ${spacing.xSmall} solid ${colors.midGrey};
  > div {
    max-width: 50rem;
    margin: 0 auto;
    display: flex;
  }
  button {
    margin: 0;
    padding: ${spacing.xLarge} 0;
    border: 0;
    box-shadow: 0;
    cursor: pointer;
    width: 50%;
    font-family: ${fonts.main};
    font-size: ${fontSize.small};
    border-bottom: ${spacing.small} solid transparent;
    transition: all ease-in-out 0.3s;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: ${colors.lightGrey};
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

const UlStyle = styled.ul`
  margin-top: ${spacing.large};
`;

const LiStyle = styled.li`
  margin-top: ${spacing.small};
  padding-top: ${spacing.small};
  border-top: ${spacing.xSmall} solid ${colors.midGrey};
  > span {
    font-weight ${fontWeight.med};
    margin-left: ${spacing.med};
  }
`;

const BtnContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${spacing.large};
`;
const BtnStyle = styled.button`
  margin-right: ${spacing.large};
  
  display: flex;
  align-items: center;
  border: 0;
  ${props => (props.text === "prev" ? `padding-right: ${spacing.large} ` : "")};
  ${props => (props.text === "next" ? `padding-left: ${spacing.large} ` : "")};
  line-height: 1;
  font-size: ${fontSize.small}
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  border-radius: ${spacing.small};
  background-color: ${colors.red};
  color: ${colors.white};
  &:focus,
  &:hover {
    outline: none;
    background-color: ${colors.darkRed};
  }
  svg {
    fill: ${colors.white};
  }

`;

// main view elements
// 1. app
// 2. search bar
// 3. button container
// 4. unordered list

// 1.
// 2.
const SearchContainer = styled.input`
  list-style: none;
  display: block;
  margin: 0 auto;
  padding: ${spacing.large};
  border: ${spacing.large} solid ${colors.lightGrey};
  border-radius: ${spacing.med};
  text-align: center;
  font-size: ${fontSize.xLarge};
  font-weight: ${fontWeight.light};
  outline: 0;
  box-shadow: ${boxShadow.inset};
  transition: 1s;
  &:focus {
    border: ${spacing.large} solid ${colors.red};
    color: ${colors.red};
  }
`;

// 3.
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 25rem;
  margin: ${spacing.large} auto;
  border: 1px solid ${colors.midGrey};
  // all buttons
  button {
    border: 0;
    padding: ${spacing.large} ${spacing.xLarge};
    line-height: 1;
    font-weight: ${fontWeight.med};
    font-size: ${fontSize.small}
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    // active
    &.active {
      background-color: ${colors.red};
      color: ${colors.white};
    }
  }
  // back button
  > button {
    flex-basis: 25%;
  }
  // right hand column buttons
  > div {
    display: flex;
    flex-basis: 75%;
    button {
      flex-basis: 50%;
    }
  }
`;

// 4.
const ListContainer = styled.ul`
  display: block;
  margin: ${spacing.large} auto 0;
  max-width: 25rem;
  border: 1px solid ${colors.midGrey};
  li {
    display: flex;
    background: ${colors.white};
    border-bottom: 1px solid ${colors.midGrey};
    box-shadow: ${boxShadow.top};
    transition: background 0.2s;
    cursor: pointer;
    transition: linear-gradient 0.5s;
    > div {
      pointer-events: none;
      padding: ${spacing.xLarge} ${spacing.large};
      box-sizing: border-box;
      &:nth-child(1) {
        flex-basis: 25%;
        width: 25%;
        background: ${colors.midGrey};
        font-size: ${fontSize.xxSmall};
      }
      &:nth-child(2) {
        flex-basis: 65%;
      }
      &:nth-child(3) {
        flex-basis: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export {
  BaseStyle,
  HeaderStyle,
  ContainerStyle,
  UlStyle,
  LiStyle,
  BtnContainerStyle,
  BtnStyle,
  SearchContainer,
  ButtonContainer,
  ListContainer,
};
