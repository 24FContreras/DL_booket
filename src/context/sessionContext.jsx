import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const emptySession = {
  active: false,
  username: "",
  email: "",
  avatar: "default_avatar.png",
  cart: { items: [] },
};

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(emptySession);

  useEffect(() => {
    if (localStorage.getItem("booketCart")) {
      const booketCart = localStorage.getItem("booketCart");

      setSession({ ...session, cart: JSON.parse(booketCart) });
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSessionContext = () => useContext(SessionContext);
