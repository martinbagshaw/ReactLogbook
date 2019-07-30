import React from "react";
import styled from "styled-components";
import { colors, spacing } from "../../styles/styleVars";

const IconStyle = styled.button`
  user-select: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50%;
  margin: -${spacing.xSmall};
  padding: ${spacing.med};
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

// star and notes button
export const IconButton = ({ type, title }) => {
  return (
    <IconStyle type={type} title={title}>
      {type === "star" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      )}
      {type === "notes" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      )}
    </IconStyle>
  );
};
