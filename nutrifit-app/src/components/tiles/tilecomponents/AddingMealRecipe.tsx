import { FunctionComponent, useState } from "react";
import Button from "../../Button";
import SearchConsumableDialog from "../../dialog/SearchConsumableDialog";
import Consumable from "../../../models/Consumable";
import TextInput from "../../TextInput";
import { addConsumable } from "../../../services/api-service";
import NumberInput from "../../NumberInput";
import DoughnutChart from "../../DoughnutChart";

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

    const totalEnergy = () => {
        let energy = 0;
        ingredients.forEach((cons) => {
            energy += cons.proportion * cons.consumable.energy;
        });
        return energy;
    }

    const totalCarbos = () => {
        let carbos = 0;
        ingredients.forEach((cons) => {
            carbos += cons.proportion * cons.consumable.carbohydrates;
        });
        return carbos;
    }

    const totalFats = () => {
        let fats = 0;
        ingredients.forEach((cons) => {
            fats += cons.proportion * cons.consumable.fats;
        });
        return fats;
    }

    const totalProteins = () => {
        let proteins = 0;
        ingredients.forEach((cons) => {
            proteins += cons.proportion * cons.consumable.proteins;
        });
        return proteins;
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
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 bg-main text-3xl text-white" onClick={() => {setIngredients(ingredients.filter(cons2 => cons2.idConsumable !== cons.idConsumable))}}>-</button>
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

            <div className="font-inter font-medium text-white text-lg text-left mt-6">Nutritionnal values :</div>
            <div className="w-full flex items-center justify-center">
                <DoughnutChart className="mt-6" type="proportions" nutriData={
                    {
                        energy: totalEnergy(),
                        carbos_percents: totalCarbos(),
                        fats_percents: totalFats(),
                        proteins_percents: totalProteins(),
                        energy_unit: "kcal",
                        energy_goal: 0
                    }
                }
                />
            </div>

            <div className='flex flex-col justify-center gap-2 my-4 p-4'>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                        <label htmlFor='energy'>Carbohydrates (g)</label>
                    </div>
                    {totalCarbos()}
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                        <label htmlFor='energy'>Fats (g)</label>
                    </div>
                    {totalFats()}
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                        <label htmlFor='energy'>Proteins (g)</label>
                    </div>
                    {totalProteins()}
                </div>
            </div>

           

            <div className="mt-4"><Button name="Add" onClick={handleSubmit}/></div>
        </div>
    );
}

export default AddingMealRecipe;