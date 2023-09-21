import { FunctionComponent, useContext, useEffect } from "react";
import { NavBarContext } from '../context/NavBarContext';
import AddingMealTile from "../components/tiles/AddingMealTile";
import EditMealTile from "../components/tiles/EditMealTile";

const CreateMeal: FunctionComponent = () => {

    const { showNavBar } = useContext(NavBarContext);

    useEffect(() => {
        showNavBar();
    }, [showNavBar])

    return (
        <>
            <EditMealTile />
            <AddingMealTile />
        </>
    )
}

export default CreateMeal;