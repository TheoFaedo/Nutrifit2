import { FunctionComponent, MouseEventHandler } from "react"
import NumberInput from "./NumberInput"

type Props = {
    idCons: number,
    name?: string,
    consumableEnergy: number,
    proportion: number,
    quantity_label: string,
    handleChangeProportion: Function,
    handleBlurSaveConsumption: Function,
    handleRemoveConsumption: MouseEventHandler<HTMLButtonElement>,
    locked: boolean
}

export const ConsumableQuantityCard: FunctionComponent<Props> = ({ idCons, name, consumableEnergy, proportion, quantity_label, handleChangeProportion, handleBlurSaveConsumption, handleRemoveConsumption, locked }) => {

    return <div key={idCons} className={"bg-neutral-700 mt-2 rounded-lg py-2 px-4 flex justify-between items-center"}>
            <div>
                <div className="h-full text-left text-white w-36 overflow-hidden text-ellipsis">{name ?? "undefined"}</div>
                <div className="h-full text-left text-neutral-400 font-normal">{Math.round(consumableEnergy*proportion*10)/10} kcal, {(proportion === 1 ? "" : (proportion + "x")) + quantity_label}</div>
            </div>
            <div className="flex items-center gap-6">

                {locked ? 
                <div className="text-2xl text-white font-inter">x{proportion}</div>
                :
                <NumberInput value={proportion} name={idCons+""} decimalLength={1} onChange={handleChangeProportion} onBlur={handleBlurSaveConsumption} backgroundColor="bg-neutral-600" textColor="text-white" />
                }

                {!locked && <button className="rounded-full flex items-center justify-center h-10 w-10 p-2 gradient-bg text-3xl text-white" onClick={(handleRemoveConsumption)}><span className="-translate-y-[1px]">-</span></button>}
            </div>
        </div>
}