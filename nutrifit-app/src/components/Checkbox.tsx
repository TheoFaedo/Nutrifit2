import { ChangeEventHandler, FunctionComponent } from "react";

type Props = {
    name: string;
    label: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FunctionComponent<Props> = ({name, label, checked, onChange}) => {

    return (
        <div className="w-[12em] h-[2.75rem] flex items-center justify-center">
            <input checked={checked} onChange={onChange} type="checkbox" name={name}/>
            <label htmlFor="checkbox" className="font-inter text-white mx-2">{label}</label>
        </div>
    );
}