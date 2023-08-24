import { FunctionComponent } from "react";

type Props = {
    names: string[];
    active: number;
    onClick?: Function;
}

const SelectorButton: FunctionComponent<Props> = (props) => {

    const {names, active, onClick} = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        onClick?.(e, index);
    }

    return (
        <div className="w-full">
            <button name="s1" className={"button_selector rounded-l-md " + (active === 0 ? "button_selector_active" : "")} onClick={(e) => handleClick(e, 0)}>{names[0]}</button> 
            <button name="s2" className={"button_selector rounded-r-md " + (active === 1 ? "button_selector_active" : "")} onClick={(e) => handleClick(e, 1)}>{names[1]}</button>
        </div>
    )
}

export default SelectorButton;