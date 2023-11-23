import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { connect, logout as logoutApi } from "../services/api-service";
import { useNavigate } from "react-router-dom";

export enum AuthStatus {
    LOGGED_IN = 0,
    LOGGED_OUT = 1,
    LOADING = 2
}

export function useAuth(){
    const { account, setAccount } = useContext(AuthContext);
    const navigate = useNavigate();
    
    let status = AuthStatus.LOADING;
    switch (account) {
        case null:
            status = AuthStatus.LOGGED_OUT;
            break;
        case undefined:
            status = AuthStatus.LOADING;
            break;
        default:
            status = AuthStatus.LOGGED_IN;
            break;
    }

    const login = useCallback(async (username: string, password: string) => {
        return connect(username, password).then((data) => {
                if("error" in data){
                    setAccount(null);
                }else{
                    setAccount(data);
                    navigate("/profile");
                }
                return data;
            }
        ).catch((err) => {
            setAccount(null);
            throw err;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = useCallback(() => {
        logoutApi().then((data) => {
            if(data.success) setAccount(null);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        account,
        status,
        login,
        logout
    }
}