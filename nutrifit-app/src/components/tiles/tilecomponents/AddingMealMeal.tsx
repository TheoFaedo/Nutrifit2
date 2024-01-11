import { FunctionComponent, useEffect, useState } from "react";
import TextInput from '../../TextInput';
import MultipleDoughnutChart from '../../MultipleDoughnutChart';
import NumberInput from '../../NumberInput';
import Button from '../../Button';
import { addConsumable, changeConsumable } from '../../../services/api-service';
import { validConsumableName, validConsumableServingSize } from "../../../helpers/fieldValidationHelper";
import Consumable from "../../../models/Consumable";
import { useToasts } from "../../../context/ToastContext";
import { Energy, EnergyInKcal } from "../../../models/valueObjects/Energy";
import { MACRO_TYPES, Weight, WeightInGrams } from "../../../models/valueObjects/Weight";
import barcode from '../../../img/barcode.png';
import BarcodeScannerDialog from "../../dialog/BarcodeScannerDialog";

type Field<T> = {
    value: T;
    error?: string;
    isValid?: boolean;
}
  
type Form = {
    name: Field<string>;
    serving_size: Field<string>;
    energy: Field<Energy>;
    carbos: Field<Weight>;
    fats: Field<Weight>;
    proteins: Field<Weight>;
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
        value: EnergyInKcal.create(0),
        error: "",
        isValid: true
    },
    carbos: {
        value: WeightInGrams.create(0),
        error: "",
        isValid: true
    },
    fats: {
        value: WeightInGrams.create(0),
        error: "",
        isValid: true
    },
    proteins: {
        value: WeightInGrams.create(0),
        error: "",
        isValid: true
    }
}

type Props = {
    type?: "adding"|"edit";
    consumableToEdit?: Consumable;
}

const AddingMealMeal : FunctionComponent<Props> = ({ type = "adding", consumableToEdit }) => {

    const { pushToast } = useToasts();

    const setFormByConsumable = (consumable: Consumable) => {
        setForm({
            name: {
                value: consumable.name,
                error: "",
                isValid: true
            },
            serving_size: {
                value: consumable.quantity_label,
                error: "",
                isValid: true
            },
            energy: {
                value: consumable.energy,
                error: "",
                isValid: true
            },
            carbos: {
                value: consumable.carbohydrates,
                error: "",
                isValid: true
            },
            fats: {
                value: consumable.fats,
                error: "",
                isValid: true
            },
            proteins: {
                value: consumable.proteins,
                error: "",
                isValid: true
            }
        });
    }

    const beginForm = type === "adding" ? initialForm : {
        name: {
            value: consumableToEdit ? consumableToEdit.name : "",
            error: "",
            isValid: true
        },
        serving_size: {
            value: consumableToEdit ? consumableToEdit.quantity_label : "",
            error: "",
            isValid: true
        },
        energy: {
            value: consumableToEdit ? consumableToEdit.energy : EnergyInKcal.create(0),
            error: "",
            isValid: true
        },
        carbos: {
            value: consumableToEdit ? consumableToEdit.carbohydrates : WeightInGrams.create(0),
            error: "",
            isValid: true
        },
        fats: {
            value: consumableToEdit ? consumableToEdit.fats : WeightInGrams.create(0),
            error: "",
            isValid: true
        },
        proteins: {
            value: consumableToEdit ? consumableToEdit.proteins : WeightInGrams.create(0),
            error: "",
            isValid: true
        }
    }

    const [form, setForm] = useState<Form>( { ...beginForm});
    const [barCodeActive, setBarCodeActive] = useState<boolean>(false);

    const handleBarCodeScan = (data: any) => {
        if(!data) return;

        setForm({
            ...form,
            name: {
                value: data.name.substring(0, 30),
                error: "",
                isValid: true
            },
            serving_size: {
                value: "100g",
                error: "",
                isValid: true
            },
            energy: {
                value: EnergyInKcal.create(data["energy-kcal_100g"]),
                error: "",
                isValid: true
            },
            carbos: {
                value: WeightInGrams.create(data["carbohydrates_100g"]),
                error: "",
                isValid: true
            },
            fats: {
                value: WeightInGrams.create(data["fat_100g"]),
                error: "",
                isValid: true
            },
            proteins: {
                value: WeightInGrams.create(data["proteins_100g"]),
                error: "",
                isValid: true
            }
        });
    }
    

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
            updatedEnergy = EnergyInKcal.create(value);
            const coef = value/25;
            updatedCarbos = WeightInGrams.create(coef*2);
            updatedFats = WeightInGrams.create(coef);
            updatedProteins = WeightInGrams.create(coef*2);
        } else if (name === 'carbos') {
            updatedCarbos = WeightInGrams.create(value);
            updatedEnergy = EnergyInKcal.fromMacros(updatedCarbos, updatedProteins, updatedFats);
        } else if (name === 'fats') {
            updatedFats = WeightInGrams.create(value);
            updatedEnergy = EnergyInKcal.fromMacros(updatedCarbos, updatedProteins, updatedFats);
        } else if (name === 'proteins') {
            updatedProteins = WeightInGrams.create(value);;
            updatedEnergy = EnergyInKcal.fromMacros(updatedCarbos, updatedProteins, updatedFats);
        }
    
        setForm({
            ...form,
            energy: {
                ...form.energy,
                value: EnergyInKcal.create(Math.round(updatedEnergy.value))
            },
            carbos: {
                ...form.carbos,
                value: WeightInGrams.create(Math.round(updatedCarbos.value))
            },
            fats: {
                ...form.fats,
                value: WeightInGrams.create(Math.round(updatedFats.value))
            },
            proteins: {
                ...form.proteins,
                value: WeightInGrams.create(Math.round(updatedProteins.value))
            }
        });
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
        return newForm.name.isValid && newForm.serving_size.isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validateForm()){
            pushToast({type: "error", content: "Enter information in the valid format"});
            return
        }

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

        if(type === "adding"){
            addConsumable(consumable)
            .then((res) => {
                if(res.success) pushToast({content: "Added successfully"})
                else pushToast({content: "Failed to add", type: "error"});
            }).catch((err) => {
                console.log(err);
            });
    
            setForm({...initialForm});
        }else{
            
            changeConsumable({...consumable, idConsumable: consumableToEdit?.idConsumable})
            .then((res) => {
                if(res.success) pushToast({content: "Edited successfully"})
                else pushToast({content: "Failed to edit", type: "error"});
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if(consumableToEdit) setFormByConsumable(consumableToEdit);
    }, [consumableToEdit]);

    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className='mt-4 text-white font-inter font-medium text-sm text-left' htmlFor='name'>Name :</label>
            <TextInput name="name" placeholder="Name" value={form.name.value} onChange={handleChange} errorBorder={!form.name.isValid} errorMessage={form.name.error}/>
            <label className='mt-2 text-white font-inter font-medium text-sm text-left' htmlFor='serving_size'>Serving size :</label>
            <TextInput name="serving_size" placeholder="Serving size" value={form.serving_size.value} onChange={handleChange} errorBorder={!form.serving_size.isValid} errorMessage={form.serving_size.error}/>
            <div className='w-full flex items-center justify-center'>
                <MultipleDoughnutChart nutriData={
                    {
                        carbos: form.carbos.value.toKcal(MACRO_TYPES.CARBOHYDRATE),
                        fats: form.carbos.value.toKcal(MACRO_TYPES.FAT),
                        proteins: form.carbos.value.toKcal(MACRO_TYPES.PROTEIN),
                        energy: form.energy.value,
                        energy_unit: "kcal"
                    }
                } className='w-32 h-32 mt-6'/>
            </div>
            <div className='flex flex-col gap-2 my-4 p-4'>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
                        <label htmlFor='energy'>Energy (kcal)</label>
                    </div>
                    <NumberInput name="energy" placeholder="kcal" value={form.energy.value.value} styleWidth="w-full" rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                        <label htmlFor='energy'>Carbohydrates (g)</label>
                    </div>
                    <NumberInput name="carbos" placeholder="g" value={form.carbos.value.value} styleWidth="w-full" rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                        <label htmlFor='energy'>Fats (g)</label>
                    </div>
                    <NumberInput name="fats" placeholder="g" value={form.fats.value.value} styleWidth="w-full" rightAlign onChange={handleChangeNutVal}/>
                </div>
                <div className='text-white grid grid-cols-2'>
                    <div className='text-left text-white font-medium text-sm flex items-center h-full'>
                        <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                        <label htmlFor='energy'>Proteins (g)</label>
                    </div>
                    <NumberInput name="proteins" placeholder="g" value={form.proteins.value.value} styleWidth="w-full" rightAlign onChange={handleChangeNutVal}/>
                </div>
                <button className="button w-1/2 flex justify-center items-center text-center flex-col" onClick={(e) => {e.preventDefault(); setBarCodeActive(true)}}>
                    <img className="w-14 h-14" src={barcode} alt="barcode scanning icon"/>
                    <div className="mt-2 font-inter font-medium text-md">Scan a Barcode</div>
                </button>
            </div>
            {
                type === "adding" ?
                <Button name="Add" submit/>
                :
                <Button name="Save" submit/>
            }
            {barCodeActive ?
                <BarcodeScannerDialog quitDialog={(res: any) => {setBarCodeActive(false); handleBarCodeScan(res);}}/>
                :
                <></>
            }
        </form>
    );
}

export default AddingMealMeal;