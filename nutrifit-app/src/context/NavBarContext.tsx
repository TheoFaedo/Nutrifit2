import { ReactNode, createContext, useCallback, useState } from "react";

type NavBarContextType = {
    hideNavBar: Function;
    showNavBar: Function;
    activeTab: number;
    setActiveTab: Function;
    navBarVisible: boolean;
}

export const NavBarContext = createContext<NavBarContextType>({hideNavBar: () => {}, showNavBar: () => {}, activeTab: 1, setActiveTab: () => {}, navBarVisible: true});

export const NavBarContextProvider = ({children} : { children: ReactNode }) => {

  const [navBarState, setNavBarState] = useState({
      visible: true,
      activeTab: 1
    });

    // Fonction pour cacher la barre de navigation
    const hideNavBar = useCallback(() => {
      setNavBarState(prevState => ({
        ...prevState,
        visible: false
      }))
    }, []);

    // Fonction pour afficher la barre de navigation
    const showNavBar = useCallback(() => {
      setNavBarState(prevState => ({
        ...prevState,
        visible: true
      }))
    }, []);

    const setActiveTab = useCallback((index: number) => {
      setNavBarState(prevState => ({
        ...prevState,
        activeTab: index
      }))
    }, []);

    return (
        <NavBarContext.Provider value={ { hideNavBar, showNavBar, activeTab: navBarState.activeTab, setActiveTab, navBarVisible: navBarState.visible } }>
            {children}
        </NavBarContext.Provider>
    )
}

