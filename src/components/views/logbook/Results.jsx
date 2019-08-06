import React from "react";
import styled from "styled-components";
import { colors, spacing, fonts, fontSize, fontWeight } from "../../common/styleVars";
import { buttonBase } from "../../common/Buttons.jsx";

const ResultsList = styled.ul`
  margin-top: ${spacing.xLarge};
  li {
    width: 100%;
  }
`;

// todo:
// - split up this button, see if spans in search results can be aligned to these
const ListButton = styled.button`
  ${buttonBase};
  font-size: ${fontSize.small};
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  border: ${spacing.xSmall} solid transparent;
  border-radius: ${spacing.xSmall};
  padding: ${spacing.med} ${spacing.large};
  background-color: transparent;
  &:hover {
    background-color: ${colors.lightGrey};
    border-color: ${colors.midGrey};
  }
  span:nth-child(1) {
    margin-right: ${spacing.large};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 3;
    strong {
      font-weight: ${fontWeight.med};
    }
  }
  span:nth-child(2) {
    margin-right: ${spacing.large};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 2;
  }
  span:nth-child(3) {
    margin-left: ${spacing.large};
    font-weight: ${fontWeight.bold};
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  svg {
    fill: transparent;
    transition: all ease-in-out 0.3s;
  }
  &:hover svg {
    fill: ${colors.black};
  }
`;

const Results = ({ logs, low, high, onClick }) => {
  return (
    <ResultsList>
      {logs.slice(low, high).map(log => (
        <li key={log.key}>
          <ListButton onClick={() => onClick(log.key)}>
            <span>
              <strong>{log.climbName}</strong> - {log.grade}
            </span>{" "}
            <span>
              {log.style} - {log.cragName}
            </span>
            <span>
              {log.date}
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
              </svg>
            </span>
          </ListButton>
        </li>
      ))}
    </ResultsList>
  );
};

export default Results;
