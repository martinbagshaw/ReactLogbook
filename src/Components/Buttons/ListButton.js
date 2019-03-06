import React from "react";

const ListButton = props => {
  // get button text and icon
  const { text, icon } = props.data;

  // find out if the button is active or not
  const isActive = props.active === text.toLowerCase() ? true : false;

  return (
    <button
      className={isActive ? "active" : "inactive"}
      onClick={() => {
        props.onClick(text);
      }}
    >
      {text}
      {icon}
    </button>
  );
};

export default ListButton;
