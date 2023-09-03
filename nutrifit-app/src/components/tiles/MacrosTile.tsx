import { FunctionComponent, useEffect, useState } from 'react';
import DoughnutChart from '../DoughnutChart';
import { getnutritionalgoal } from '../../services/api-service';

type NutritionnalGoal = {
    carbohydrates_goal: number;
    fats_goal: number;
    proteins_goal: number;
    energy_goal: number;
}

const MacrosTile: FunctionComponent = () => {

    const [nutritionalgoal, setNutritionalgoal] = useState<NutritionnalGoal>({
        carbohydrates_goal: 0,
        fats_goal: 0,
        proteins_goal: 0,
        energy_goal: 0
    });

    useEffect(() => {
        getnutritionalgoal().then((res) => {
            setNutritionalgoal(res);
        })
    }, []);

    return (
        <div className='bg-neutral-800 my-6 mx-4 rounded-lg p-4 flex flex-col font-inter'>
            <div className="tile_title text-left">Macros</div>
            <div className='flex justify-evenly items-center'>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-carbohydrates font-semibold text-md'>Carbohydrates</div>
                    <DoughnutChart className="h-24 w-24" label={'Carbohydrates'} color={'#38D386'} value={20} goal={nutritionalgoal.carbohydrates_goal} />
                    <div className='mt-2 text-neutral-400'>20g left</div>
                </div>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-fats font-semibold text-md'>Fat</div>
                    <DoughnutChart className="h-24 w-24" label={'Fats'} color={'#CC57F5'} value={20} goal={nutritionalgoal.fats_goal} />
                    <div className='mt-2 text-neutral-400'>20g left</div>
                </div>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-proteins font-semibold text-md'>Proteins</div>
                    <DoughnutChart className="h-24 w-24" label={'Proteins'} color={'#EEBD30'} value={20} goal={nutritionalgoal.proteins_goal} />
                    <div className='mt-2 text-neutral-400'>20g left</div>
                </div>
            </div>
        </div>
    );
}

export default MacrosTile;