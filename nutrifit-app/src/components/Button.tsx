import { FunctionComponent } from 'react';

type Props = {
    name: string;
    onClick?: Function;
    submit?: boolean;
    inverted?: boolean;
    textSize?: string
}

const Button: FunctionComponent<Props> = (props) => {

    const {name, onClick, submit, inverted, textSize} = props;

    const inputType = submit ? "submit" : "button";
    const className = inverted ? "button-inverted" : "button";
    const textSizeClass = textSize ?? "text-md";

    const onClickHandler = () => {
        onClick?.();
    }

    return (
        <input className={className + " " + textSizeClass} onClick={onClickHandler} type={inputType} value={name}/>
    );
}

export default Button;
