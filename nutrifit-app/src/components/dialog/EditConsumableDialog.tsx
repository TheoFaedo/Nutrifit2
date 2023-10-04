import { FunctionComponent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import left_arrow from "../../img/left_arrow.png";
import TrashSVG from "../../svg/TrashSVG";
import AddingMealMeal from "../tiles/tilecomponents/AddingMealMeal";
import Consumable from "../../models/Consumable";
import AddingMealRecipe from "../tiles/tilecomponents/AddingMealRecipe";

type Props = {
    consumableToEdit: Consumable;
    quitDialog: Function;
    active: boolean;
    handleRemove: Function;
}

const EditForm = ({ consumableToEdit } : { consumableToEdit: Consumable }) => {

    return consumableToEdit.type === "MEAL" ? 
        <AddingMealMeal type="edit" consumableToEdit={consumableToEdit} /> :
        <AddingMealRecipe type="edit" consumableToEdit={consumableToEdit} />;
};

const EditConsumableDialog : FunctionComponent<Props> = ({ consumableToEdit, quitDialog, active, handleRemove }) => {

    const transition = active ? "translate-y-0" : "translate-y-full";

    return createPortal(
        <div className={"dialog z-40 font-inter flex flex-col h-full transition-transform duration-500 ease-in-out " + transition}>
            <div className="h-12 gradient-bg flex items-center justify-between">
                <button onClick={() => {quitDialog()}} className="rounded-full mx-2 active:bg-black">
                <img src={left_arrow} className="h-7 w-7 m-1" alt="left oriented arrow" />
                </button>
                <button className="px-4" onClick={() => {handleRemove(consumableToEdit.idConsumable); quitDialog();}}>
                    <TrashSVG primary="fill-black"/>
                </button>
            </div>
            <div className="text-white flex flex-col flex-grow p-4">
                {active ? <EditForm consumableToEdit={consumableToEdit} /> : <></>}
            </div>
        </div>,
    document.getElementById("root")!);


    return <></>;
    

    
}

export default EditConsumableDialog;