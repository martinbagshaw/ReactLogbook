import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fonts, fontSize, fontWeight, boxShadow } = styleVars;

// search container
const SearchStyle = styled.div`
  position: relative;
  display: block;
  margin: 0 auto ${spacing.xLarge};
  width: 100%;
  max-width: 40rem;
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
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.med};
  border: 0;
  border-bottom: ${spacing.small} solid ${colors.midGrey};
  color: ${colors.midGrey};
  text-align: center;
  outline: 0;
  transition: 1s;
  &:focus {
    border-bottom: ${spacing.small} solid ${colors.black};
    color: ${colors.black};
  }
`;

const SearchList = styled.ul`
  position: absolute;
  width: 100%;
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
