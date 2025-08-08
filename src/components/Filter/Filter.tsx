import '@/components/Filter/Filter.css';
import {useState} from "react";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect.tsx";

export interface IFilterProps {
    fetchFn: () => {},
    fields: Array<IFilterItem>
}

export interface IFilterItem {
    id: string;
    value?: string;
    label?: string;
    type: string;
    placeholder?: string;
    isChecked?: boolean;
    options?: Partial<HTMLOptionElement>[]
}

export function Filter(props: IFilterProps) {
    const [fieldsState, setFieldsState] = useState(props.fields);

    function handleChange(index: number, value?: string) {
        const updated = [...fieldsState];
        const item = updated[index];

        if (item.type === 'checkbox') {
            item.isChecked = !item.isChecked;
        } else if (item.type === 'select' && value !== undefined) {
            item.value = value;
        } else {
            item.value = value || item.value;
        }

        setFieldsState(updated);
        props.fetchFn();
    }

    function getHtml(item: IFilterItem, index: number) {
        switch (item.type) {
            case 'checkbox':
            case 'radio':
                return (
                    item.label
                        ? <label htmlFor={item.id}>
                            <input
                                id={item.id}
                                type={item.type}
                                value={item.value}
                                placeholder={item.placeholder}
                                onChange={() => handleChange(index)}
                                checked={item.isChecked}
                            />
                            {item.label}
                        </label>
                        : <input
                            id={item.id}
                            type={item.type}
                            value={item.value}
                            placeholder={item.placeholder}
                            onChange={() => handleChange(index)}
                            checked={item.isChecked}
                        />
                );
            case 'select':
                return (
                    <>
                        {item.label && <label htmlFor={item.id}>{item.label}</label>}
                            <CustomSelect
                                options={item.options ?? []}
                                onChange={(value: string) => handleChange(index, value)}
                                {...item}
                            ></CustomSelect>
                    </>
                );
            default:
                return (
                    <>
                        {item.label ? <label htmlFor={item.id}>{item.label}</label> : ''}
                        <input
                            id={item.id}
                            type={item.type}
                            value={item.value}
                            placeholder={item.placeholder}
                            onChange={props.fetchFn}
                        />
                    </>
                );
        }
    }

    return (
        <div className="filter-container">
            <div className="filter">
                {fieldsState.map((field, index) => {
                    return (
                        <div key={field.id} className="form-field">
                            {getHtml(field, index)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
