import React from "react";

import Chevron from "./Chevron";
import Comment from "./Comment";
import Date from "./Date";
import GradeCircle from "./GradeCircle";
import Location from "./Location";
import Partner from "./Partner";
import Style from "./Style";

type IconOptions = "chevron" | "comment" | "cragName" | "date" | "grade" | "partners" | "style";
type Icons = {
  [key in IconOptions]: JSX.Element;
}

const iconFunc = (item: IconOptions, props?: object): JSX.Element => {
  const icons: Icons = {
    chevron: <Chevron {...props} />,
    comment: <Comment {...props} />,
    cragName: <Location {...props} />,
    date: <Date {...props} />,
    grade: <GradeCircle {...props} />,
    partners: <Partner {...props} />,
    style: <Style {...props} />,
  };
  return icons[item];
};

export { iconFunc };