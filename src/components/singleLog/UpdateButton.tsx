import React, { FC } from "react";
import styled from "styled-components";
import { colors, spacing } from "../common/styleVariables";
import { Icon, IconTypes } from "../common/icons/Icon";

const getBgColour = (icon: string, isActive: boolean) => {
  let key: typeof colors;
  if (icon === "star") {
    key = `${isActive ? "yellow" : "lightYellow"}`;
  } else {
    key = `${isActive ? "midBlue" : "lightBlue"}`;
  }
  return colors[key];
};

const Button = styled.button<{ readonly icon: string; isActive: boolean }>`
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
  background-color: ${({ icon, isActive }) => getBgColour(icon, isActive)};
  svg {
    fill: ${({ icon, isActive }) =>
      colors[isActive ? "white" : icon === "star" ? "yellow" : "midBlue"]};
    transition: all ease-in-out 0.3s;
  }
  &:hover {
    outline: none;
    background-color: ${({ icon }) => colors[icon === "star" ? "yellow" : "midBlue"]};
    svg {
      fill: ${colors.white};
    }
  }
`;
interface ButtonProps {
  icon: string;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  index?: string;
}

const UpdateButton: FC<ButtonProps> = ({ icon, title, isActive, onClick }): JSX.Element => {
  return (
    <Button icon={icon} title={title} isActive={Boolean(isActive)} onClick={onClick}>
      <Icon icon={icon as keyof IconTypes} />
    </Button>
  );
};

export default UpdateButton;
