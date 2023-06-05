import { createContext, useContext, useState } from "react";

export const SessionContext = createContext();

const emptySession = {
  userName: "",
  email: "",
  favorites: [],
};

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(emptySession);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSessionContext = () => useContext(SessionContext);
