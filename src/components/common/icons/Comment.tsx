import React, { FC } from "react";
import { colors } from "../styleVariables";

interface Props {
  fill?: string;
  title?: string;
  width?: string;
}

const Comment: FC<Props> = ({
  fill = colors.darkGrey,
  title = "Comments",
  width = "36",
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      style={{
        width,
        transformOrigin: "50% 50%",
      }}
    >
      <title>{title}</title>
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

export default Comment;
