import { FunctionComponent } from 'react';

type Props = {
    name: string;
    onClick?: Function;
    submit?: boolean;
    inverted?: boolean;
    textSize?: string;
    className?: string;
}

const Button: FunctionComponent<Props> = ({name, onClick, submit, inverted, textSize, className}: Props) => {
    const inputType = submit ? "submit" : "button";
    const classNameStr = (inverted ? "button-inverted" : "button") + (className ?? "");
    const textSizeClass = textSize ?? "text-md";

    console.log("Button rendered");

    const onClickHandler = () => {
        onClick?.();
    }

    return (
        <input className={classNameStr + " " + textSizeClass} onClick={onClickHandler} type={inputType} value={name}/>
    );
}

export default Button;
