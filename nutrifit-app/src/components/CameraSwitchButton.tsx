import { FunctionComponent } from "react"
import switch_camera from "../img/switch_camera.png";

type Props = {
    action: Function;
    color?: string;
}

const CameraSwitchButton: FunctionComponent<Props> = ( { action, color } ) => {

    return <button className="left_arrow_button absolute top-8 right-4 gradient-bg" onClick={(e) => {action(e)}}>
        <img src={switch_camera} className="h-7 w-7 m-1" alt="switch camera"/>
    </button>
}

export default CameraSwitchButton;