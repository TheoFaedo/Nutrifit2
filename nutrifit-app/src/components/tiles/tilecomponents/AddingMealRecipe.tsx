import { FunctionComponent } from "react";
import Button from "../../Button";

const AddingMealRecipe : FunctionComponent = () => {
    return (
        <div className="h-48 bg-neutral-800  my-6 mx-4 rounded-lg">
            <Button name="Add ingredient" inverted/>
        </div>
    );
}

export default AddingMealRecipe;