import { FunctionComponent } from 'react';

type Props = {
    name: string;
    onClick?: Function;
    submit?: boolean;
}

const Button: FunctionComponent<Props> = (props) => {

    const {name, onClick, submit} = props;

    const inputType = submit ? "submit" : "button";

    const onClickHandler = () => {
        onClick?.();
    }

    return (
        <input className="button" onClick={onClickHandler} type={inputType} value={name}/>
    );
}

export default Button;
