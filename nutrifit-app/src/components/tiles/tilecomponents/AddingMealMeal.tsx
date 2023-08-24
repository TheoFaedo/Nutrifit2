import { FunctionComponent, useState } from "react";
import TextInput from '../../TextInput';
import DoughnutChart from '../../DoughnutChart';
import NumberInput from '../../NumberInput';
import Button from '../../Button';
import { addConsumable } from '../../../services/api-service';

type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
}
  
type Form = {
    name: Field;
    serving_size: Field;
    energy: Field;
    carbos: Field;
    fats: Field;
    proteins: Field;
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
    },
    energy: {
        value: 0,
        error: "",
        isValid: true
    },
    carbos: {
        value: 0,
        error: "",
        isValid: true
    },
    fats: {
        value: 0,
        error: "",
        isValid: true
    },
    proteins: {
        value: 0,
        error: "",
        isValid: true
    }
}

const AddingMealMeal : FunctionComponent = () => {

    const [form, setForm] = useState<Form>( { ...initialForm});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm({
            ...form,
            [name]: {
                value,
                error: "",
                isValid: true
            }
        })
    }

    const handleChangeNutVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = parseFloat(e.target.value);
        let updatedEnergy = form.energy.value;
        let updatedCarbos = form.carbos.value;
        let updatedFats = form.fats.value;
        let updatedProteins = form.proteins.value;
        
        if (name === 'energy') {
            updatedEnergy = value;
            const coef = value/25;
            updatedCarbos = coef*2;
            updatedFats = coef;
            updatedProteins = coef*2;
        } else if (name === 'carbos') {
            updatedCarbos = value;
            updatedEnergy = (value * 4) + (form.fats.value * 9) + (form.proteins.value * 4);
        } else if (name === 'fats') {
            updatedFats = value;
            updatedEnergy = (form.carbos.value * 4) + (value * 9) + (form.proteins.value * 4);
        } else if (name === 'proteins') {
            updatedProteins = value;
            updatedEnergy = (form.carbos.value * 4) + (form.fats.value * 9) + (value * 4);
        }

        setForm({
            ...form,
            energy: {
                ...form.energy,
                value: Math.round(updatedEnergy)
            },
            carbos: {
                ...form.carbos,
                value: Math.round(updatedCarbos)
            },
            fats: {
                ...form.fats,
                value: Math.round(updatedFats)
            },
            proteins: {
                ...form.proteins,
                value: Math.round(updatedProteins)
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const consumable = {
            name: form.name.value,
            quantity_label: form.serving_size.value,
            energy: form.energy.value,
            carbohydrates: form.carbos.value,
            fats: form.fats.value,
            proteins: form.proteins.value,
            type : "MEAL",
            is_public: true,
            ingredients: [],
        }

        addConsumable(consumable).catch((err) => {
            console.log(err);
        });

        setForm({...initialForm});
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className='mt-4 text-white font-inter font-medium text-sm text-left' htmlFor='name'>Name :</label>
            <TextInput name="name" placeholder="Name" value={form.name.value} onChange={handleChange}/>
            <label className='mt-2 text-white font-inter font-medium text-sm text-left' htmlFor='serving_size'>Serving size :</label>
            <TextInput name="serving_size" placeholder="Serving size" value={form.serving_size.value} onChange={handleChange}/>
            <div className='w-full flex items-center justify-center'>
                <DoughnutChart type="proportions" nutriData={
                    {
                        carbos_percents: form.carbos.value*4,
                        fats_percents: form.fats.value*9,
                        proteins_percents: form.proteins.value*4,
                        energy: form.energy.value,
                        energy_unit: "kcal",
                        energy_goal: 2200
                    }
                } className='w-32 h-32 mt-6'/>
            </div>
            <div className='flex flex-col gap-2 my-4 p-4'>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
                        <label htmlFor='energy'>Energy (kcal)</label>
                    </div>
                    <NumberInput name="energy" placeholder="kcal" value={form.energy.value} className='w-full' rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                        <label htmlFor='energy'>Carbohydrates (g)</label>
                    </div>
                    <NumberInput name="carbos" placeholder="g" value={form.carbos.value} className='w-full' rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                        <label htmlFor='energy'>Fats (g)</label>
                    </div>
                    <NumberInput name="fats" placeholder="g" value={form.fats.value} className='w-full' rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                        <label htmlFor='energy'>Proteins (g)</label>
                    </div>
                    <NumberInput name="proteins" placeholder="g" value={form.proteins.value} className='w-full' rightAlign onChange={handleChangeNutVal}/>
                </div>
            </div>
            <Button name="Add" submit/>
        </form>
    );
}

export default AddingMealMeal;