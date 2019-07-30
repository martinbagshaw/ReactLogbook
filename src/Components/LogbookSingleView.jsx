import React from "react";
import { LogbookNavButton } from "./LogbookNavButton.jsx";
import { IconButton } from "./Buttons/IconButton.jsx";
import { LogContainer, LogContent, LogList, EditButtons } from "../styles/singleViewStyle";

// combine these
import { Circle } from "../icons/Circle.jsx";
import { Place } from "../icons/Place.jsx";
import { Style } from "../icons/Style.jsx";
import { Date } from "../icons/Date.jsx";
import { Partner } from "../icons/Partner.jsx";
import { Comment } from "../icons/Comment.jsx";

// TODO:
// - onClick for star and notes / memorable buttons
// - map through fields
export const LogbookSingleView = ({
  climbName,
  cragName,
  date,
  grade,
  notes,
  partners,
  style,
  onClick,
}) => {
  return (
    <LogContainer>
      <LogbookNavButton onClick={() => onClick(null)} text="back" hasPadding={"med"} />
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
