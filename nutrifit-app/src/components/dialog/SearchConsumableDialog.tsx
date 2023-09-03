import { FunctionComponent, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import left_arrow from "../../img/left_arrow.png";
import TextInput from "../TextInput";
import Consumable from "../../models/Consumable";
import { consumables, consumablesOfAuthor } from "../../services/api-service";
import ListSelectorButton from "../ListSelectorButton";
import { UserContext } from "../../context/UserContext";

type Props = {
    addToList: Function; 
    quitDialog: Function;
    active: boolean;
}

const SearchConsumableDialog : FunctionComponent<Props> = (props) => {

    const { idToken } = useContext(UserContext);

    const idTokenOfUser = idToken ? idToken : "";

    const {active, quitDialog} = props;

    const [keyword, setKeyword] = useState("");
    const [consumablesList, setConsumablesList] = useState<Consumable[]>([]);
    const [categActive, setCategActive] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);

        categActive === 0 ? 
        consumablesOfAuthor(e.target.value, idTokenOfUser).then((res) => {
            setConsumablesList(res["consumables"]);
        })
        : 
        consumables(e.target.value).then((res) => {
            setConsumablesList(res["consumables"]);
        })
    }

    const handleChangeListSelector = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setCategActive(index);

        index === 0 ? 
        consumablesOfAuthor(keyword, idTokenOfUser).then((res) => {
            setConsumablesList(res["consumables"]);
        })
        : 
        consumables(keyword).then((res) => {
            setConsumablesList(res["consumables"]);
        })
    }

    const consumablesNode = consumablesList && consumablesList.map((cons) => (
        <div key={cons.idConsumable} className="bg-neutral-800 my-2 rounded-lg py-2 px-4 flex justify-between items-center">
            <div>
                <div className="h-full text-left">{cons.name ? cons.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.energy} kcal, {cons.quantity_label}</div>
            </div>
            <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 gradient-bg text-3xl" onClick={() => {props.addToList(cons); quitDialog()}}>+</button>
        </div>
    ))

    useEffect(() => {
        consumablesOfAuthor(keyword, idTokenOfUser).then((res) => {
            setConsumablesList(res["consumables"]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(active){
        return createPortal(
            <div className="dialog font-inter flex flex-col h-full">
                <div className="h-12 gradient-bg flex items-center">
                    <button onClick={() => quitDialog()} className="rounded-full mx-2 active:bg-black">
                    <img src={left_arrow} className="h-7 w-7 m-1" alt="left oriented arrow" />
                    </button>
                </div>
                <div className="text-white flex flex-col flex-grow">
                    <TextInput className="my-4 px-6" name="searchfield" value={keyword} placeholder="Search consumable" onChange={handleChange} />
                    <ListSelectorButton names={["My own meals", "Public meals"]} active={categActive} onClick={handleChangeListSelector}/>
                    <div className="bg-neutral-900 px-4 pt-4 h-0 flex-grow overflow-y-scroll scrollbar-hide">
                        <div className="text-lg font-medium text-left">{categActive === 0 ? "My own" : "Public"}</div>
                        <ul className="mt-2">
                            {consumablesNode}
                        </ul>
                    </div>
                </div>
            </div>,
        document.getElementById("root")!);
    }
    return <></>

    
}

export default SearchConsumableDialog;