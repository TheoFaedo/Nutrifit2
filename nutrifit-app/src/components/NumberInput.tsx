import { FunctionComponent } from 'react';

type Props = {
    value: number;
    name: string;
    onChange?: Function;
    maxlength?: number;
    placeholder?: string;
    className?: string;
}

const NumberInput: FunctionComponent<Props> = (props) => {

    const {value, name, onChange, maxlength, placeholder, className} = props;

    const inputPlaceholder = placeholder ? placeholder : "";
    const inputMaxLength = maxlength ? maxlength : 4;


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }

    return (
        <input className={"w-14 ml-2 bg-neutral-700 py-1 px-0.5 " + className} min={0} name={name} type="number" placeholder={inputPlaceholder} value={value} maxLength={inputMaxLength} onChange={onChangeHandler}/>
    );
}

export default NumberInput;