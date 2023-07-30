import { ReactNode, createContext, useState } from "react";

type NavBarContext = {
    hideNavBar: Function;
    showNavBar: Function;
}

export const NavBarContext = createContext<NavBarContext>({hideNavBar: () => {}, showNavBar: () => {}});

export const NavBarContextProvider = ({defaultValue, children} : {defaultValue: any, children: ReactNode}) => {

    const [data, setData] = useState(defaultValue);

    return (
        <NavBarContext.Provider value={data}>
            {children}
        </NavBarContext.Provider>
    )
}

