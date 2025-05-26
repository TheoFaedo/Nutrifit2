import React, { ReactNode, useCallback, useEffect, useState } from "react";
import User from "../models/User";
import { isAuthenticated as me } from "../services/api-service";
import i18next from "i18next";

type AuthContextType =
  | {
      isLoading: true;
    }
  | {
      isLoading: false;
      isAuthenticated: false;
      logUser: (user: User) => User;
    }
  | {
      isLoading: false;
      isAuthenticated: true;
      account: User;
      logoutUser: () => void;
      setLevelAndExp: (level: number, xp: number) => void;
    };

export const AuthContext = React.createContext<AuthContextType>({
  isLoading: true,
});

export const AuthContextProvider = ({
  defaultValue,
  children,
}: {
  defaultValue: AuthContextType;
  children: ReactNode;
}) => {
  const [authState, setAuthState] = useState<AuthContextType>(defaultValue);

  const setLevelAndExp = useCallback(
    (level: number, xp: number) => {
      if (authState.isLoading || !authState.isAuthenticated) return;
      setAuthState({
        ...authState,
        account: {
          ...authState.account,
          exp: xp ?? 0,
          level: level ?? 1,
        },
      });
    },
    [authState]
  );

  const logUser = useCallback(
    (user: User) => {
      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        account: user,
        logoutUser: () =>
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            logUser: logUser,
          }),
        setLevelAndExp: setLevelAndExp,
      });
      return user;
    },
    [setAuthState, setLevelAndExp]
  );

  useEffect(() => {
    me().then(async (response) => {
      if (response.status === 401) {
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          logUser: logUser,
        });
        return void 0;
      }
      if (!response) return void 0;
      const user = await response.json();
      logUser(user);
      i18next.changeLanguage(user.lang);
    });
  }, [logUser]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
