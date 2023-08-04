import { FunctionComponent } from 'react';

type Props = {
    value: string;
    name: string;
    password?: boolean;
    onChange?: Function;
    placeholder?: string;
    errorMessage?: string;
    errorBorder?: boolean;
    className?: string;
    rightAlign?: boolean;
}

const TextInput: FunctionComponent<Props> = (props) => {

    const {value, name, password, onChange, placeholder, errorMessage, errorBorder, className, rightAlign} = props;

    const type = password ? "password" : "text";
    const inputPlaceholder = placeholder ? placeholder : "";
    const errorM = errorMessage ? errorMessage : "";
    const errorB = errorBorder ? "text-input-error" : "";
    const rightAl = rightAlign ? "text-right" : "";

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }

    return (
        <div className={'w-full mx-0 ' + className}>
            <input className={'text-input ' + errorB + ' ' + rightAl} type={type} name={name} value={value} placeholder={inputPlaceholder} onChange={onChangeHandler}/>
            <div className='error-message'>{errorM}</div>
        </div>
        
    );
}

export default TextInput;