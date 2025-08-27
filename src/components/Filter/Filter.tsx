import '@/components/Filter/Filter.css';
import {useState} from "react";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect.tsx";
import {DebouncedInput} from "@/components/DebouncedInput/DebouncedInput.tsx";

export interface IFilterProps {
    onChange: (filterModel: Record<string, string | boolean | number | undefined>) => {},
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

    function buildModel(fields: IFilterItem[]) {
        return fields.reduce<Record<string, string | boolean | undefined>>((acc, item) => {
            if (item.type === "checkbox" || item.type === "radio") {
                acc[item.id] = item.isChecked;
            } else {
                acc[item.id] = item.value;
            }
            return acc;
        }, {});
    }
    
    function handleChange(index: number, value?: string) {
        const updated = [...fieldsState];
        const item = updated[index];

        if (item.type === 'checkbox') {
            item.isChecked = !item.isChecked;
        } else if (item.type === 'select' && value !== undefined) {
            item.value = value;
        } else {
            item.value = value ?? item.value;
        }

        setFieldsState(updated);
        props.onChange(buildModel(updated));
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
                                placeholder={item.placeholder}
                                onChange={() => handleChange(index)}
                                checked={item.isChecked ?? false}
                            />
                            {item.label}
                        </label>
                        : <input
                            id={item.id}
                            type={item.type}
                            placeholder={item.placeholder}
                            onChange={() => handleChange(index)}
                            checked={item.isChecked ?? false}
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
                        <DebouncedInput
                            id={item.id}
                            type={item.type}
                            value={item.value ?? ''}
                            placeholder={item.placeholder}
                            onChangeDebounced={(value) => handleChange(index, value)}
                        ></DebouncedInput>
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
