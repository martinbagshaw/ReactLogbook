import React, { useCallback, useEffect, useRef, useState, Fragment } from "react";

const SearchReset = ({ onClose, children }) => {
  const ref = useRef(null);
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
  return <div ref={ref}>{children}</div>;
};

export default SearchReset;
