import { FunctionComponent } from 'react';

type Props = {
    value: number;
    name: string;
    onChange?: Function;
    onBlur?: Function;
    maxlength?: number;
    placeholder?: string;
    className?: string;
    rightAlign?: boolean;
    backgroundColor?: string;
    textColor?: string;
}

const NumberInput: FunctionComponent<Props> = (props) => {

    const {value, name, onChange, onBlur, maxlength, placeholder, className, rightAlign, backgroundColor, textColor} = props;

    const inputPlaceholder = placeholder ? placeholder : "";
    const inputMaxLength = maxlength ? maxlength : 4;
    const rightAl = rightAlign ? "text-right" : "";
    const inputBackgroundColor = backgroundColor ? backgroundColor : "bg-neutral-700";
    const inputTextColor = textColor ? textColor : "";


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }

    return (
        <input className={"w-14 ml-2 py-1 px-0.5 " + className + " " + rightAl + " " + inputBackgroundColor + " " + inputTextColor} min={0} name={name} type="number" placeholder={inputPlaceholder} value={value} maxLength={inputMaxLength} onChange={onChangeHandler} onBlur={(e) => onBlur?.(e)}/>
    );
}

export default NumberInput;