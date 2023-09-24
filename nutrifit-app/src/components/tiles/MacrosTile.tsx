import { FunctionComponent, useEffect, useState } from 'react';
import DoughnutChart from '../DoughnutChart';
import { getnutritionalgoal } from '../../services/api-service';
import Consumption from '../../models/Consumption';
import { consumptionsValNutSum } from '../../helpers/diaryHelper';

type NutritionnalGoal = {
    carbohydrates_goal: number;
    fats_goal: number;
    proteins_goal: number;
    energy_goal: number;
}

type NutritionalSum = {
    carbohydrates: number;
    fats: number;
    proteins: number;
    energy: number;
}

type Props = {
    consumptionList : Consumption[];
}

const MacrosTile: FunctionComponent<Props> = ( { consumptionList } ) => {

    const [nutritionalgoal, setNutritionalgoal] = useState<NutritionnalGoal>({
        carbohydrates_goal: 0,
        fats_goal: 0,
        proteins_goal: 0,
        energy_goal: 0
    });

    const [nutritionalSum, setNutritionalSum] = useState<NutritionalSum>({
        carbohydrates: 0,
        fats: 0,
        proteins: 0,
        energy: 0
    });

    useEffect(() => {
        getnutritionalgoal().then((res) => {
            setNutritionalgoal(res);
        });
    }, []);

    useEffect(() => {
        setNutritionalSum(consumptionsValNutSum(consumptionList));
    }, [consumptionList]);

    const carbsDif = nutritionalgoal.carbohydrates_goal-nutritionalSum.carbohydrates;
    const fatsDif = nutritionalgoal.fats_goal-nutritionalSum.fats;
    const proteinsDif = nutritionalgoal.proteins_goal-nutritionalSum.proteins;
    return (
        <div className='bg-neutral-800 my-6 mx-4 rounded-lg p-4 flex flex-col font-inter'>
            <div className="tile_title text-left">Macros</div>
            <div className='flex justify-evenly items-center'>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-carbohydrates font-semibold text-md'>Carbohydrates</div>
                    <DoughnutChart className="h-24 w-24" label={'Carbohydrates'} color={'#38D386'} value={nutritionalSum.carbohydrates} goal={nutritionalgoal.carbohydrates_goal} />
                    <div className={'mt-2 '+ (carbsDif >= 0 ? "text-neutral-400" : "text-red-500")}>
                        {(carbsDif >= 0 ? carbsDif : -1*carbsDif) +"g "+ (carbsDif >= 0 ? "left" : "over")} 
                    </div>
                </div>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-fats font-semibold text-md'>Fat</div>
                    <DoughnutChart className="h-24 w-24" label={'Fats'} color={'#CC57F5'} value={nutritionalSum.fats} goal={nutritionalgoal.fats_goal} />
                    <div className={'mt-2 '+ (fatsDif >= 0 ? "text-neutral-400" : "text-red-500")}>
                        {(fatsDif >= 0 ? fatsDif : -1*fatsDif) +"g "+ (fatsDif >= 0 ? "left" : "over")} 
                    </div>
                </div>
                <div className='flex flex-col items-center w-28 mx-1'>
                    <div className='mb-4 text-proteins font-semibold text-md'>Proteins</div>
                    <DoughnutChart className="h-24 w-24" label={'Proteins'} color={'#EEBD30'} value={nutritionalSum.proteins} goal={nutritionalgoal.proteins_goal} />
                    <div className={'mt-2 '+ (proteinsDif >= 0 ? "text-neutral-400" : "text-red-500")}>
                        {(proteinsDif >= 0 ? proteinsDif : -1*proteinsDif) +"g "+ (proteinsDif >= 0 ? "left" : "over")} 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MacrosTile;