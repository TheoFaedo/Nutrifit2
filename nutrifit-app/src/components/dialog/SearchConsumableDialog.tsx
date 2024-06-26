import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TextInput from "../TextInput";
import Consumable from "../../models/Consumable";
import { consumables, consumablesOfAuthor, removeConsumable } from "../../services/api-service";
import ListSelectorButton from "../ListSelectorButton";
import EditConsumableDialog from "./EditConsumableDialog";
import Loader from "../Loader";
import LeftArrowButton from "../LeftArrowButton";
import TrashCanButton from "../TrashCanButton";
import { useAccount } from "../../hooks/useAccount";
import { EnergyInKcal } from "../../models/valueObjects/Energy";
import { WeightInGrams } from "../../models/valueObjects/Weight";
import { useTranslation } from "react-i18next";
import Select from "../Select";

type Props = {
    type?: "adding" | "edit";
    addToList?: Function; 
    quitDialog: Function;
    active: boolean;
    dialogName?: string;
    level?: string;
}

const SearchConsumableDialog : FunctionComponent<Props> = ({ type = "adding", addToList = () => {}, quitDialog = () => {}, active, dialogName = "Search", level="z-30" }) => {

    const { t } = useTranslation("translation", { keyPrefix: "SearchFoodDialog" });

    const { account } = useAccount();

    const [loading, setLoading] = useState(false);

    const idTokenOfUser = account.token;

    const [consumableToEdit, setConsumableToEdit] = useState<Consumable>(
        new Consumable(-1, "", EnergyInKcal.create(0), WeightInGrams.create(0), WeightInGrams.create(0), WeightInGrams.create(0), "1g", true, "MEAL", -1, [])
    );
    const [editActive, setEditActive] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [consumablesList, setConsumablesList] = useState<Consumable[]>([]);
    const [categActive, setCategActive] = useState(0);

    const updateConsumablesList = useCallback((categActiveParam: number, keywords: string, orderBy: string) => {
        if(type === "adding"){
            return categActiveParam === 0 ? 
            consumablesOfAuthor(keywords, idTokenOfUser, orderBy).then((res) => {
                setConsumablesList(res);
            })
            :
            
            consumables(keywords, orderBy).then((res) => {
                setConsumablesList(res);
            })
        }else{
            return consumablesOfAuthor(keywords, idTokenOfUser, orderBy).then((res) => {
                setConsumablesList(res);
            })
        }
    }, [idTokenOfUser, type]);
    
    const [orderBy, setOrderBy] = useState("name");
    const onOrderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(e.target.value);
        setLoading(true);
        updateConsumablesList(categActive, keyword, e.target.value).then(() => {
            setLoading(false);
        });
    }, [setOrderBy, setLoading, updateConsumablesList, categActive, keyword]);

    const handleEdit = (consumable: Consumable) => {
        setConsumableToEdit(consumable);
        setEditActive(true);
    }

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number|undefined) => {
        e.stopPropagation();
        if(id){
            removeConsumable(id).then((res) => {
                if(res.success){
                    setConsumablesList(consumablesList.filter((cons) => cons.idConsumable !== id));
                    if(editActive) setEditActive(false);
                }
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);

        if(e.target.value.length >= 3 || (e.target.value.length < keyword.length && e.target.value.length <= 2)){ 
            setLoading(true);
            updateConsumablesList(categActive, e.target.value, orderBy).then(() => {
                setLoading(false);
            });
        }
        
    }

    const handleChangeListSelector = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setCategActive(index);
    
        updateConsumablesList(index, keyword, orderBy);
    }

    const consumablesNode = consumablesList && consumablesList.map((cons) => (
        <div key={cons.idConsumable} className={"bg-neutral-800 my-2 rounded-lg py-2 px-4 flex justify-between items-center " + (type === "edit" ? "cursor-pointer" : "")} onClick={() => { handleEdit(cons) }}>
            <div>
                <div className="h-full text-left">{cons.name ? cons.name : "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{cons.energy.value} {cons.energy.unitLabel}, {cons.quantity_label}</div>
            </div>
            {
                type === "adding" 
                ? 
                <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 gradient-bg text-3xl pb-[12px]" onClick={() => {addToList(cons); quitDialog()}}>+</button>
                :
                <TrashCanButton action={handleRemove} idConsumable={(cons.idConsumable ?? -1)} color="fill-neutral-500" />
            }
            
        </div>
    ))

    useEffect(() => {
        if(active || (active && !editActive)){
            setLoading(true);
            setKeyword("");
            updateConsumablesList(categActive, "", orderBy).then((res) => {
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, editActive]);

    const translation = active ? "translate-y-0" : "translate-y-full";

    return createPortal(
        <div className={"dialog font-inter flex flex-col h-full transition-transform duration-500 ease-in-out " + translation + " " + level} >
            <div className="h-12 gradient-bg flex items-center relative">
                <div className="font-inter font-semibold text-lg pt-1 absolute ml-auto mr-auto top-[16%] left-0 right-0 bottom-0 w-fit">{dialogName}</div>
                <LeftArrowButton quitDialog={quitDialog}/>
            </div>
            <div className="text-white flex flex-col flex-grow">
                <TextInput className="my-4 px-6" name="searchfield" value={keyword} placeholder={t('SearchFoodPlaceholderDialog')} onChange={handleChange} />
                { type === "adding" ? <ListSelectorButton names={[t('OwnMealsSelectButtonDialog'), t('PublicMealsSelectButtonDialog')]} active={categActive} onClick={handleChangeListSelector}/> : <></> }
                <div className="bg-neutral-900 px-4 pt-4 h-0 flex-grow overflow-y-scroll scrollbar-hide">
                    <div className="flex justify-between mb-4 items-center">
                        <div className="text-lg font-medium text-left">{categActive === 0 ? t('MyOwnTitleDialog') : t('PublicTitleDialog')}</div>
                        <div className="flex justify-between gap-2 items-center">
                            <div>{t('OrderBy')}</div>
                            <div>
                                <Select
                                values={[
                                    {value: "lastupdated", label: t('LastUpdated')},
                                    {value: "mostrecent", label: t("MostRecent")},
                                    {value: "oldest", label: t("Oldest")},
                                    {value: "nameAZ", label: "A-Z"},
                                    {value: "nameZA", label: "Z-A"},
                                ]}
                                selectedValue={orderBy}
                                onChange={onOrderChange}
                                fitcontent
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="mt-2">
                        {loading ? 
                        <div className="w-full flex items-center justify-center my-6">
                            <Loader/>
                        </div>
                        :
                        consumablesNode
                        }
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