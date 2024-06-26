import { FunctionComponent, useContext, useEffect } from "react";
import LogoutTile from "../components/tiles/LogoutTile";
import ChangingGoalTile from "../components/tiles/ChangingGoalTile";
import { NavBarContext } from "../context/NavBarContext";

const Profile: FunctionComponent = () => {

    const { showNavBar, setActiveTab } = useContext(NavBarContext);

    useEffect(() => {
        setActiveTab(1);
        showNavBar();
    }, [showNavBar, setActiveTab])

    return (
        <>
            <LogoutTile />
            <ChangingGoalTile />
        </>
    )
}

export default Profile;