import { FunctionComponent, useContext, useEffect } from "react";
import { NavBarContext } from '../context/NavBarContext';
import AddingMealTile from "../components/tiles/AddingMealTile";

const CreateMeal: FunctionComponent = () => {

    const { showNavBar } = useContext(NavBarContext);

    useEffect(() => {
        showNavBar();
    }, [showNavBar])

    return (
        <>
            <AddingMealTile />
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
            <div className='h-48 bg-neutral-800  my-6 mx-4 rounded-lg'></div>
        </>
    )
}

export default CreateMeal;