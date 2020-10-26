import React, { FC } from "react";
import styled from "styled-components";
import { colors, spacing } from "../common/styleVariables";

const Button = styled.button<{ readonly icon: string }>`
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
  border: ${spacing.xSmall} solid ${({ icon }) => colors[icon === "star" ? "yellow" : "midBlue"]};
  background-color: ${({ icon }) => colors[icon === "star" ? "lightYellow" : "lightBlue"]};
  svg {
    fill: ${({ icon }) => colors[icon === "star" ? "yellow" : "midBlue"]};
    transition: all ease-in-out 0.3s;
  }
  &:focus,
  &:hover {
    outline: none;
    background-color: ${({ icon }) => colors[icon === "star" ? "yellow" : "midBlue"]};
    svg {
      fill: ${colors.white};
    }
  }
`;

interface Types {
  [key: string]: string;
}
const types: Types = {
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  notes:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
};
interface Props {
  icon: string;
  title: string;
}
const UpdateButton: FC<Props> = ({ icon, title }): JSX.Element => {
  return (
    <Button icon={icon} title={title}>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d={types[icon]} />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </Button>
  );
};

export default UpdateButton;
