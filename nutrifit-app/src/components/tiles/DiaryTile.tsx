
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import Consumption from '../../models/Consumption';
import { addConsumption, changeConsumption, consumptionListAtDate, removeConsumption } from '../../services/api-service';
import NumberInput from '../NumberInput';
import Button from '../Button';
import SearchConsumableDialog from '../dialog/SearchConsumableDialog';
import Consumable from '../../models/Consumable';
import { UserContext } from '../../context/UserContext';
import Loader from '../Loader';

type Props = {
    date: Date;
    setConsumptionList: React.Dispatch<React.SetStateAction<Consumption[]>>;
    consumptionList: Consumption[];
}

const DiaryTile: FunctionComponent<Props> = ( {date, setConsumptionList, consumptionList} ) => {

    const { idToken } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const [dialogActive, setDialogActive] = useState(false);

    const quitDialog = () => {
        setDialogActive(false);
    }

    const addConsumable = (cons: Consumable) => {
        setLoading(true);
        addConsumption({
            consumable: cons,
            idUser: idToken,
            last_update: new Date(),
            consumed_on: date,
            proportion: 1
        }).then((response) => {
            if(response.success){
                setLoading(false);
                setConsumptionList([...consumptionList, 
                    {
                        idConsumption: response.idConsumption,
                        consumable: cons,
                        idUser: idToken,
                        last_update: new Date(),
                        consumed_on: date,
                        proportion: 1
                    }
                ]);
            }
        });
    }

    const handleChangeProportion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsumptionList(consumptionList.map((cons) => {
            if(cons.idConsumption === Number(e.target.name)){
                return {
                    ...cons,
                    proportion: Number(e.target.value)
                }
            }
            return cons
        }))
    }

    const handleBlurSaveConsumption = (cons: Consumption) => {
        changeConsumption(cons);
    }

    const handleRemoveConsumption = (idConsumption: number|undefined) => {
        setConsumptionList(consumptionList.filter((cons) => cons.idConsumption !== idConsumption));
        if(idConsumption) removeConsumption(idConsumption);
    }

    const consumptionListNode = consumptionList && consumptionList.map((cons) => (
        <div key={cons.idConsumption !== undefined ? cons.idConsumption : ""+Math.floor(Math.random()*1000)} className={"bg-neutral-700 my-2 rounded-lg py-2 px-4 flex justify-between items-center"}>
            <div>
                <div className="h-full text-left text-white w-36 overflow-hidden text-ellipsis">{cons.consumable.name ? cons.consumable.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.consumable.energy*cons.proportion} kcal, {(cons.proportion === 1 ? "" : (cons.proportion + "x")) + cons.consumable.quantity_label}</div>
            </div>
            <div className="flex items-center gap-6">
                <NumberInput value={cons.proportion} name={cons.idConsumption+""} onChange={handleChangeProportion} onBlur={() => handleBlurSaveConsumption(cons)} backgroundColor="bg-neutral-600" textColor="text-white" />
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 gradient-bg text-3xl text-white" onClick={() => {handleRemoveConsumption(cons.idConsumption)}}>-</button>
            </div>
        </div>
    ));

    useEffect(() => {
        setLoading(true);
        consumptionListAtDate(date).then((res) => {
            setConsumptionList(res);
            setLoading(false);
        })
    }, [date, setConsumptionList]);

    return (
        <div className='diary_tile'>
            <div className="tile_title text-left">Diary</div>
            <div>
                {loading ? 
                <div className="w-full flex items-center justify-center my-6">
                    <Loader/> 
                </div>
                :
                consumptionListNode}
            </div>
            <div className="mx-6"><Button name="Add food" inverted onClick={() => {setDialogActive(true)}}/></div>
            <SearchConsumableDialog active={dialogActive} quitDialog={quitDialog} addToList={addConsumable} dialogName='Search food to add'/>
        </div>
    );
}

export default DiaryTile;