import React, { useCallback, useEffect, useRef, FC } from "react";

interface Props {
  onClose: () => void;
}

const SearchReset: FC<Props> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const escapeListener = useCallback(
    e => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  const clickListener = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    },
    [onClose, ref]
  );
  useEffect(() => {
    // mount
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    // unmount
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, [clickListener, escapeListener]);
  return <div ref={ref}/>;
};

export default SearchReset;
