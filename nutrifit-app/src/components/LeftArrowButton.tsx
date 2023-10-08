import { FunctionComponent } from "react";
import left_arrow from "../img/left_arrow.png";

type Props = {
    quitDialog: Function;
}

const LeftArrowButton : FunctionComponent<Props> = ( { quitDialog } ) => {
    return <button onClick={() => {quitDialog()}} className="left_arrow_button">
        <img src={left_arrow} className="h-7 w-7 m-1" alt="left oriented arrow" />
    </button>;
}

export default LeftArrowButton;