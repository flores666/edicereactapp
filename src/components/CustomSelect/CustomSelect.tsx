import {useState, useRef, useEffect} from 'react';
import '@/components/CustomSelect/CustomSelect.css';

interface CustomSelectProps {
    options: Partial<HTMLOptionElement>[];
    onChange?: (value: string) => void;
    placeholder?: string;
}

export function CustomSelect({options, onChange, placeholder}: CustomSelectProps) {
    const [selectedOption, setSelectedOption] = useState<Partial<HTMLOptionElement> | null>(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSelect(option: Partial<HTMLOptionElement>) {
        if (option.value && !option.disabled) {
            const stringValue = String(option.value);
            setSelectedOption(option);
            setIsOpen(false);
            if (onChange) onChange(stringValue);
        }
    }

    return (
        <div ref={containerRef} className="custom-select-container">
            <div
                className="custom-select-selected"
                onClick={() => setIsOpen(prev => !prev)}
                tabIndex={0}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedOption?.label || selectedOption?.text || selectedOption?.value || placeholder || 'Select...'}
            </div>
            <div className={(isOpen ? "open " : "") + "custom-select-dropdown"} role="listbox">
                {options.map((opt, index) => (
                    <div
                        key={index}
                        className={`custom-select-option ${String(opt.value) === selectedOption?.value ? 'selected' : ''} ${opt.disabled ? 'disabled' : ''}`}
                        onClick={() => handleSelect(opt)}
                        role="option"
                        aria-selected={String(opt.value) === selectedOption?.value}
                        aria-disabled={opt.disabled}
                        tabIndex={opt.disabled ? -1 : 0}
                        onKeyDown={e => {
                            if ((e.key === 'Enter' || e.key === ' ') && !opt.disabled) {
                                handleSelect(opt);
                            }
                        }}
                    >
                        {opt.label || opt.text || opt.value}
                    </div>
                ))}
            </div>
        </div>
    );
}
