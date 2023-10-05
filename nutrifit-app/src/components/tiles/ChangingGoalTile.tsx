
import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../Button';
import MultipleDoughnutChart from '../MultipleDoughnutChart';
import NumberInput from '../NumberInput';
import { getnutritionalgoal, changenutritionalgoal } from '../../services/api-service';
import { zeroIfIsNaN } from '../../helpers/nanHelper';
import { useToasts } from '../../context/ToastContext';
import Loader from '../Loader';

type Form = {
    energy: number;
    carbos: number;
    fats: number;
    proteins: number;
}

const ChangingGoalTile: FunctionComponent = () => {

    const { pushToast } = useToasts();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<Form>({
        energy: 0,
        carbos: 0,
        fats: 0,
        proteins: 0
    })

    useEffect(() => {
        setLoading(true);
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

        const energy = zeroIfIsNaN(form.energy);
        const carbos = zeroIfIsNaN(form.carbos);
        const fats = zeroIfIsNaN(form.fats);
        const proteins = zeroIfIsNaN(form.proteins);

        let updatedEnergy = energy;
        let updatedCarbos = carbos;
        let updatedFats = fats;
        let updatedProteins = proteins;

        if (name === 'energy') {
            updatedEnergy = value;
            const coef = value/25;
            updatedCarbos = coef*2;
            updatedFats = coef;
            updatedProteins = coef*2;
        } else if (name === 'carbos') {
            updatedCarbos = value;
            updatedEnergy = (zeroIfIsNaN(value) * 4) + (fats * 9) + (proteins * 4);
        } else if (name === 'fats') {
            updatedFats = value;
            updatedEnergy = (carbos * 4) + (zeroIfIsNaN(value) * 9) + (proteins * 4);
        } else if (name === 'proteins') {
            updatedProteins = value;
            updatedEnergy = (carbos * 4) + (fats * 9) + (zeroIfIsNaN(value) * 4);
        }
        setForm({
            ...form,
            energy: Math.round(updatedEnergy),
            carbos: Math.round(updatedCarbos),
            fats: Math.round(updatedFats),
            proteins: Math.round(updatedProteins)
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
        <form className='bg-neutral-800  my-6 mx-4 rounded-lg p-4' onSubmit={handleSubmit}>
            <div className="tile_title text-left">Change daily goal</div>
            {loading ?

                <div className="w-full flex items-center justify-center my-6">
                    <Loader/> 
                </div>

            :

                <div className="flex justify-evenly items-center">
                    <MultipleDoughnutChart type="proportions" nutriData={
                        {
                            energy:form.energy,
                            energy_unit:"kcal",
                            energy_goal:2200,
                            carbos_percents: form.carbos*4,
                            fats_percents: form.fats*9,
                            proteins_percents: form.proteins*4
                        }}/>
                    <div className="ml-2 text-white">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
                                    <span>Energy</span>
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="energy" value={form.energy} maxlength={4} placeholder="kcal" onChange={handleChangeGoal}/>
                                    <span className='w-8'>kcal</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                                    <span className='overflow-hidden'>Carbohydrates</span>
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="carbos" value={form.carbos} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                    <span className='w-8'>g</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                                    Fats
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="fats" value={form.fats} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                    <span className='w-8'>g</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <div className='flex items-center'>
                                    <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
                                    Proteins
                                </div>
                                <div className="flex items-center">
                                    <NumberInput name="proteins" value={form.proteins} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
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