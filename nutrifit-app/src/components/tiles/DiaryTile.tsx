
import { FunctionComponent, useEffect, useState } from 'react';
import Consumption from '../../models/Consumption';
import Consumable from '../../models/Consumable';
import { consumptionListAtDate, removeConsumption } from '../../services/api-service';
import NumberInput from '../NumberInput';

type Props = {
    date: Date;
}

const DiaryTile: FunctionComponent<Props> = ( {date} ) => {

    const [consumptionList, setconsumptionList] = useState<Consumption[]>([]);

    const handleChangeProportion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setconsumptionList(consumptionList.map((cons) => {
            if(cons.idConsumption === Number(e.target.name)){
                return {
                    ...cons,
                    proportion: Number(e.target.value)
                }
            }
            return cons
        }))
    }

    const handleRemoveConsumption = (idConsumption: number) => {
        setconsumptionList(consumptionList.filter((cons) => cons.idConsumption !== idConsumption));
        removeConsumption(idConsumption);
    }

    const consumptionListNode = consumptionList && consumptionList.map((cons) => (
        <div key={cons.idConsumption} className={"bg-neutral-700 my-2 rounded-lg py-2 px-4 flex justify-between items-center"}>
            <div>
                <div className="h-full text-left text-white">{cons.consumable.name ? cons.consumable.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.consumable.energy} kcal, {cons.consumable.quantity_label}</div>
            </div>
            <div className="flex items-center gap-6">
                <NumberInput value={cons.proportion} name={cons.idConsumption+""} onChange={handleChangeProportion} backgroundColor="bg-neutral-600" textColor="text-white" />
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 bg-main text-3xl" onClick={() => {handleRemoveConsumption(cons.idConsumption)}}>-</button>
            </div>
        </div>
    ));

    useEffect(() => {
        consumptionListAtDate(date).then((res) => {
            setconsumptionList(res);
        })
    }, [date]);

    return (
        <div className='bg-neutral-800 my-6 mx-4 rounded-lg p-4 flex flex-col font-inter'>
            <div className="tile_title text-left">Diary</div>
            <div>
                {consumptionListNode}
            </div>
        </div>
    );
}

export default DiaryTile;