import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [password, setPassword] = useState();

  const data = { showSidebar, setShowSidebar,password, setPassword };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export const useContextCustom = () => useContext(StateContext);
