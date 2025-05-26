import { AuthStatus, useAuth } from "./useAuth";

export function useAccount() {
  const authState = useAuth();
  if (
    authState.status === AuthStatus.LOADING ||
    authState.status === AuthStatus.LOGGED_OUT
  ) {
    throw new Error("Account is not logged in");
  }

  return {
    account: authState.account,
  };
}
