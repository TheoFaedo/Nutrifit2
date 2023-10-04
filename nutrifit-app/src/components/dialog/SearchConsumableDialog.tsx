import { FunctionComponent, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import left_arrow from "../../img/left_arrow.png";
import TextInput from "../TextInput";
import Consumable from "../../models/Consumable";
import { consumables, consumablesOfAuthor, removeConsumable } from "../../services/api-service";
import ListSelectorButton from "../ListSelectorButton";
import { UserContext } from "../../context/UserContext";
import TrashSVG from "../../svg/TrashSVG";
import EditConsumableDialog from "./EditConsumableDialog";

type Props = {
    type?: "adding" | "edit";
    addToList?: Function; 
    quitDialog: Function;
    active: boolean;
}

const SearchConsumableDialog : FunctionComponent<Props> = ({ type = "adding", addToList = () => {}, quitDialog = () => {}, active }) => {

    const { idToken } = useContext(UserContext);

    const idTokenOfUser = idToken ? idToken : "";

    const [animIsInBottom, setAnimIsInBottom] = useState(true); 

    const [consumableToEdit, setConsumableToEdit] = useState<Consumable>(
        new Consumable(-1,"",0,0,0,0,"",true,"MEAL",-1,[])
    );
    const [editActive, setEditActive] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [consumablesList, setConsumablesList] = useState<Consumable[]>([]);
    const [categActive, setCategActive] = useState(0);

    const updateConsumablesList = (categActiveParam: number, keywords: string) => {
        if(type === "adding"){
            return categActiveParam === 0 ? 
            consumablesOfAuthor(keywords, idTokenOfUser).then((res) => {
                setConsumablesList(res["consumables"]);
            })
            : 
            consumables(keywords).then((res) => {
                setConsumablesList(res["consumables"]);
            })
        }else{
            return consumablesOfAuthor(keywords, idTokenOfUser).then((res) => {
                setConsumablesList(res["consumables"]);
            })
        }
    }

    const handleEdit = (consumable: Consumable) => {
        setConsumableToEdit(consumable);
        setEditActive(true);
    }

    const handleRemove = (id: number|undefined) => {
        if(id){
            removeConsumable(id).then((res) => {
                if(res.success){
                    setConsumablesList(consumablesList.filter((cons) => cons.idConsumable !== id));
                }
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);

        updateConsumablesList(categActive, e.target.value);
    }

    const handleChangeListSelector = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setCategActive(index);
    
        updateConsumablesList(index, keyword);
    }

    const consumablesNode = consumablesList && consumablesList.map((cons) => (
        <div key={cons.idConsumable} className={"bg-neutral-800 my-2 rounded-lg py-2 px-4 flex justify-between items-center " + (type === "edit" ? "cursor-pointer" : "")} onClick={() => { handleEdit(cons) }}>
            <div>
                <div className="h-full text-left">{cons.name ? cons.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.energy} kcal, {cons.quantity_label}</div>
            </div>
            {
                type === "adding" 
                ? 
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 gradient-bg text-3xl" onClick={() => {addToList(cons); quitDialog()}}>+</button>
                :
                <button className="" onClick={() => {handleRemove(cons.idConsumable)}}><TrashSVG primary="fill-neutral-500"/></button>
            }
            
        </div>
    ))

    useEffect(() => {
        if(active || (active && !editActive)){
            consumablesOfAuthor(keyword, idTokenOfUser).then((res) => {
                setConsumablesList(res["consumables"]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, editActive]);

    const translation = active ? "translate-y-0" : "translate-y-full";

    return createPortal(
        <div className={"dialog z-30 font-inter flex flex-col h-full transition-transform duration-500 ease-in-out " + translation} >
            <div className="h-12 gradient-bg flex items-center">
                <button onClick={() => quitDialog()} className="rounded-full mx-2 active:bg-black">
                <img src={left_arrow} className="h-7 w-7 m-1" alt="left oriented arrow" />
                </button>
            </div>
            <div className="text-white flex flex-col flex-grow">
                <TextInput className="my-4 px-6" name="searchfield" value={keyword} placeholder="Search consumable" onChange={handleChange} />
                { type === "adding" ? <ListSelectorButton names={["My own meals", "Public meals"]} active={categActive} onClick={handleChangeListSelector}/> : <></> }
                <div className="bg-neutral-900 px-4 pt-4 h-0 flex-grow overflow-y-scroll scrollbar-hide">
                    <div className="text-lg font-medium text-left">{categActive === 0 ? "My own" : "Public"}</div>
                    <ul className="mt-2">
                        {consumablesNode}
                    </ul>
                </div>
            </div>
            {type === "edit" ?
            <EditConsumableDialog active={editActive} quitDialog={() => setEditActive(false)} consumableToEdit={consumableToEdit} handleRemove={handleRemove} />
            :
            <></>}
        </div>,
    document.getElementById("root")!);
    
    

    
}

export default SearchConsumableDialog;