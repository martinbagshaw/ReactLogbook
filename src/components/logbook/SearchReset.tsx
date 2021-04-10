import React, { useCallback, useEffect, useRef, FC } from "react";

interface Props {
  onClose: () => void;
}

export const SearchReset: FC<Props> = ({ onClose }) => {
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
      // Reset if no value is in the search bar with !e.target.value
      if (ref.current && !ref.current.contains(e.target) && !e.target.value) {
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
  return <div ref={ref} />;
};
