
import { FunctionComponent, useEffect, useState } from 'react';
import Consumption from '../../models/Consumption';
import { addConsumption, changeConsumption, consumptionListAtDate, removeConsumption } from '../../services/api-service';
import Button from '../Button';
import SearchConsumableDialog from '../dialog/SearchConsumableDialog';
import Consumable from '../../models/Consumable';
import Loader from '../Loader';
import { useAccount } from '../../hooks/useAccount';
import { ConsumableQuantityCard } from '../ConsumableQuantityCard';

type Props = {
    date: Date;
    setConsumptionList: React.Dispatch<React.SetStateAction<Consumption[]>>;
    consumptionList: Consumption[];
}

const DiaryTile: FunctionComponent<Props> = ( {date, setConsumptionList, consumptionList} ) => {

    const { account } = useAccount();
    const [loading, setLoading] = useState(true);

    const [dialogActive, setDialogActive] = useState(false);

    const quitDialog = () => {
        setDialogActive(false);
    }

    const addConsumable = (cons: Consumable) => {
        addConsumption({
            consumable: cons,
            idUser: account.token,
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
                        idUser: account.token,
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
        <ConsumableQuantityCard 
            idCons={cons.idConsumption ?? -1}
            name={cons.consumable.name}
            proportion={cons.proportion}
            quantity_label={cons.consumable.quantity_label}
            consumableEnergy={cons.consumable.energy.value}
            handleChangeProportion={handleChangeProportion} 
            handleBlurSaveConsumption={() => {handleBlurSaveConsumption(cons)}} 
            handleRemoveConsumption={() => handleRemoveConsumption(cons.idConsumption)} 
        />
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