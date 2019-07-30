import styled from "styled-components";
import { colors, spacing, fonts, fontSize, fontWeight, boxShadow, breakpoint } from "./styleVars";

// search container
const SearchStyle = styled.div`
  position: relative;
  display: block;
  margin: 0 auto ${spacing.xLarge};
  width: 100%;
  max-width: 40rem;
  padding: 0 ${spacing.med};
  @media only screen and (min-width: ${breakpoint.small}) {
    padding: 0;
  }
`;

// - include datalist + button?
const LabelStyle = styled.label`
  font-family: ${fonts.main};
  font-size: ${fontSize.small};
  display: block;
  visibility: hidden;
  height: 0;
`;

const SearchBarStyle = styled.input`
  padding: ${spacing.large};
  width: 100%;
  font-family: ${fonts.main};
  font-size: ${fontSize.med};
  font-weight: ${fontWeight.med};
  border: 0;
  text-align: center;
  transition: all ease-in-out 0.5s;
  border-bottom: ${spacing.small} solid ${colors.darkGrey};
  color: ${colors.darkGrey};
  &::placeholder {
    color: ${colors.darkGrey};
  }
  &:focus {
    outline: 0;
    border-bottom-color: ${colors.black};
    color: ${colors.black};
  }
  &:disabled {
    border-bottom-color: ${colors.midGrey};
    color: ${colors.midGrey};
    cursor: not-allowed;
    &::placeholder {
      color: ${colors.midGrey};
    }
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    font-size: ${fontSize.large};
  }
`;

const SearchList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 65vh;
  overflow-y: scroll;
  box-shadow: ${boxShadow.top};
`;

const SearchListButton = styled.button`
  border: 0;
  box-shadow: none;
  width: 100%;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  display: flex;
  align-items: center;
  font-family: ${fonts.main};
  font-size: ${fontSize.med};
  text-align: left;
  padding: ${spacing.med} ${spacing.large};
  background-color: ${colors.lightGrey};
  border-bottom: ${spacing.xSmall} solid ${colors.midGrey};
  &:hover {
    background-color: ${colors.lightBlue};
    border-bottom-color: ${colors.midBlue};
  }
  &:focus {
    outline: none;
  }
  span:nth-child(1) {
    margin-right: ${spacing.large};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: ${fontWeight.med};
    flex: 3;
  }
  span:nth-child(2) {
    margin-right: ${spacing.large};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 2;
  }
  span:nth-child(3) {
    margin-left: auto;
    font-weight: ${fontWeight.bold};
  }
`;

export { SearchBarStyle, LabelStyle, SearchStyle, SearchList, SearchListButton };
