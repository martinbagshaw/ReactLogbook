import { useState, useEffect } from "react";
require("matchmedia-polyfill");
require("matchmedia-polyfill/matchMedia.addListener");
import { breakpoint } from "./styleVariables";

import { Breakpoints } from "../../utils/types";

type WidthType = {
  isWidth: boolean
}
const useIsWidth = (width: Breakpoints): WidthType => {
  const check = matchMedia(`(min-width: ${breakpoint[width]})`);
  const [state, setState] = useState<MediaQueryList | boolean>(check);

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
