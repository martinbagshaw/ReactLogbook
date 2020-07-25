import { css } from "styled-components";
import { fonts } from "./styleVars";

const buttonBase = css`
  user-select: none;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  transition: all ease-in-out 0.3s;
  font-family: ${fonts.main};
  font-weight: 500;
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  &:focus {
    outline: none;
  }
`;

export { buttonBase };