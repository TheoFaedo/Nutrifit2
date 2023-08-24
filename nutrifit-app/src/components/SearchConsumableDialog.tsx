import { FunctionComponent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import left_arrow from "../img/left_arrow.png";
import TextInput from "./TextInput";
import Consumable from "../models/Consumable";
import { consumables } from "../services/api-service";

type Props = {
    addToList: Function; 
    quitDialog: Function;
    active: boolean;
}

const SearchConsumableDialog : FunctionComponent<Props> = (props) => {

    const {active, quitDialog} = props;

    const [keyword, setKeyword] = useState("");
    const [consumablesList, setConsumablesList] = useState<Consumable[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        consumables(e.target.value).then((res) => {
            setConsumablesList(res["publicConsumables"]);
        })
    }

    const consumablesNode = consumablesList && consumablesList.map((cons) => (
        <div key={cons.idConsumable} className="bg-neutral-700 my-2 rounded-lg py-2 px-4 flex justify-between items-center">
            <div>
                <div className="h-full text-left">{cons.name ? cons.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.energy} kcal, {cons.quantity_label}</div>
            </div>
            <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 bg-main text-3xl" onClick={() => {props.addToList(cons); quitDialog()}}>+</button>
        </div>
    ))

    useEffect(() => {
        consumables(keyword).then((res) => {
            setConsumablesList(res["publicConsumables"]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(active){
        return createPortal(
            <div className="dialog font-inter">
            <div className="h-12 gradient-bg flex items-center">
                 <button onClick={() => quitDialog()} className="rounded-full mx-2 active:bg-black"><img src={left_arrow} className="h-7 w-7 m-1" alt="left oriented arrow"/></button>
            </div>
            <div className="px-4 text-white">
                 <TextInput className="my-4" name={"searchfield"} value={keyword} placeholder={"Search consumable"} onChange={handleChange}/>
                 <div className="text-lg font-medium text-left mt-2">Public</div>
                 <ul className="mt-2">
                     {consumablesNode}
                 </ul>
            </div>
         </div>,
        document.getElementById("root")!);
    }
    return <></>

    
}

export default SearchConsumableDialog;