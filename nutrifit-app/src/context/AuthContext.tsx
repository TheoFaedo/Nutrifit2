import React, { ReactNode, useEffect, useState } from "react";
import User from "../models/User";
import { isAuthenticated } from "../services/api-service";
import i18next from "i18next";

type AuthContextType = {
  account: User | null |undefined;
  setAccount: (account: User | null |undefined) => void;
}

export const AuthContext = React.createContext<AuthContextType>({account: undefined, setAccount: () => {}});

export const AuthContextProvider = ({defaultValue, children} : {defaultValue: AuthContextType, children: ReactNode}) => {
  const [account, setAccount] = useState<User | null | undefined>(defaultValue.account);

  useEffect(() => {
    isAuthenticated().then((data) => {
      if(!data || data.error){
        setAccount(null);
      }else{
        setAccount(data);
        i18next.changeLanguage(data.lang);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{account, setAccount}}>
      {children}
    </AuthContext.Provider>
  )
}