import React, { FC, createContext, useReducer } from "react";

interface ContextProps {
  state: any;
  dispatch: ({ type }: { type: string }) => void;
}
let StatsContext = createContext<{}>({} as ContextProps);

type InitialStateType = {
  activeArcIndex: undefined | number;
};
let initialState: InitialStateType = {
  activeArcIndex: undefined,
};

type ActionType = {
  payload: undefined | number;
  type: string;
};

let reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "activeArcIndex":
      return { ...state, activeArcIndex: action.payload };
    default:
      console.error("Context Error: No cases found:", action.type);
      return { ...state };
  }
};

type Props = {
  init?: InitialStateType;
};
const StatsContextProvider: FC<Props> = ({ init = initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  const value = { state, dispatch };
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

const StatsContextConsumer = StatsContext.Consumer;

export { StatsContext, StatsContextProvider, StatsContextConsumer };
