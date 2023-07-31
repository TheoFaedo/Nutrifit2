import { ReactNode, createContext, useState } from "react";

type NavBarContextType = {
    hideNavBar: Function;
    showNavBar: Function;
}

export const NavBarContext = createContext<NavBarContextType>({hideNavBar: () => {}, showNavBar: () => {}});

export const NavBarContextProvider = ({defaultValue, children} : {defaultValue: any, children: ReactNode}) => {

    const [data] = useState(defaultValue);

    return (
        <NavBarContext.Provider value={data}>
            {children}
        </NavBarContext.Provider>
    )
}

