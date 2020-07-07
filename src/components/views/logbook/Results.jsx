import React from "react";
import styled from "styled-components";
import { colors, spacing, fontSize, fontWeight } from "../../common/styleVars";
import { searchResultText } from "../../common/Layout.jsx";
import { buttonBase } from "../../common/Buttons.jsx";

const ResultsList = styled.ul`
  margin-top: ${spacing.xLarge};
  li {
    width: 100%;
  }
`;

const ListButton = styled.button`
  ${buttonBase};
  font-size: ${fontSize.small};
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: ${spacing.med} ${spacing.large};
  border: ${spacing.xSmall} solid transparent;
  border-radius: ${spacing.xSmall};
  background-color: transparent;
  &:hover {
    background-color: ${colors.lightGrey};
    border-color: ${colors.midGrey};
  }
  svg {
    fill: transparent;
    transition: all ease-in-out 0.3s;
  }
  &:hover svg {
    fill: ${colors.black};
  }
`;

const Climb = styled.span`
  ${searchResultText};
  flex: 3;
  strong {
    font-weight: ${fontWeight.med};
  }
`;

const Crag = styled.span`
  ${searchResultText};
  flex: 2;
`;

const Date = styled.span`
  margin-left: ${spacing.large};
  font-weight: ${fontWeight.bold};
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Results = ({ logs, low, high, onClick }) => {
  return (
    <ResultsList>
      {logs.slice(low, high).map(log => (
        <li key={log.key}>
          <ListButton onClick={() => onClick(log.key)}>
            <Climb>
              <strong>{log.climbName}</strong> - {log.grade}
            </Climb>{" "}
            <Crag>
              {log.style} - {log.cragName}
            </Crag>
            <Date>
              {log.date.original}
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z" />
              </svg>
            </Date>
          </ListButton>
        </li>
      ))}
    </ResultsList>
  );
};

export default Results;
