import { FunctionComponent, useContext, useEffect } from "react";
import { NavBarContext } from '../context/NavBarContext';

const Diary: FunctionComponent = () => {

    const { showNavBar } = useContext(NavBarContext);

    useEffect(() => {
        showNavBar();
    }, [])

    return (
        <>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'>Diary</div>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
        </>
    )
}

export default Diary;