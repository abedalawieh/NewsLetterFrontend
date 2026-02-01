import React from 'react';
import { RadioGroupProps } from '@/types';
import './RadioGroup.css';

/**
 * Reusable RadioGroup Component
 * For selecting a single option from a list
 * Fully accessible with proper ARIA attributes and keyboard support
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    name,
    options,
    selectedValue,
    onChange,
    error,
    required = false,
    disabled = false,
}) => {
    const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${groupId}-error`;

    return (
        <div className="radio-group-container" role="radiogroup" aria-labelledby={groupId}>
            <div id={groupId} className="radio-group-label">
                {label}
                {required && <span className="radio-group-label__required" aria-label="required">*</span>}
            </div>

            <div className="radio-group-options">
                {options.map((option) => {
                    const isSelected = selectedValue === option.value;
                    const radioId = `${groupId}-${option.value}`;

                    return (
                        <label
                            key={option.value}
                            htmlFor={radioId}
                            className={`radio-option ${isSelected ? 'radio-option--selected' : ''} ${disabled ? 'radio-option--disabled' : ''}`}
                        >
                            <input
                                type="radio"
                                id={radioId}
                                name={name}
                                value={option.value}
                                checked={isSelected}
                                onChange={() => !disabled && onChange(option.value)}
                                disabled={disabled}
                                className="radio-option__input"
                                aria-describedby={error ? errorId : undefined}
                            />
                            <span className="radio-option__circle"></span>
                            <span className="radio-option__label">{option.label}</span>
                        </label>
                    );
                })}
            </div>

            {error && (
                <p id={errorId} className="radio-group-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default RadioGroup;
