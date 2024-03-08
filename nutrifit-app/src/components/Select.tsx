import { FunctionComponent } from 'react';

type Value = {
    label: string;
    value: string;
}

type Props = {
    name: string;
    selectName?: string;
    onChange?: Function;
    selectedValue: string;
    values: Value[];
}

const Select: FunctionComponent<Props> = (props) => {

    const {name, selectName, onChange, selectedValue, values} = props;

    const onChangeHandler = (e: any) => {
        onChange?.(e);
    }

    return (     
        <select className="bg-neutral-700 text-white w-full px-2 py-1" onChange={onChangeHandler} value={selectedValue} name={selectName ?? ""}>
            {values.map((value) => (
                <option key={value.value} value={value.value}>{value.label}</option>
            ))}
        </select>
    );
}

export default Select;
