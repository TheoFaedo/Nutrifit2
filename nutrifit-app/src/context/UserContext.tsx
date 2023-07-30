import { ReactNode, createContext, useState } from "react";

type UserContext = {
    connected: boolean,
    pseudo?: string,
    idUser?: string
}

export const UserContext = createContext<UserContext>({connected: false});

export const UserContextProvider = ({defaultValue, children} : {defaultValue: any, children: ReactNode}) => {

    const [data, setData] = useState(defaultValue);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

