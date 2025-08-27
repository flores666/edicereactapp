import React, {useState, useEffect} from "react";

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    delay?: number; // задержка в мс
    onChangeDebounced: (value: string) => void;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
                                                                  value: initialValue = "",
                                                                  delay = 500,
                                                                  onChangeDebounced,
                                                                  ...props
                                                              }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (value === initialValue) return;
        
        const handler = setTimeout(() => {
            onChangeDebounced(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay, onChangeDebounced, initialValue]);


    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};
