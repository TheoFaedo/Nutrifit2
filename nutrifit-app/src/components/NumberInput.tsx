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
    styleWidth?: string;
}

const NumberInput: FunctionComponent<Props> = (props) => {

    const {value, name, onChange, onBlur, maxlength, placeholder, rightAlign, backgroundColor, textColor, styleWidth} = props;

    const inputPlaceholder = placeholder ? placeholder : "";
    const inputMaxLength = maxlength ? maxlength : 4;
    const rightAl = rightAlign ? "text-right" : "";
    const inputBackgroundColor = backgroundColor ? backgroundColor : "bg-neutral-700";
    const inputTextColor = textColor ? textColor : "";
    const inputWidth = styleWidth ? styleWidth : "w-[4rem]";


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }

    return (
        <input className={ inputWidth + " ml-2 py-1 px-0.5 " + rightAl + " " + inputBackgroundColor + " " + inputTextColor} min={0} name={name} type="number" placeholder={inputPlaceholder} value={value} maxLength={inputMaxLength} onChange={onChangeHandler} onBlur={(e) => onBlur?.(e)}/>
    );
}

export default NumberInput;