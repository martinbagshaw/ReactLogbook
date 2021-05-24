import React, { FC } from "react";

export interface IconTypes {
  star: string;
  notes: string;
}

// interface Types {
//   [key: string]: string;
// }

const iconTypes: IconTypes = {
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  notes:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
};

interface IconProps {
  icon: keyof IconTypes;
  width?: number;
}

const Icon: FC<IconProps> = ({ icon, width = 36 }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 24 24`}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d={iconTypes[icon]} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export { Icon };
