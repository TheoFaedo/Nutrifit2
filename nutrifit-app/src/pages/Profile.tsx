import { FunctionComponent, useEffect } from "react";
import LogoutTile from "../components/tiles/LogoutTile";
import ChangingGoalTile from "../components/tiles/ChangingGoalTile";

type Props = {
    showNavBar: Function;
}

const Profile: FunctionComponent<Props> = (props) => {

    const { showNavBar } = props;

    useEffect(() => {
        showNavBar();
    }, [showNavBar]);

    return (
        <>
            <LogoutTile />
            <ChangingGoalTile />
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
        </>
    )
}

export default Profile;