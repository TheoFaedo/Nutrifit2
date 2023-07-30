import { FunctionComponent, useContext, useEffect } from "react";
import LogoutTile from "../components/tiles/LogoutTile";
import ChangingGoalTile from "../components/tiles/ChangingGoalTile";
import { NavBarContext } from "../context/NavBarContext";

const Profile: FunctionComponent = () => {

    const { showNavBar } = useContext(NavBarContext);

    useEffect(() => {
        showNavBar();
    }, [])

    return (
        <>
            <LogoutTile />
            <ChangingGoalTile />
        </>
    )
}

export default Profile;