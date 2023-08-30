import { FunctionComponent } from "react";

type Props = {
    names: string[];
    active: number;
    onClick?: Function;
}

const ListSelectorButton: FunctionComponent<Props> = (props) => {

    const {names, active, onClick} = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        onClick?.(e, index);
    }

    return (
        <div className="w-full">
            <button name="s1" className={"w-1/2 border-main text-center px-6 py-2" + (active === 0 ? " border-b-4" : "")} onClick={(e) => handleClick(e, 0)}>{names[0]}</button> 
            <button name="s2" className={"w-1/2 border-main text-center px-6 py-2" + (active === 1 ? " border-b-4" : "")} onClick={(e) => handleClick(e, 1)}>{names[1]}</button>
        </div>
    )
}

export default ListSelectorButton;