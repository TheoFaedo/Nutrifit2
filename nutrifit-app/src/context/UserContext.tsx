import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

type UserContextType = {
    loggedIn: boolean,
    pseudo?: string,
    idToken?: string,
    loginContext: Function,
    logoutContext: Function
}

export const UserContext = createContext<UserContextType>({loggedIn: false, loginContext: () => {}, logoutContext: () => {}});

export const UserContextProvider = ({ defaultValue, children }: { defaultValue: any, children: ReactNode }) => {
    const [data, setData] = useState(defaultValue);
  
    const login = useCallback((username: string, idToken: string) => {
        if (!data.loggedIn) {
          setData((prevData: any) => ({
            ...prevData,
            loggedIn: true,
            pseudo: username,
            idToken: idToken,
          }));
        }
      }, [data.loggedIn, setData]);
      
      const logout = useCallback(() => {
        if (data.loggedIn) {
          setData((prevData: any) => ({
            ...prevData,
            loggedIn: false,
            pseudo: "",
            idToken: "",
          }));
        }
      }, [data.loggedIn, setData]);
      
      useEffect(() => {
        setData((prevData: any) => ({
          ...prevData,
          loginContext: login,
          logoutContext: logout,
        }));
      }, [login, logout]);
  
    return (
      <UserContext.Provider value={data}>
        {children}
      </UserContext.Provider>
    );
  };

