import { FunctionComponent } from "react";
import { createPortal } from "react-dom";
import AddingMealMeal from "../tiles/tilecomponents/AddingMealMeal";
import Consumable from "../../models/Consumable";
import AddingMealRecipe from "../tiles/tilecomponents/AddingMealRecipe";
import LeftArrowButton from "../LeftArrowButton";
import TrashCanButton from "../TrashCanButton";
import { useTranslation } from "react-i18next";
import { stringAbreviationFormat } from "../../helpers/fieldHelper";

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

    const { t } = useTranslation("translation", { keyPrefix: "EditMealDialog" });

    const transition = active ? "translate-y-0" : "translate-y-full";

    return createPortal(
        <div className={"dialog z-40 font-inter flex flex-col h-full transition-transform duration-500 ease-in-out " + transition}>
            <div className="h-12 gradient-bg flex items-center justify-between">
                <LeftArrowButton quitDialog={quitDialog}/>
                <div className="font-inter font-semibold text-lg pt-1">{t('DialogTitle', { name: stringAbreviationFormat(consumableToEdit.name)})}</div>
                <div className="px-2 pt-1"><TrashCanButton action={handleRemove} idConsumable={(consumableToEdit.idConsumable ?? -1)} /></div>
            </div>
            <div className="text-white flex flex-col flex-grow p-4 pb-12 overflow-y-scroll scrollbar-hide">
                {active ? <EditForm consumableToEdit={consumableToEdit} /> : <></>}
            </div>
        </div>,
        document.getElementById("root")!
    );
}

export default EditConsumableDialog;