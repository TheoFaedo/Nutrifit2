
import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../Button';
import MultipleDoughnutChart from '../MultipleDoughnutChart';
import NumberInput from '../NumberInput';
import { getnutritionalgoal, changenutritionalgoal } from '../../services/api-service';
import { useToasts } from '../../context/ToastContext';
import Loader from '../Loader';
import { Energy, EnergyInKcal } from '../../models/valueObjects/Energy';
import { MACRO_TYPES, Weight, WeightInGrams } from '../../models/valueObjects/Weight';

type Form = {
    energy: Energy;
    carbos: Weight;
    fats: Weight;
    proteins: Weight;
}

const ChangingGoalTile: FunctionComponent = () => {

    const { pushToast } = useToasts();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<Form>({
        energy: EnergyInKcal.create(0),
        carbos: WeightInGrams.create(0),
        fats: WeightInGrams.create(0),
        proteins: WeightInGrams.create(0)
    })

    useEffect(() => {
        getnutritionalgoal().then((res) => {
            setForm({
                energy: res.energy_goal,
                carbos: res.carbohydrates_goal,
                fats: res.fats_goal,
                proteins: res.proteins_goal
            });
            setLoading(false);
        })
    }, [])

    const handleChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = parseFloat(e.target.value);

        let updatedEnergy = form.energy;
        let updatedCarbos = form.carbos;
        let updatedFats = form.fats;
        let updatedProteins = form.proteins;
        
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
            energy: EnergyInKcal.create(Math.round(updatedEnergy.value)),
            carbos: WeightInGrams.create(Math.round(updatedCarbos.value)),
            fats: WeightInGrams.create(Math.round(updatedFats.value)),
            proteins: WeightInGrams.create(Math.round(updatedProteins.value))
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changenutritionalgoal({
            energy_goal: form.energy,
            carbohydrates_goal: form.carbos,
            fats_goal: form.fats,
            proteins_goal: form.proteins
        }).then((res) => {
            if(res.success) pushToast({content: "Goal changed successfully"})
            else pushToast({content: "Failed to change goal", type: "error"});
        });
    }

    return (
        <form className='changing_goal_tile' onSubmit={handleSubmit}>
            <div className="tile_title text-left">Change daily goal</div>
            {loading ?

                <div className="w-full flex items-center justify-center my-6">
                    <Loader/> 
                </div>

            :

                <div className="flex justify-evenly items-center changing_goal_tile_inside">
                    <MultipleDoughnutChart nutriData={
                        {
                            energy: form.energy,
                            energy_unit: "kcal",
                            carbos: form.carbos.toKcal(MACRO_TYPES.CARBOHYDRATE),
                            fats: form.fats.toKcal(MACRO_TYPES.FAT),
                            proteins: form.proteins.toKcal(MACRO_TYPES.PROTEIN)
                        }}/>
                    <div className="ml-2 text-white ">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
                                    <span>Energy</span>
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="energy" value={form.energy.value} maxlength={4} placeholder="kcal" onChange={handleChangeGoal}/>
                                    <span className='w-8'>kcal</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                                    <span className='overflow-hidden'>Carbohydrates</span>
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="carbos" value={form.carbos.value} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                    <span className='w-8'>g</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                                    Fats
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="fats" value={form.fats.value} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                    <span className='w-8'>g</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                                    Proteins
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="proteins" value={form.proteins.value} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                    <span className='w-8'>g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            }
            
            <Button name="Save" submit/>
            
        </form>
    );
}

export default ChangingGoalTile;