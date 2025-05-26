import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { connect, logout as logoutApi } from "../services/api-service";
import { useNavigate } from "react-router-dom";
import User from "../models/User";

export enum AuthStatus {
  LOGGED_IN = 0,
  LOGGED_OUT = 1,
  LOADING = 2,
}

type AuthHook =
  | {
      status: AuthStatus.LOADING;
    }
  | {
      status: AuthStatus.LOGGED_OUT;
      login: (username: string, password: string) => Promise<User | undefined>;
    }
  | {
      status: AuthStatus.LOGGED_IN;
      account: User;
      logout: () => void;
      setLevelAndExp: (level: number, xp: number) => void;
    };

export function useAuth(): AuthHook {
  const authState = useContext(AuthContext);
  const navigate = useNavigate();

  const login = useCallback(async (username: string, password: string) => {
    if (authState.isLoading || authState.isAuthenticated) return;
    return connect(username, password)
      .catch()
      .then((user) => {
        if (!user) return;
        navigate("/");
        return authState.logUser(user);
      });
  }, [authState, navigate]);

  const logout = useCallback(() => {
    if (authState.isLoading || !authState.isAuthenticated) return;
    logoutApi()
      .catch()
      .then(() => {
        authState.logoutUser();
        navigate("/login");
      });
  }, [authState, navigate]);

  const setLevelAndExp = useCallback(async (level: number, xp: number) => {
    if (authState.isLoading || !authState.isAuthenticated) return;
    authState.setLevelAndExp(level, xp);
  }, [authState]);

  if (authState.isLoading) {
    return {
      status: AuthStatus.LOADING,
    };
  } else if (!authState.isAuthenticated) {
    return {
      status: AuthStatus.LOGGED_OUT,
      login,
    };
  } else {
    return {
      status: AuthStatus.LOGGED_IN,
      account: authState.account,
      logout,
      setLevelAndExp,
    };
  }
}
