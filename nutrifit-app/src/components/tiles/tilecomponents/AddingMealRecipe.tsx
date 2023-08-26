import { FunctionComponent, useState } from "react";
import Button from "../../Button";
import SearchConsumableDialog from "../../SearchConsumableDialog";
import Consumable from "../../../models/Consumable";
import TextInput from "../../TextInput";
import { addConsumable } from "../../../services/api-service";
import NumberInput from "../../NumberInput";

type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
}

type Form = {
    name: Field;
    serving_size: Field;
}

type ConsumablePropotion = {
    consumable: Consumable;
    idConsumable: number;
    proportion: number;
}

const AddingMealRecipe : FunctionComponent = () => {

    const [dialogActive, setDialogActive] = useState(false);
    const [ingredients, setIngredients] = useState<ConsumablePropotion[]>([]);
    const [form, setForm] = useState<Form>({
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
    })

    const addIngredient = (cons: Consumable) => {
        setIngredients([...ingredients, 
            {
                consumable: cons,
                idConsumable: cons.idConsumable as NonNullable<typeof cons.idConsumable>,
                proportion: 1
            }
        ]);
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

    const handleSubmit = () => {

        const ingredientsToSend = ingredients
        .filter((cons) => cons.idConsumable !== undefined)
        .map((cons) => ({
            idConsumable: cons.idConsumable as NonNullable<typeof cons.idConsumable>,
            proportion: cons.proportion
        }));
        
        const consumable = {
            name: form.name.value,
            quantity_label: form.serving_size.value,
            energy: 0,
            carbohydrates: 0,
            fats: 0,
            proteins: 0,
            type : "RECIPE",
            is_public: true,
            ingredients: ingredientsToSend
        }

        addConsumable(consumable).catch((err) => {
            console.log(err);
        })

    }

    const ingredientNode = ingredients.map((cons) => (
        <div key={cons.idConsumable} className="bg-neutral-700 my-2 rounded-lg py-2 px-4 flex justify-between items-center">
            <div>
                <div className="h-full text-left text-white">{cons.consumable.name ? cons.consumable.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.consumable.energy} kcal, {cons.consumable.quantity_label}</div>
            </div>
            <div className="flex items-center gap-6">
                <NumberInput value={cons.proportion} name={cons.idConsumable+""} onChange={handleChangeProportion} backgroundColor="bg-neutral-600" textColor="text-white" />
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 bg-main text-3xl" onClick={() => {setIngredients(ingredients.filter(cons2 => cons2.idConsumable !== cons.idConsumable))}}>x</button>
            </div>
        </div>
    ))

    return (
        <div className="bg-neutral-800 rounded-lg">
            <div className="text-left mt-4">
                <label className='text-white font-inter font-medium text-sm' htmlFor='name'>Name :</label>
            </div>
            <TextInput name="name" placeholder="Name" value={form.name.value} onChange={handleChange}/>
            <div className="text-left mt-2">
                <label className='text-white font-inter font-medium text-sm text-left' htmlFor='serving_size'>Serving size :</label>
            </div>
            <TextInput name="serving_size" placeholder="Serving size" value={form.serving_size.value} onChange={handleChange}/>
            <div className="font-inter font-medium text-white text-lg text-left mt-6">Ingredient(s)</div>
            <SearchConsumableDialog addToList={addIngredient} active={dialogActive} quitDialog={quitDialog}/>

            {ingredientNode}
            
            <div className="mx-6"><Button name="Add ingredient" inverted onClick={() => {setDialogActive(true)}}/></div>
            <div className="mt-4"><Button name="Add" onClick={handleSubmit}/></div>
        </div>
    );
}

export default AddingMealRecipe;