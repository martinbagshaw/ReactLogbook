import React, { useState, useEffect } from "react";
require("matchmedia-polyfill");
require("matchmedia-polyfill/matchMedia.addListener");

import { breakpoint } from "./styleVars";

const useIsWidth = width => {
  const check = matchMedia(`(min-width: ${breakpoint[width]})`);
  const [state, setState] = useState(check);

  const checkIsWidth = () => {
    if (state !== check.matches) {
      setState(check.matches);
    }
  };

  useEffect(() => {
    check.addListener(checkIsWidth);
    return () => {
      check.removeListener(checkIsWidth);
    };
  });

  checkIsWidth();
  return { isWidth: check.matches };
};

export default useIsWidth;
