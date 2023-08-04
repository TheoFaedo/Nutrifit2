import { FunctionComponent } from 'react';

type Props = {
    name: string;
    onClick?: Function;
    submit?: boolean;
    inverted?: boolean;
}

const Button: FunctionComponent<Props> = (props) => {

    const {name, onClick, submit, inverted} = props;

    const inputType = submit ? "submit" : "button";
    const className = inverted ? "button-inverted" : "button";

    const onClickHandler = () => {
        onClick?.();
    }

    return (
        <input className={className} onClick={onClickHandler} type={inputType} value={name}/>
    );
}

export default Button;
