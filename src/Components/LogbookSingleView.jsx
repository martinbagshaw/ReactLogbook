import React from "react";
import { LogbookNavButton } from "./LogbookNavButton.jsx";
import { LogbookSingleButton } from "./LogbookSingleButton.jsx";
import { SingleStyle } from "../styles/singleViewStyle";

// combine these
import { Circle } from "../icons/Circle.jsx";
import { Place } from "../icons/Place.jsx";
import { Style } from "../icons/Style.jsx";
import { Date } from "../icons/Date.jsx";
import { Partner } from "../icons/Partner.jsx";
import { Comment } from "../icons/Comment.jsx";

// TODO:
// - onClick for star and notes / memorable buttons
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
    <SingleStyle>
      <LogbookNavButton onClick={() => onClick(null)} text="back" />
      <section>
        <h1>{climbName}</h1>
        <ul>
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
        </ul>
      </section>
      <div>
        <LogbookSingleButton type="star" title="star this ascent" />
        <LogbookSingleButton type="notes" title="add notes to this ascent" />
      </div>
    </SingleStyle>
  );
};
