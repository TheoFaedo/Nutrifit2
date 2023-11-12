import { useAuth } from "./useAuth";

export function useAccount(){
    const {account} = useAuth();
    if(!account){
        throw new Error("Account is not logged in");
    }
    
    return {
        account
    };
}