import { FunctionComponent } from 'react';
import { NumericFormat } from 'react-number-format';

type Props = {
    value: number;
    name: string;
    onChange?: Function;
    onBlur?: Function;
    maxlength?: number;
    decimalLength?: number;
    placeholder?: string;
    className?: string;
    rightAlign?: boolean;
    backgroundColor?: string;
    textColor?: string;
    styleWidth?: string;
}

const NumberInput: FunctionComponent<Props> = (props) => {

    const {value, name, onChange, onBlur, maxlength, placeholder, rightAlign, backgroundColor, textColor, styleWidth, decimalLength} = props;

    const inputPlaceholder = placeholder ?? "";
    const inputMaxLength = maxlength ?? 3;
    const inputDecimalLength =  decimalLength ?? 0;
    const rightAl = rightAlign ? "text-right" : "";
    const inputBackgroundColor = backgroundColor ?? "bg-neutral-700";
    const inputTextColor = textColor ?? "";
    const inputWidth = styleWidth ?? "w-[4rem]";

    const onChangeHandler = (e: any) => {
        onChange?.(e.event);
    }

    return (
        <NumericFormat className={ inputWidth + " ml-2 py-1 px-1 " + rightAl + " " + inputBackgroundColor + " " + inputTextColor} 
            name={name}
            title={name}
            
            value={value === 0 ? "" : value}

            isAllowed={(values) => {
                const { floatValue } = values;
                return (floatValue ?? 0) <= Math.pow(10, inputMaxLength)-1;
            }}

            type='text'
            decimalSeparator="."
            allowedDecimalSeparators={[',']}
            allowLeadingZeros={false}
            allowNegative={false}
            decimalScale={inputDecimalLength}
            inputMode='decimal'
            placeholder={inputPlaceholder}
            maxLength={inputMaxLength+(inputDecimalLength + (inputDecimalLength > 0 ? 1 : 0))}
            onBlur={onBlur?.()}

            onValueChange={(values, sourceInfo) => {
                onChangeHandler(sourceInfo);
            }}
        />
    );
}

export default NumberInput;