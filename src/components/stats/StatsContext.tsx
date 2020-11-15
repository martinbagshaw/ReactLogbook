import React, { Dispatch, Reducer, FC, createContext, useReducer } from "react";
interface ContextProps {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}
export const StatsContext = createContext({} as ContextProps);

type StateType = {
  activeArcIndex: number | undefined;
};
type ActionType = {
  payload: undefined | number;
  type: string;
};

const initialState: StateType = {
  activeArcIndex: undefined,
};

const reducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "activeArcIndex":
      return { ...state, activeArcIndex: action.payload };
    default:
      console.error("Context Error: No cases found:", action.type);
      return { ...state };
  }
};

type Props = {
  init?: StateType;
};
export const StatsContextProvider: FC<Props> = ({ init = initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  const value = { state, dispatch };
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};
