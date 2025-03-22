import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const initState = {
  isLoading: false,
  policies: [],
  selectedPolicies: [],
};

export const Context = createContext({} as DataStoreContext);

const ContextProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export default ContextProvider;
