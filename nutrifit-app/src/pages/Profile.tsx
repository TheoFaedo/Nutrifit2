import { FunctionComponent, useEffect } from "react";

type Props = {
    showNavBar: Function;
}

const Profile: FunctionComponent<Props> = (props) => {

    useEffect(() => {
        props.showNavBar();
    }, []);

    return (
        <>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'>Profile</div>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
        </>
    )
}

export default Profile;