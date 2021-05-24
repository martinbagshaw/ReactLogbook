import React, { FC } from "react";
import { gradeBands } from "../../../utils/get-gradebands";

interface Props {
  fill?: string;
  title?: string;
  width?: string;
}

const GradeCircle: FC<Props> = ({ title = "Grade marker", width = "36" }): JSX.Element => {
  // get the fill colour from the grade
  const [getGrade] = title.split(" ");
  const { band: fillColor } = gradeBands[getGrade];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill={fillColor}
      style={{
        width,
        transformOrigin: "50% 50%",
      }}
    >
      <title>Grade: {title}</title>
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" />
    </svg>
  );
};

export default GradeCircle;
