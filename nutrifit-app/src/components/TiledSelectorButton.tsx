import { FunctionComponent } from "react";

type Props = {
    names: string[];
    active: number;
    onClick?: Function;
}

const TiledSelectorButton: FunctionComponent<Props> = (props) => {

    const {names, active, onClick} = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        onClick?.(e, index);
    }

    return (
        <div className="w-full flex h-16 gap-2">
            <button name="s1" className={"button_selector_tiled " + (active === 0 ? "button_selector_tiled_active" : "")} onClick={(e) => handleClick(e, 0)}>{names[0]}</button> 
            <button name="s2" className={"button_selector_tiled " + (active === 1 ? "button_selector_tiled_active" : "")} onClick={(e) => handleClick(e, 1)}>{names[1]}</button>
            <button name="s3" className={"button_selector_tiled " + (active === 2 ? "button_selector_tiled_active" : "")} onClick={(e) => handleClick(e, 2)}>{names[2]}</button>
        </div>
    )
}

export default TiledSelectorButton;