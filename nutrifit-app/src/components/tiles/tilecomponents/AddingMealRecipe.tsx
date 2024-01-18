import { FunctionComponent, useState } from "react";
import Button from "../../Button";
import SearchConsumableDialog from "../../dialog/SearchConsumableDialog";
import Consumable from "../../../models/Consumable";
import TextInput from "../../TextInput";
import { addConsumable, changeConsumable } from "../../../services/api-service";
import MultipleDoughnutChart from "../../MultipleDoughnutChart";
import { validConsumableName, validConsumableServingSize } from "../../../helpers/fieldHelper";
import { useToasts } from "../../../context/ToastContext";
import { EnergyInKcal } from "../../../models/valueObjects/Energy";
import { MACRO_TYPES, WeightInGrams } from "../../../models/valueObjects/Weight";
import { ConsumableQuantityCard } from "../../ConsumableQuantityCard";

type Field = {
    value: string;
    error?: string;
    isValid?: boolean;
}

type Form = {
    name: Field;
    serving_size: Field;
}

const initialForm = {
    name: {
        value: "",
        error: "",
        isValid: true
    },
    serving_size: {
        value: "",
        error: "",
        isValid: true
    }
}

type Props = {
    type?: "adding"|"edit";
    consumableToEdit?: Consumable;
}

const AddingMealRecipe : FunctionComponent<Props> = ({ type = "adding", consumableToEdit = new Consumable() }) => {

    const { pushToast } = useToasts();

    const [dialogActive, setDialogActive] = useState(false);
    
    const [ingredients, setIngredients] = useState<Consumable[]>((type === "adding") ? [] : consumableToEdit?.ingredients);
    

    const beginForm = type === "adding" ? initialForm : {
        name: {
            value: consumableToEdit?.name,
            error: "",
            isValid: true
        },
        serving_size: {
            value: consumableToEdit?.quantity_label,
            error: "",
            isValid: true
        }
    }
    const [form, setForm] = useState<Form>(beginForm)

    const addIngredient = (cons: Consumable) => {
        const consAlreadyChoosen: Consumable|undefined = ingredients.find((c) => c.idConsumable === cons.idConsumable)
        if(consAlreadyChoosen){
            setIngredients(ingredients.map((c) => {
                if(c.idConsumable === cons.idConsumable){
                    return {
                        ...c,
                        proportion: (c.proportion ? c.proportion : 1)  + 1
                    }
                }
                return c
            }))
        }else{
            setIngredients([...ingredients, 
                {
                    ...cons,
                    proportion: 1
                }
            ]);
        } 
    }

    const totalEnergy = () => {
        let energy = 0;
        ingredients.forEach((cons) => {
            energy += (cons.proportion ? cons.proportion : 1) * cons.energy.value;
        });
        return EnergyInKcal.create(energy);
    }

    const totalCarbos = () => {
        let carbos = 0;
        ingredients.forEach((cons) => {
            carbos += (cons.proportion ? cons.proportion : 1) * cons.carbohydrates.value;
        });
        return WeightInGrams.create(carbos);
    }

    const totalFats = () => {
        let fats = 0;
        ingredients.forEach((cons) => { 
            fats += (cons.proportion ? cons.proportion : 1) * cons.fats.value;
        });
        return WeightInGrams.create(fats);
    }

    const totalProteins = () => {
        let proteins = 0;
        ingredients.forEach((cons) => {
            proteins += (cons.proportion ? cons.proportion : 1) * cons.proteins.value;
        });
        return WeightInGrams.create(proteins);
    }

    const quitDialog = () => {
        setDialogActive(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: {
                value: e.target.value,
                error: "",
                isValid: true
            }
        })
    }

    const handleChangeProportion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredients(ingredients.map((cons) => {
            if(cons.idConsumable === Number(e.target.name)){
                return {
                    ...cons,
                    proportion: Number(e.target.value)
                }
            }
            return cons
        }))
    }

    const validateForm = () => {
        let newForm : Form = form;

        if(validConsumableName(newForm.name.value)){
            const newField = { value: newForm.name.value, error: "", isValid: true };
            newForm = { ...newForm, name: newField };
        }else{
            const newField = { value: newForm.name.value, error: "Invalid consumable name", isValid: false };
            newForm = { ...newForm, name: newField };
        }

        if(validConsumableServingSize(newForm.serving_size.value)){
            const newField = { value: newForm.serving_size.value, error: "", isValid: true };
            newForm = { ...newForm, serving_size: newField };
        }else{
            const newField = { value: newForm.serving_size.value, error: "Invalid serving size", isValid: false };
            newForm = { ...newForm, serving_size: newField };
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.serving_size.isValid && ingredients.length > 0;
    }

    const handleSubmit = () => {

        if(!validateForm()){
            pushToast({type: "error", content: "Enter information in the valid format"});
            return
        }

        const ingredientsToSend = ingredients
        .filter((cons) => cons.idConsumable !== undefined)
        .map((cons) => ({
            ...cons,
            proportion: cons.proportion
        }));

        console.log(ingredientsToSend);
        
        const consumable = {
            name: form.name.value,
            quantity_label: form.serving_size.value,
            energy: EnergyInKcal.create(0),
            carbohydrates: WeightInGrams.create(0),
            fats: WeightInGrams.create(0),
            proteins: WeightInGrams.create(0),
            type : "RECIPE",
            is_public: true,
            ingredients: ingredientsToSend
        }

        if(type === "adding"){
            addConsumable(consumable).then((res) => {
                if(res.success) pushToast({content: "Added successfully"})
                else pushToast({content: "Failed to add", type: "error"});
            }).catch((err) => {
                console.log(err);
            });
            
            setIngredients([]);
            setForm({...initialForm});
        }else{
            changeConsumable({...consumable, idConsumable: consumableToEdit?.idConsumable}).then((res) => {
                if(res.success) pushToast({content: "Edited successfully"})
                else pushToast({content: "Failed to edit", type: "error"});
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    const ingredientNode = ingredients.map((cons) => (
        <ConsumableQuantityCard
            idCons={cons.idConsumable ?? -1}
            name={cons.name}
            proportion={cons.proportion ?? 1}
            quantity_label={cons.quantity_label}
            consumableEnergy={cons.energy.value}
            handleChangeProportion={handleChangeProportion} 
            handleBlurSaveConsumption={() => {}} 
            handleRemoveConsumption={() => {setIngredients(ingredients.filter(cons2 => cons2.idConsumable !== cons.idConsumable))}}
        />
    ))

    return (
        <div className="bg-neutral-800 rounded-lg">
            <div className="text-left mt-4">
                <label className='text-white font-inter font-medium text-sm' htmlFor='name'>Name :</label>
            </div>
            <TextInput name="name" placeholder="Name" value={form.name.value} onChange={handleChange} errorBorder={!form.name.isValid} errorMessage={form.name.error}/>
            <div className="text-left mt-2">
                <label className='text-white font-inter font-medium text-sm text-left' htmlFor='serving_size'>Serving size :</label>
            </div>
            <TextInput name="serving_size" placeholder="Serving size" value={form.serving_size.value} onChange={handleChange} errorBorder={!form.serving_size.isValid} errorMessage={form.serving_size.error}/>

            <div className="font-inter font-medium text-white text-lg text-left mt-6">Ingredient(s)</div>
            <SearchConsumableDialog addToList={addIngredient} active={dialogActive} quitDialog={quitDialog} level="z-50"/>

            {ingredientNode}
            
            <div className="mx-6"><Button name="Add ingredient" inverted onClick={() => {setDialogActive(true)}}/></div>

            <div className="font-inter font-medium text-white text-lg text-left mt-6">Nutritionnal values</div>
            <div className="w-full flex items-center justify-center">
                <MultipleDoughnutChart className="mt-6" nutriData={
                    {
                        energy: totalEnergy(),
                        carbos: totalCarbos().toKcal(MACRO_TYPES.CARBOHYDRATE),
                        fats: totalFats().toKcal(MACRO_TYPES.FAT),
                        proteins: totalProteins().toKcal(MACRO_TYPES.PROTEIN),
                        energy_unit: "kcal"
                    }
                }
                />
            </div>

            <div className='flex flex-col justify-center gap-2 my-4 p-4'>
                <div className='text-white flex items-center justify-center'>
                    <div className='text-white font-medium text-sm flex items-center h-full w-40 mx-4'>
                        <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                        <label htmlFor='energy'>Carbohydrates (g)</label>
                    </div>
                    <span className="font-semibold mx-4">{totalCarbos().value}</span>
                </div>
                <div className='text-white flex items-center justify-center'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full w-40 mx-4'>
                        <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                        <label htmlFor='energy'>Fats (g)</label>
                    </div>
                    <span className="font-semibold mx-4">{totalFats().value}</span>
                </div>
                <div className='text-white flex items-center justify-center'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full w-40 mx-4'>
                        <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                        <label htmlFor='energy'>Proteins (g)</label>
                    </div>
                    <span className="font-semibold mx-4">{totalProteins().value}</span>
                </div>
            </div>

           

            <div className="mt-4">{
                type === "adding" ?
                <Button name="Add" onClick={handleSubmit}/>
                :
                <Button name="Save" onClick={handleSubmit}/>
            }</div>
        </div>
    );
}

export default AddingMealRecipe;