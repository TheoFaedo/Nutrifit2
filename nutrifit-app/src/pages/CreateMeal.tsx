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
        </>
    )
}

export default CreateMeal;