import React from "react";
import styled, { css } from "styled-components";
import { fonts, fontSize, fontWeight, colors, spacing } from "./styleVars";

const buttonBase = css`
  user-select: none;
  cursor: pointer;
  border: 0;
  transition: all ease-in-out 0.3s;
  font-family: ${fonts.main};
  font-weight: ${fontWeight.med};
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  ${buttonBase};
  font-size: ${fontSize.small};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.small};
  padding: ${props => (props.hasPadding ? spacing[props.hasPadding] : 0)};
  ${props => (props.text === "older" ? `padding-right: ${spacing.large} ` : "")};
  ${props =>
    props.text === "newer"
      ? `
  padding-left: ${spacing.large};
  margin-left: auto;
  `
      : ""}
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

const NavButton = ({ onClick, text, hasPadding }) => {
  return (
    <Button onClick={onClick} text={text} hasPadding={hasPadding} aria-label={text}>
      {(text === "older" || text === "back") && (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <title>{text === "older" ? `${text} entries` : `${text} to all entries`}</title>
          <path d="M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z" />
        </svg>
      )}
      {text !== "back" && text}
      {text === "newer" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <title>{`${text} entries`}</title>
          <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
        </svg>
      )}
    </Button>
  );
};

export { buttonBase, NavButton };
