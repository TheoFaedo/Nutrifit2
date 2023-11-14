import { FunctionComponent, useContext, useEffect } from "react";
import { NavBarContext } from '../context/NavBarContext';
import AddingMealTile from "../components/tiles/AddingMealTile";
import EditMealTile from "../components/tiles/EditMealTile";

const CreateMeal: FunctionComponent = () => {

    const { showNavBar, setActiveTab } = useContext(NavBarContext);

    useEffect(() => {
        setActiveTab(2);
        showNavBar();
    }, [showNavBar, setActiveTab])

    return (
        <>
            <EditMealTile />
            <AddingMealTile />
        </>
    )
}

export default CreateMeal;