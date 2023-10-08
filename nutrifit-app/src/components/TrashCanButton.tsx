import { FunctionComponent } from "react"
import TrashSVG from "../svg/TrashSVG";

type Props = {
    idConsumable: number;
    action: Function;
    color?: string;
}

const TrashCanButton: FunctionComponent<Props> = ( { action, color, idConsumable } ) => {

    return <button className="left_arrow_button" onClick={(e) => {action(e, idConsumable)}}>
        <TrashSVG primary={(color ?? "fill-black")}/>
    </button>
}

export default TrashCanButton;