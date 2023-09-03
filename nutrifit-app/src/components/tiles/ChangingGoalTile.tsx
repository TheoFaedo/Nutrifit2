
import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../Button';
import MultipleDoughnutChart from '../MultipleDoughnutChart';
import NumberInput from '../NumberInput';
import { getnutritionalgoal, changenutritionalgoal } from '../../services/api-service';

type Form = {
    energy: number;
    carbos: number;
    fats: number;
    proteins: number;
}

const ChangingGoalTile: FunctionComponent = () => {

    const [form, setForm] = useState<Form>({
        energy: 10,
        carbos: 10,
        fats: 10,
        proteins: 10
    })

    useEffect(() => {
        getnutritionalgoal().then((res) => {
            setForm({
                energy: res.energy_goal,
                carbos: res.carbohydrates_goal,
                fats: res.fats_goal,
                proteins: res.proteins_goal
            })
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
            updatedEnergy = value;
            const coef = value/25;
            updatedCarbos = coef*2;
            updatedFats = coef;
            updatedProteins = coef*2;
        } else if (name === 'carbos') {
            updatedCarbos = value;
            updatedEnergy = (value * 4) + (form.fats * 9) + (form.proteins * 4);
        } else if (name === 'fats') {
            updatedFats = value;
            updatedEnergy = (form.carbos * 4) + (value * 9) + (form.proteins * 4);
        } else if (name === 'proteins') {
            updatedProteins = value;
            updatedEnergy = (form.carbos * 4) + (form.fats * 9) + (value * 4);
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
        });
    }

    return (
        <form className='bg-neutral-800  my-6 mx-4 rounded-lg p-4' onSubmit={handleSubmit}>
            <div className="tile_title text-left">Change daily goal</div>
            <div className="flex justify-evenly items-center">
                <MultipleDoughnutChart type="proportions" nutriData={
                    {
                        energy:form.energy,
                        energy_unit:"kcal",
                        energy_goal:2200,
                        carbos_percents: form.carbos*4,
                        fats_percents: form.fats*9,
                        proteins_percents: form.proteins*4
                    }}
                />
                <div className="ml-2 text-white">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
                                Energy
                            </div>
                            <div className="flex items-center">
                                <NumberInput name="energy" value={form.energy} maxlength={4} placeholder="kcal" onChange={handleChangeGoal}/>
                                <span className='w-8'>kcal</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
                                Carbohydrates
                            </div>
                            <div className="flex items-center">
                                <NumberInput name="carbos" value={form.carbos} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                <span className='w-8'>g</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
                                Fats
                            </div>
                            <div className="flex items-center">
                                <NumberInput name="fats" value={form.fats} maxlength={4} placeholder="g" onChange={handleChangeGoal}/>
                                <span className='w-8'>g</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <div>
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
            <Button name="Save" submit/>
            
        </form>
    );
}

export default ChangingGoalTile;