import { FunctionComponent } from "react";
import AddingMealTile from "../components/tiles/AddingMealTile";
import EditMealTile from "../components/tiles/EditMealTile";

const CreateMeal: FunctionComponent = () => {

    return (
        <>
            <EditMealTile />
            <AddingMealTile />
        </>
    )
}

export default CreateMeal;