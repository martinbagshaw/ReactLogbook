import React from "react";
import styled from "styled-components";
import { colors, spacing, fontSize, fontWeight, breakpoint } from "../../common/styleVars";
import { NavButton } from "../../common/Buttons.jsx";
import IconButton from "./IconButton.jsx";
import { Circle, Place, Style, Date, Partner, Comment } from "../../common/icons/Icons.jsx";

const LogContainer = styled.div`
  margin-top: ${spacing.xLarge};
  display: flex;
  flex-direction: column;
  border: ${spacing.xSmall} solid ${colors.midGrey};
  border-radius: ${spacing.xSmall};
  background-color: ${colors.lightGrey};
  @media only screen and (min-width: ${breakpoint.small}) {
    flex-direction: row;
    > button,
    > div {
      flex: 1;
    }
  }
`;

const LogContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${spacing.large} ${spacing.med} ${spacing.xLarge};
  font-size: ${fontSize.small};
  h1 {
    font-size: ${fontSize.large};
    padding-left: calc(36px + 1rem);
  }
  @media only screen and (min-width: ${breakpoint.small}) {
    flex: 8;
    padding: ${spacing.large};
    font-size: ${fontSize.med};
    h1 {
      font-size: ${fontSize.xLarge};
      padding-left: 0;
    }
  }
`;

const LogList = styled.ul`
  li {
    display: flex;
    align-items: center;
    margin-top: ${spacing.med};
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      align-items: flex-start;
    }
    svg {
      min-width: 36px;
      margin-right: ${spacing.large};
    }
    strong {
      font-weight: ${fontWeight.bold};
    }
  }
`;

const EditButtons = styled.div`
  display: flex;
  @media only screen and (min-width: ${breakpoint.small}) {
    flex-direction: column;
  }
`;

// TODO:
// - onClick for star and notes / memorable buttons. Where to put logic?
// - map through fields
// - smooth animation (slide in from left, see dmarc site css animation)
const SingleLog = ({ climbName, cragName, date, grade, notes, partners, style, onClick }) => {
  return (
    <LogContainer>
      <NavButton onClick={() => onClick(null)} text="back" hasPadding={"med"} />
      <LogContent>
        <h1>{climbName}</h1>
        <LogList>
          <li>
            <Circle grade={grade} /> {grade}
          </li>
          <li>
            <Place cragName={cragName} />
            {cragName}
          </li>
          <li>
            <Style style={style} />
            {style}
          </li>
          <li>
            <Date date={date} />
            <strong>{date}</strong>
          </li>
          <li>
            <Partner partners={partners} />
            {partners}
          </li>
          {notes && (
            <li>
              <Comment />
              {notes}
            </li>
          )}
        </LogList>
      </LogContent>
      <EditButtons>
        <IconButton type="star" title="star this ascent" />
        <IconButton type="notes" title="add notes to this ascent" />
      </EditButtons>
    </LogContainer>
  );
};

export default SingleLog;
