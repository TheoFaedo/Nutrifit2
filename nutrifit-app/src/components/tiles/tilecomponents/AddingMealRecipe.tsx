import { FunctionComponent, useState } from "react";
import Button from "../../Button";
import SearchConsumableDialog from "../../SearchConsumableDialog";
import Consumable from "../../../models/Consumable";

const AddingMealRecipe : FunctionComponent = () => {

    const [dialogActive, setDialogActive] = useState(false);
    const [ingredients, setIngredients] = useState<Consumable[]>([]);

    const ingredientNode = ingredients.map((cons) => (
        <div key={cons.idConsumable} className="bg-neutral-700 my-2 rounded-lg py-2 px-4 flex justify-between items-center">
            <div>
                <div className="h-full text-left text-white">{cons.name ? cons.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.energy} kcal, {cons.quantity_label}</div>
            </div>
        </div>
    ))

    const addIngredient = (cons: Consumable) => {
        setIngredients([...ingredients, cons]);
    }

    const quitDialog = () => {
        setDialogActive(false);
    }

    return (
        <div className="bg-neutral-800 rounded-lg">
            <div className="font-inter font-medium text-white text-lg text-left mt-6">Ingredient(s)</div>
            <SearchConsumableDialog addToList={addIngredient} active={dialogActive} quitDialog={quitDialog}/>
            {ingredientNode}
            <div className="mx-6"><Button name="Add ingredient" inverted onClick={() => {setDialogActive(true)}}/></div>
            <div className="mt-4"><Button name="Add"/></div>
        </div>
    );
}

export default AddingMealRecipe;