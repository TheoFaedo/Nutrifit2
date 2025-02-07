import { FunctionComponent } from "react";

type Props = {
    names: string[];
    active: number;
    onClick?: Function;
}

const ListSelectorButton: FunctionComponent<Props> = (props) => {

    const {names, active, onClick} = props;

    const tabActive = active >= names.length ? 0 : active;

    const tabNames = names.length === 0 ? ["main"] : names;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        onClick?.(e, index);
    }
    
    return (
        <div className="w-full flex">
            {tabNames.map((name, index) => {
                return <button 
                    key={index} 
                    className={"w-1/2 border-main text-center px-6 py-2" + (tabActive === index ? " border-b-4" : "")} 
                    onClick={(e) => handleClick(e, index)}>{name}
                </button> 
            })}
        </div>
    )
}

export default ListSelectorButton;