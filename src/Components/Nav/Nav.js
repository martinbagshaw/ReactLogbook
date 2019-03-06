import React from "react";

// import and combine all components here
import ListButton from "../Buttons/ListButton";

// get list styles
import { ButtonContainer } from "../styles/mainView";

// add info to buttons
const buttons = {
  back: {
    text: "Back",
    icon: "<",
  },
  fave: {
    text: "Fave",
    icon: "+",
  },
  mem: {
    text: "Mem",
    icon: "*",
  },
};

const Nav = props => {
  // props control the active state and clicks
  const { onClick, active } = props;
  // console.log(onClick);

  // match active from props to button text
  // - should add this in conditionally
  const activeButton = Object.keys(buttons).find(item => item === active.toLowerCase());

  return (
    <ButtonContainer>
      <ListButton data={buttons.back} onClick={onClick} active={activeButton} />
      <div>
        <ListButton data={buttons.fave} onClick={onClick} active={activeButton} />
        <ListButton data={buttons.mem} onClick={onClick} active={activeButton} />
      </div>
    </ButtonContainer>
  );
};

export default Nav;
