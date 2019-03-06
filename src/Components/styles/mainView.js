// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fonts, fontSize, fontWeight, boxShadow } = styleVars;

// main view elements
// 1. app
// 2. search bar
// 3. button container
// 4. unordered list

// 1.
const AppContainer = styled.div`
  display: block;
  margin: ${spacing.xLarge} auto;
  max-width: 50rem;
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  line-height: 1.4;
`;

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

export { AppContainer, SearchContainer, ButtonContainer, ListContainer };
