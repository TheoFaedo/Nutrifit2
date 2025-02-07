import { FunctionComponent } from "react";
import LogoutTile from "../components/tiles/LogoutTile";
import ChangingGoalTile from "../components/tiles/ChangingGoalTile";

const Profile: FunctionComponent = () => {

    return (
        <>
            <LogoutTile />
            <ChangingGoalTile />
        </>
    )
}

export default Profile;