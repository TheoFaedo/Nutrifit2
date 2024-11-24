import { FunctionComponent } from 'react';

type Value = {
    label: string;
    value: string;
}

type Props = {
    selectName?: string;
    onChange?: Function;
    selectedValue: string;
    values: Value[];
    fitcontent?: boolean;
}

const Select: FunctionComponent<Props> = (props) => {

    const {selectName, onChange, selectedValue, values, fitcontent} = props;

    const onChangeHandler = (e: any) => {
        onChange?.(e);
    }

    return (     
        <select className={"bg-neutral-700 text-white w-full px-2 py-1 " + (fitcontent ?? "")} onChange={onChangeHandler} value={selectedValue} name={selectName ?? ""}>
            {values.map((value) => (
                <option key={value.value} value={value.value}>{value.label}</option>
            ))}
        </select>
    );
}

export default Select;
